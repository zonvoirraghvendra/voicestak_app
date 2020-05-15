<?php namespace  App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\User;
use Input, Response, Config, App, Hash, Postmark, URL;

class ApiPaykickstartController extends Controller {


    const secretKey   = 'k8nhlt5U6w';
    const secretKeyJV = '4790126HD223';


    /**
     * Check if user with this email exists.
     * Get /paykickstart/api
     *
     * @return Response
     */
    public function getApi()
    {
        if (Input::has( 'email' ) && User::where( 'email', Input::get( 'email' ) )->count() > 0) {
            return Response::json( array( 'user_exists' => true ) );
        }

        return Response::json( array( 'user_exists' => false ) );
    }


     /**
     * Check if request is valid
     */
    protected function is_valid_request()
    {
        $jv_plans = Config::get( 'plans.jv_plans' );

        $values = array();
        foreach (Input::except( 'key' ) as $key => $value) {
            if($key == "amount") {
                $value = (float) $value;
            }
            $values[] = $value;
        }
        sort($values);
        $values = implode( "|", $values );
        $secretKey = static::secretKey;
        if (in_array( Input::get( 'plan' ), $jv_plans )) {
            $secretKey = static::secretKeyJV;
        }
        $crypted = hash_hmac( 'sha1', $values, $secretKey );
        if ($crypted === Input::get( 'key' )) {
            return true;
        } else {
            return false;
        }

    }



    /**
     * Takes care of processing instant payment notifications.
     * Post /paykickstart/ipn
     *
     * @return Void
     */
    public function postIpn()
    {
        if( Input::has('plan') ){
            
            // HeatMapTracker IPN
            if( Input::get('plan') == 'vs-hmt-personal' || Input::get('plan') == 'vs-hmt-agency' )
            {
               $this->_forward_ipn_data('http://heatmaptracker.com/login/wp-content/plugins/dkappipn/');
            }

            if( Input::get('plan') == 'vs-fs' )
            {
               $this->_forward_ipn_data('http://funnelstak.com/wp-content/plugins/dkappipn/');
            }
            
            switch (Input::get( 'type' )) {
                case 'sales':
                    $this->processSales();
                    break;
                case 'refund':
                    $this->processRefund();
                    break;
                /*case 'sub-update':
                    $this->processSubUpdate();
                    break;
                case 'sub-cancel':
                    $this->processSubCancel();
                    break;*/
                default:
                    App::abort( 404, 'Unknown notification.' );
            }
        }
    }

    


    protected function processSales()
    {
        $plans = Config::get( 'plans.standard_plans' );

        $plan = Input::get( 'plan' );

        if(!in_array($plan, $plans)) {
            return;
        }
        
        $user = User::firstOrNew( array( 'email' => Input::get( 'email' ) ) );

        if (!$user->id) {
            $isSendMail = true;
            $password = Input::has('password') ? Input::get('password') : str_random(8);
        } else {
            $password = "Your Old Password";
        }

        //in case user does not exist
        if (!$user->id) {
            $user->email          = Input::get( 'email' );
            $user->password       = Hash::make( $password );
            $user->name     = Input::get( 'first_name' );
            $user->last_name      = Input::get( 'last_name' );
            $user->status = 'active';
            $user->role = 'user';
        } elseif ($user->id) {
            $user->status = 'active';
        } else {
            return;
        }

        $user->save();

        //attach plan
        $user->addPlan( Input::get( 'plan' ) );
        // if( $plan != 'vs-main' ){
        //     return;
        // }
        if( isset($isSendMail) ) {
            
        Postmark\Mail::compose( Config::get( 'mail.postmark_api_key' ) )
                         ->from( 'support@voicestak.com', 'Voicestak Support' )
                         ->addTo( $user->email, $user->name )
                         ->subject( "Welcome to Voicestak!" )
                         ->messagePlain(
                             "Welcome to Voicestak!

Below are your login details to access you Voicestak account:

Secure Site: https://app.voicestak.com/auth/login
User Email: {$user->email}
Password: {$password}

If you've got any questions along the way, please contact our support team at http://support.digitalkickstart.com or email .

Sincerely,
Mark Thompson & Keith Gosnell"
                         )->send();
        }

    }

    protected function processRefund()
    {
        $plans = Config::get( 'plans.standard_plans' );

        $user = User::where( 'email', '=', Input::get( 'email' ) )->firstOrFail();
        $plan = Input::get( 'plan' );
        // $user->deletePlan( $plan );

        // if( $plan == 'vs-main' ){
            $user->status = 'inactive';
        // }

        $user->save();

    }

