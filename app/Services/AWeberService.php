<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use AWeberAPI;
use Request;
use Illuminate\Contracts\Auth\Guard;
use Exception;
require_once( app_path().'/../lib/Aweber/aweber_api.php');

class AWeberService implements EmailServiceInterface {

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
	private $serviceName = 'Aweber';
	
	/**
	 * Get inputs to set email service connection.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	private function setAWeberConnectionInputs( $inputs )
	{
		$emailServiceData['user_id'] = $this->auth->id();
		$emailServiceData['service'] = $this->serviceName;
		$emailServiceData['value']   = json_encode([ 
			'consumer_key' => $inputs['consumer_key'] , 
			'consumer_secret' => $inputs['consumer_secret'] 
		]);
		return $emailServiceData;
	}

	/**
	 * Set email service connection.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	private function setAWeberConnection( $inputs )
	{
		if ( null != $aweber_data = $this->emailService->where( 'service' , $this->serviceName )->where( 'user_id' , $this->auth->id() )->first() ) {
			return $aweber_data;
		}
		return $this->emailService->create( $this->setAWeberConnectionInputs( $inputs ) );
	}

	/**
	 * Update email service connection.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	private function updateAWeberConnection( $inputs )
	{
		$aweber_data = $this->getAWeberConnection();
		$emailServiceData = json_decode( $aweber_data->value , true );
		$emailServiceData['accessKey'] = $inputs['accessKey'];
		$emailServiceData['accessSecret'] = $inputs['accessSecret'];
		$aweber_data->value = json_encode( $emailServiceData );
		$aweber_data->active = 1;
		$aweber_data->save();
		return [ 'status' => 'success' , 'message' => 'You has been successfully connected.' ];
	}

	/**
	 * Get service options
	 */
	public function get_service_options( $user_id , $service_name)
    {
        return $this->emailService->where('service', $service_name)->where('user_id', $user_id )->lists('value');
    }

	/**
	 * Get email service connection.
	 *
	 * @return object or null
	 */
	private function getAWeberConnection()
	{
		return $this->emailService->where( 'service' , $this->serviceName )->where( 'user_id' , $this->auth->id() )->first();
	}

	/**
	 * Connect to email service.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	public function connect( $inputs )
	{
		try {
			$inputs['consumer_key'] = config('voicestack.aweber.consumer_key');
			$inputs['consumer_secret'] = config('voicestack.aweber.consumer_secret');
			$aweber = new AWeberAPI( $inputs['consumer_key'] , $inputs['consumer_secret'] );
	       	$aweber_data = $this->setAWeberConnection( $inputs );
	        if ( empty( $inputs['oauth_token'] ) ) {
	            $callbackUrl = url('/settings/connect-aweber-api-callback');
		        list($requestToken, $requestTokenSecret) = $aweber->getRequestToken( $callbackUrl );
		        setcookie('requestTokenSecret', $requestTokenSecret);
		        return redirect( $aweber->getAuthorizeUrl() );
	        }
        } catch (Exception $e) {
        	$this->getAWeberConnection()->delete();
			return [ 'status' => 'warning' , 'message' => 'Invalid Consumer Key or/and Consumer Secret' ];
		}
	}
	public function getAweberAccessByUserID()
	{
		return $this->emailService->where('service','aweber')->where('user_id', $this->auth->id())->first();
	}

	/**
	 * Get Aweber List.
	 *
	 * @return array
	 */
	public function getList()
    {
    	$aweber_data = $this->getAweberAccessByUserID();
    	if(isset($aweber_data)){
    		$aweber_data = json_decode($aweber_data->value);
    	}
    	// Add Aweber library
		// require_once(app_path() . "/libraries/aweber_api/aweber_api.php");
		if(isset($aweber_data->consumer_key)) {
			$consumerKey = $aweber_data->consumer_key;
			if(isset($aweber_data->consumer_secret) && isset($aweber_data->accessKey) && isset($aweber_data->accessSecret)){
				$consumerSecret = $aweber_data->consumer_secret;
				$aweber = new AWeberAPI($consumerKey, $consumerSecret);
		        $account = $aweber->getAccount($aweber_data->accessKey, $aweber_data->accessSecret);

		        $lists = [];
		        foreach ($account->lists as $list_id => $list) {
		        	$lists[$list->id] = $list->name;
		        }
		        return $lists;
			}
		}
		# Create new instance of AWeberAPI
    }

	/**
	 * ConnectCallback to email service.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	public function connectCallback( $inputs )
	{
		try {
			$inputs['consumer_key'] = config('voicestack.aweber.consumer_key');
			$inputs['consumer_secret'] = config('voicestack.aweber.consumer_secret');
	        $aweber_data = $this->getAWeberConnection();
	        $consumer_access = json_decode( $aweber_data->value , true );
			$aweber = new AWeberAPI( $consumer_access['consumer_key'] , $consumer_access['consumer_secret'] );
            //dd(!$aweber_data);
            if ( $aweber_data ) {
	            if ( empty( $inputs['oauth_token'] ) ) {
	                $callbackUrl = url('/connect-aweber-api-callback');
	                list($requestToken, $requestTokenSecret) = $aweber->getRequestToken( $callbackUrl );
	                setcookie('requestTokenSecret', $requestTokenSecret);
	                return redirect( $aweber->getAuthorizeUrl() );
	            }
	            $aweber->user->tokenSecret = $_COOKIE['requestTokenSecret'];
	            $aweber->user->requestToken = $inputs['oauth_token'];
	            $aweber->user->verifier = $inputs['oauth_verifier'];
	            list($accessToken, $accessTokenSecret) = $aweber->getAccessToken();
	            
	            $inputs['accessKey'] = $accessToken;
				$inputs['accessSecret'] = $accessTokenSecret;
				return $this->updateAWeberConnection( $inputs );
	        }
        } catch (Exception $e) {
			return [ 'status' => 'warning' , 'message' => $e->getMessage() ];
		}
	}

	/**
	 * Aweber Add contact to list
	 */
	public function add_contact( $user_id, $list_id, $contact_data)
	{
		try{
			$conf = $this->get_service_options( $user_id , $this->serviceName);
        	$conf = json_decode($conf[0]);
		} catch(Exception $e) {
			return ['status' => 'error', 'message' => $e->getMessage()];
		}

		$consumerKey = $conf->consumer_key;
		$consumerSecret = $conf->consumer_secret;

		# Create new instance of AWeberAPI
		$aweber = new AWeberAPI($consumerKey, $consumerSecret);
        //$aweber_data = static::get_service_options('aweber');

        try {
            $account = $aweber->getAccount($conf->accessKey, $conf->accessSecret);
            $listURL = "/accounts/{$account->data['id']}/lists/{$list_id}";
            $list = $account->loadFromUrl($listURL);

            # create a subscriber
            $params = array(
                'email' => $contact_data['email'],
                'ip_address' => $_SERVER['REMOTE_ADDR'],
                'name' => $contact_data['name']
            );

            $subscribers = $list->subscribers;
            try {
            	$result = $subscribers->create($params);
            	return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
            }
            catch(Exception $e){
            	return ['status' => 'warning', 'message' => 'You already subscribed!!!'];
            }
        } catch (AWeberAPIException $exc) {
            $result = false;
            return ['status' => 'error', 'message' => 'Please connect to Aweber service!'];
        }
	}
}