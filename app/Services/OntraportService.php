<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use Lib\Curl\Curl;
use Illuminate\Contracts\Auth\Guard;
class OntraportService implements EmailServiceInterface {

	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , EmailService $emailService )
	{
		
		$this->auth 		= $auth;
		$this->emailService = $emailService;
	}

	/**
	 * Get service name
	 *
	 * @var string
	 * @access private
	 */
	private $serviceName = 'Ontraport';

	/**
	 * Connect(save) API Key
	 */
	public function set_service_option($service, $value)
	{

		//$services          = new EmailService;

		$this->emailService->user_id = $this->auth->id();

		$this->emailService->service = $service;

		$this->emailService->value   = json_encode($value);

		$this->emailService->active  = 1;

		$this->emailService->save();
	}

	/**
	 * Get service options
	 */
	public function get_service_options($user_id, $service_name)
    {
        return $this->emailService->where('service', $service_name)->where('user_id', $user_id)->lists('value');
    }

	/**
	 * Connect to active campaign.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
    public function connect( $inputs )
	{
		$curl = new Curl;
		$url = "https://api.ontraport.com/cdata.php";
		$data = ['appid' => $inputs['ontr_app_id'], 'key' => $inputs['ontr_api_key'] , 'return_id'=>'1', 'reqType' => 'key', 'data' => '' ];
		$response = $curl->simple_post( $url , $data );
		if( !$response || $response[0].$response[1].$response[2].$response[3] == "Oops" ) {
			return ['status' => 'warning', 'message' => 'Access denied: Invalid credentials'];
		}

		$this->set_service_option($this->serviceName, ['ontr_app_id' => $inputs['ontr_app_id'], 'ontr_api_key' => $inputs['ontr_api_key'] ] );

		return ['status' => 'success', 'message' => 'API config data saved!'];

	}

    /**
	 * Get interspire Lists.
	 *
	 * @return array
	 */
	public function active_campaign_lists()
    {
    	require_once(base_path().'/lib/ActiveCampaign/ActiveCampaign.class.php');
        try {
            $conf = self::get_service_options('activeCampaign');
            $ac = new ActiveCampaign( $conf['api_url'], $conf['api_key'] );

            $data = ['ids'=>'all'];
            $lists_data = $ac->api( "list/list", $data );

            foreach ( $lists_data as $key => $value ) {
                if( (int)$key ) {
                    $lists[] = [
                        'name' => $value->name,
                        'id' => $value->id,
                    ];
                }
            }

            return $lists;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    /**
	 * Add contact
	 *
	 * @return array
	 */
    public function add_contact( $user_id, $list_id, $contact_data )
    {
    	try{
	    	$reqType= "add";
	    	$conf = $this->get_service_options($user_id, $this->serviceName);
	        $conf = json_decode($conf[0]);
	        // $data = json_encode($contact_data);
	  //       $data = new \SimpleXMLElement('<xml/>');
			// array_walk_recursive($contact_data, array ($data, 'addChild'));
			$data = array();
			foreach($contact_data as $key => $d){
				if($key == "name")
					$data['First Name'] =  $d;
				if($key == "email")
					$data['Email'] = $d;
			}
			$data = json_encode($data);
	    	$postargs = "appid=".$conf->ontr_app_id."&key=".$conf->ontr_api_key."&reqType=add&return_id=1&data={'name': vemir, 'email': asd@asd.asd}";
	    	// dd($postargs);
	    	$request = "https://api.ontraport.com/cdata.php";
	    	//Start the curl session and send the data
	    	$session = curl_init($request);
	    	curl_setopt ($session, CURLOPT_POST, true);
	    	curl_setopt ($session, CURLOPT_POSTFIELDS, $postargs);
	    	curl_setopt($session, CURLOPT_HEADER, false);
	    	curl_setopt($session, CURLOPT_RETURNTRANSFER, false);
	    	//Store the response from the API for confirmation or to process return data
	    	$response = curl_exec($session);
    		dd($response);
    	} catch(Exception $e) {
    		dd($e->getMessage());
    	}
    }

}