    /*protected function processSubUpdate()
    {
        $user = User::where( 'email', '=', Input::get( 'email' ) )->firstOrFail();
        $user->account_status = 'active';
        $user->save();
        Postmark\Mail::compose( Config::get( 'mail.postmark_api_key' ) )
                         ->from( 'support@funneltrax.com', 'Funnel' )
                         ->addTo( $user->email, $user->first_name )
                         ->subject( "Welcome to FunnelTrax, {$user->first_name}!" )
                         ->messagePlain(
                             "Welcome to FunnelTrax, {$user->first_name}!" )->send();

    }*/

    /*protected function processSubCancel()
    {
        $plans = Config::get( 'plans.standard_plans' );

        $user = User::where( 'email', '=', Input::get( 'email' ) )->firstOrFail();
        $plan = Input::get( 'plan' );
        $user->deletePlan( $plan );

        if( $plan == 'vs-pro' ){
            $user->account_status = 'inactive';
        }

        $user->save();
    }*/


    private function jvzipnVerification() {
        $secretKey = static::secretKeyJV;
        $pop = "";
        $ipnFields = array();
        foreach ($_POST as $key => $value) {
            if ($key == "cverify") {
                continue;
            }
            $ipnFields[] = $key;
        }
        sort($ipnFields);
        foreach ($ipnFields as $field) {
            // if Magic Quotes are enabled $_POST[$field] will need to be
            // un-escaped before being appended to $pop
            $pop = $pop . $_POST[$field] . "|";
        }
        $pop = $pop . $secretKey;
        $calcedVerify = sha1(mb_convert_encoding($pop, "UTF-8"));
        $calcedVerify = strtoupper(substr($calcedVerify,0,8));
        return $calcedVerify == $_POST["cverify"];
    }
    /**
     * Takes care of processing instant payment notifications JvZoo.
     */
    public function postIpnJv()
    {
        if( $this->jvzipnVerification() != 1 ){
            return;
        }
        
        $plans = [
            'jv_172033' => 'vs-lifetime',
            'jv_172034' => 'vs-monthly',
            'jv_172036' => 'vs-yearly',
            'jv_172038' => 'vs-premium',
            'jv_173844' => 'vs-premium-monthly'
        ];

        $productCode = 'jv_' . Input::get( 'cproditem' );

        $process = Input::get( 'ctransaction' );

        if (isset($plans[$productCode])) {
            if ($process == "SALE") {
                $this->_processSalesJv($plans[$productCode]);
            } elseif($process == "RFND" || $process == "CANCEL-REBILL") {
                $this->_processRefundJv($plans[$productCode]);
            }
        }
    }

    private function _forward_ipn_data($url)
    {
        $ch = curl_init();
        $data = Input::all();
        $param_string = NULL;

        if(is_array($data) AND count($data) > 0)
        {
            foreach ($data as $key => $value)
            {
                $param_string .= $key . '=' . $value . '&';
            }
            rtrim($param_string, '&');
        }

        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POST, count($data));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param_string);

        $result = curl_exec($ch);
        curl_close($ch);
        return;
    }


    protected function _processSalesJv($plan)
    {

        $email = Input::get( 'ccustemail' );
        $customer_name = explode(' ', Input::get( 'ccustname' ));
        $first_name = isset($customer_name[0]) ? $customer_name[0] : NULL;
        $last_name = isset($customer_name[1]) ? $customer_name[1] : NULL;
        $user = User::firstOrNew( array( 'email' => $email ) );

        if (!$user->id) {
            $password = str_random(8);
        } else {
            $password = "Your old Password";
        }


        //In case user does not exist
        if (!$user->id) {
            $user->email          = $email;
            $user->password       = Hash::make( $password);
            $user->name           = $first_name;
            $user->last_name      = $last_name;
            $user->status = 'active';
            $user->role = 'user';
            $size = 100;
            $user->image = "http://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?s=" . $size."&d=".URL::to('images/avatars/default/default.png');
        } elseif ($user->id) {
            $user->status = 'active';
        } else {
            return;
        }
        $user->save();

        //attach plan

        $user->addPlan( $plan );

        Postmark\Mail::compose( Config::get( 'mail.postmark_api_key' ) )
             ->from( 'support@voicestak.com', 'Voicestak Support' )
             ->addTo( $user->email, $user->first_name )
             ->subject( "Welcome to Voicestak!" )
             ->messagePlain(
                 "Welcome to Voicestak!

Below are your login details to access you Voicestak account:

Secure Site: https://app.voicestak.com/auth/login
User Email: {$user->email}
Password: {$password}

If you've got any questions along the way, please contact our support team at http://support.digitalkickstart.com or email .

Sincerely,
Mark Thompson & Matt Callen"
                         )->send();

    }

    protected function _processRefundJv($plan)
    {
        $user = User::where( 'email', '=', Input::get( 'ccustemail' ) )->firstOrFail();
        // No Plans
        // $user->deletePlan( $plan );
        // if( $plan == 'vs-main' ){
            $user->status = 'inactive';
        // }
        
        $user->save();
    }
}

