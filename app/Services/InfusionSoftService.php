<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use Lib\Infusionsoft\isdk;
use Illuminate\Contracts\Auth\Guard;
use Session, Exception;

class InfusionSoftService implements EmailServiceInterface {

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
	private $serviceName = 'InfusionSoft';

	/**
	 * Connect(save) API Key
	 */
	public function set_service_option( $service, $value )
	{

		//$services          = new EmailService;

		$this->emailService->user_id = $this->auth->id();

		$this->emailService->service = $service;

		$this->emailService->value   = json_encode($value);

		$this->emailService->active  = 1;

		$this->emailService->save();
	}

	/**
	 * Get Service API Key
	 */
	public function get_service_option($user_id , $service_name)
	{
		return $this->emailService->where('service', $service_name)->where('user_id', $user_id)->lists('value');
	}

	public function connect( $inputs )
	{
		$api_key 	= config('voicestack.infusion.api_key');
		$api_secret = config('voicestack.infusion.api_secret');

		if($api_key && $api_secret){
			Session::put('infusion_api_key', $api_key);
			Session::put('infusion_api_secret_key', $api_secret);
		}	

       	$infusionsoft = new \Infusionsoft\Infusionsoft(array(
       	    'clientId'     => $api_key,
       	    'clientSecret' => $api_secret,
       	    'redirectUri'  => 'https://app.voicestak.com/settings/infusion-callback-url'
       	    // 'redirectUri'  => 'https://voice-stack.dev/settings/infusion-callback-url'
       	));

       	return ['status' => 'notauthorized', 'message' => $infusionsoft->getAuthorizationUrl()];

	}

	public function callback( $inputs )
	{
		if(Session::has('infusion_api_key') && Session::has('infusion_api_secret_key')){
			$api_key = Session::get('infusion_api_key');
			$api_secret = Session::get('infusion_api_secret_key');

			$infusionsoft = new \Infusionsoft\Infusionsoft(array(
   	    		'clientId'     => $api_key,
   	    		'clientSecret' => $api_secret,
   	    		'redirectUri' => 'https://app.voicestak.com/settings/infusion-callback-url'
   	    		// 'redirectUri'  => 'https://voice-stack.dev/settings/infusion-callback-url'
   			));
		
			// If the serialized token is available in the session storage, we tell the SDK
			// to use that token for subsequent requests.
			if (Session::has('infusion_token')) {
			    $infusionsoft->setToken(unserialize(Session::get('infusion_token')));
			}
			// If we are returning from Infusionsoft we need to exchange the code for an
			// access token.
			if (isset($inputs['code']) and !$infusionsoft->getToken()) {
			    $infusionsoft->requestAccessToken($inputs['code']);
			}

			if ($infusionsoft->getToken()) {
			    Session::put('infusion_token', serialize($infusionsoft->getToken()) );
				$this->set_service_option($this->serviceName, [ 'infusion_api_key' => $api_key, 'infusion_api_secret_key' => $api_secret, 'code' => $inputs['code'], 'token' => serialize($infusionsoft->getToken()) ]);
 				return ['status' => 'success', 'message' => 'API key saved!'];
			}
			else {
				return ['status' => 'notauthorized', 'message' => $infusionsoft->getAuthorizationUrl()];
			}
		}else{
			return ['status' => 'warning', 'message' => 'Invalid credentials!'];
       	}
	}

    public function getList()
    {
		if(null != $conf = $this->get_service_option($this->auth->id(), $this->serviceName)){
		    $conf = json_decode($conf[0]);
		    $name = $conf->infusion_api_key;
		    $key  = $conf->infusion_api_secret_key;
		    $token = $conf->token;
		} else {
			return ['status' => 'error', 'message' => 'Please connect to InfusionSoft service!'];
		}

	    $infusionsoft = new \Infusionsoft\Infusionsoft(array(
	        'clientId' => $name,
	        'clientSecret' => $key,
	        'redirectUri' => 'https://app.voicestak.com/settings/infusion-callback-url'
	        // 'redirectUri'  => 'https://voice-stack.dev/settings/infusion-callback-url'
	    ));

	    $infusionsoft->setToken(unserialize($token));

	    if ($infusionsoft->getToken()->getEndOfLife() < time()) {
	    	$infusionsoft->refreshAccessToken();
		    Session::put('infusion_token', serialize($infusionsoft->getToken()) );

		    $value = [ 'infusion_api_key' => $name, 'infusion_api_secret_key' => $key, 'token' => serialize($infusionsoft->getToken()) ];
	    	$this->emailService->where('user_id', $this->auth->id())->where('service', $this->serviceName)->update( ['value' => json_encode($value)] );
	    }

	    $resp = $infusionsoft->webForms()->getMap();

		$lists = array();
		foreach ($resp as $key => $value) {
			$lists[$key] = $value;
		}

		return $lists;
    }

    public function add_contact( $user_id, $list_id, $contact_data )
    {
    	if(null != $conf = $this->get_service_option($user_id, $this->serviceName)){
    		$conf = json_decode($conf[0]);
		    $name = $conf->infusion_api_key;
		    $key  = $conf->infusion_api_secret_key;
		    $token = $conf->token;
    	} else {
    		return ['status' => 'error', 'message' => 'Please connect to InfusionSoft service!'];
    	}
	    $infusionsoft = new \Infusionsoft\Infusionsoft(array(
	        'clientId' => $name,
	        'clientSecret' => $key,
	        'redirectUri' => 'https://app.voicestak.com/settings/infusion-callback-url'
	        // 'redirectUri'  => 'https://voice-stack.dev/settings/infusion-callback-url'
	    ));
	    
	    $infusionsoft->setToken(unserialize($token));
	    
        if ($infusionsoft->getToken()->getEndOfLife() < time()) {
        	$infusionsoft->refreshAccessToken();
    	    Session::put('infusion_token', serialize($infusionsoft->getToken()) );
    	    $value = [ 'infusion_api_key' => $name, 'infusion_api_secret_key' => $key, 'token' => serialize($infusionsoft->getToken()) ];
        	$this->emailService->where('user_id', $user_id)->where('service', $this->serviceName)->update( ['value' => json_encode($value)] );
        }

		$data = array('FirstName' => $contact_data['name'],
            		  'Email'     => $contact_data['email']);

        $id = $infusionsoft->contacts()->add( $data );

		return ['status' => 'success', 'message' => 'You are successfully subscribed!!!']; 
    }

}