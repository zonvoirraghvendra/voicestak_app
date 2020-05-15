<?php namespace  App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\MessageServiceInterface;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;
use Input, Response, Config, App, Hash, Postmark, URL;
use App\Repositories\WhiteLabelRepository;
use Carbon\Carbon;



class PaykickstartController extends Controller {


    const secretKey   = 'sCKeqAwrJF3u';
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
        
    function is_valid_ipn($data, $secret_key)
    {
        // return $secret_key;
        $paramStrArr = array();
        $paramStr = NULL;

        foreach($data as $key=>$value)
        {
            // Ignore if it is encrypted key
            if($key == "verification_code") continue;
            if(!$key OR !$value) continue;
            $paramStrArr[] = (string) $value;
        }

        ksort( $paramStrArr, SORT_STRING );
        $paramStr = implode("|", $paramStrArr);
        $encKey = hash_hmac( 'sha1', $paramStr, $secret_key );

        // return [$encKey, $data["verification_code"]] ;
        return $encKey == $data["verification_code"] ;
        
    }
    
    /**
     * Takes care of processing instant payment notifications.
     * Post /paykickstart/ipn
     *
     * @return Response
     */
    public function postIpn(Request $request )
    {
        $data = $request->all();
        DB::table('ipn_data')->insert(['data' => json_encode($data)]);

        // return Response::json($this->is_valid_ipn($data, static::secretKey));
        if ( !$this->is_valid_ipn($data, static::secretKey) )
            return Response::json( array( 'message' => 'IPN Is not Valid' ) );

        switch (Input::get( 'event' )) {
            case 'sales':
                return $this->processSale($data);
                break;
            case 'refund':
                return $this->processRefund($data);
                break;
            case 'subscription-payment':
                return $this->processSubUpdate($data);
                break;
            case 'subscription-created':
                return $this->processSale($data);
                break;
            case 'subscription-cancelled':
                return $this->processSubCancel($data);
                break;
            default:
                App::abort( 404, 'Unknown notification.' );
        }
    }

    private function setBuyerPlan($buyer, $productId)
    {
        switch($productId) {
            case 35973:
                $buyer->plan = 'vs-lifetime';
                break;
            case 35968:
                $buyer->plan = 'vs-monthly';
                $today = Carbon::now();
                $buyer->subscription_expires = $today->addDays(31);
                break;
            case 35969:
                $buyer->plan = 'vs-yearly';
                $today = Carbon::now();
                $buyer->subscription_expires = $today->addDays(365);
                break;
            case 35971:
                $buyer->plan = 'vs-premium';
                $buyer->is_premium = 1;
                $buyer->add_users = 1;
                break;
            case 35970:
                $buyer->plan = 'vs-premium-monthly';
                $buyer->is_premium = 1;
                $buyer->add_users = 1;
                $today = Carbon::now();
                $buyer->subscription_expires = $today->addDays(31);
                break;
            default:
                return $buyer;
        }

        return $buyer;
    }
    
    
    private function processSale( $data )
    {
        $buyer = User::firstOrNew(['email' => $data['buyer_email']]);

        if (!$buyer->id) {
            $password = str_random(8);
            $buyer->password = Hash::make( $password);
        } else {
            $password = "Your old Password";
        }

        $buyer->name = $data['buyer_first_name'];
        $buyer->last_name = $data['buyer_last_name'];
        $buyer->email = $data['buyer_email'];
        $buyer->is_premium = 0;
        $buyer->role = 'customer';
        $buyer->create_widgets = 1;
        $buyer->edit_widgets = 1;
        $buyer->add_users = 0;
        $buyer->add_integrations = 1;
        $buyer->remove_powered_by = 0;
        $buyer = $this->setBuyerPlan($buyer, $data['product_id']);
        $buyer->role =  'user';
        $buyer->status = 'active';
        
        if ( $buyer->save() ) {

            Postmark\Mail::compose( Config::get( 'mail.postmark_api_key' ) )
                         ->from( 'support@voicestak.com', 'Voicestak Support' )
                         ->addTo( $data['buyer_email'], $data['buyer_first_name'] )
                         ->subject( "Welcome to Voicestak!" )
                         ->messagePlain(
                             "Welcome to Voicestak!

                        Below are your login details to access your Voicestak account:

                        Secure Site: https://app.voicestak.com/auth/login
                        User Email: {$data['buyer_email']}
                        Password: {$password}

                        If you've got any questions along the way, please contact our support team at http://support.digitalkickstart.com or email .

                        Sincerely,
                        Mark Thompson & Keith Gosnell"
                                                 )->send();

            return Response::json( array( 'message' => 'New User Successfully Created' ) );
        } else {
            return Response::json( array( 'message' => 'New User Could Not Be Created' ) );
        }
        
    }
    
    private function processRefund($data)
    {
        if ($data['mode'] === 'test')
            return Response::json( array( 'message' => 'The Subscriber\'s  Account Has Been Successfully Cancelled' ) );

        $buyer = User::where(['email' => $data['buyer_email']])->first();
        
        if( (!$buyer) || ($buyer->status == 'inactive') )
            return Response::json( array( 'message' => 'This subscriber does not exist or their account is already inactive' ) );

        $buyer->status = 'inactive';
        $buyer->save();
        return Response::json( array( 'message' => 'The Subscriber\'s  Account Has Been Successfully Cancelled' ) );
    }
    
    private function processSubCancel($data)
    {
        if ($data['mode'] === 'test')
            return Response::json( array( 'message' => 'The Subscriber\'s  Account Has Been Successfully Cancelled' ) );

        $buyer = User::where(['email' => $data['buyer_email']])->first();

        if( (!$buyer) || ($buyer->status == 'inactive') )
            return Response::json( array( 'message' => 'This subscriber does not exist or their account is already inactive' ) );

        $buyer->status = 'inactive';
        $buyer->save();
        return Response::json( array( 'message' => 'The Subscriber\'s  Account Has Been Successfully Cancelled' ) );
    }
    
    private function processSubUpdate ( $data )
    {
        if ($data['mode'] === 'test')
            return Response::json( array( 'message' => 'The Subscriber\'s  Account Has Been Successfully Updated' ) );

        if (!$buyer = User::where(['email' => $data['buyer_email']])->first())
            return $this->processSale($data);

        $buyer = $this->setBuyerPlan($buyer, $data['product_id']);
        $buyer->status = 'active';
        $buyer->save();
        return Response::json( array( 'message' => 'The Subscriber\'s  Account Has Been Successfully Updated' ) );
    }


    /*
     * JVZ
     * -------------------------------------
     * */

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
            'jv_173844' => 'vs-premium-monthly',
            'jv_188898' => 'vs-monthly-27',
            'jv_188896' => 'vs-yearly-197',
            'jv_176392' => 'bc-vs-monthly',
            'jv_176394' => 'bc-vs-lifetime',
            'jv_197394' => 'fs-vs-monthly',
            'jv_197392' => 'fs-vs-lifetime'
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