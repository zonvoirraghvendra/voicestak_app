<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use Lib\GetResponse\GetResponse;
use App\Models\EmailService;
use Illuminate\Contracts\Auth\Guard;
use Exception;
class GetResponseService implements EmailServiceInterface {

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
	private $serviceName = 'GetResponse';
	
	/**
	 * Get inputs to set email service connection.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	private function setGetResponseConnectionInputs( $inputs )
	{
		$emailServiceData['user_id'] = $this->auth->id();
		$emailServiceData['service'] = $this->serviceName;
		$emailServiceData['value']   = json_encode([ 'api_key' => $inputs['api_key'] ]);
		$emailServiceData['active']  = 1;
		return $emailServiceData;
	}

	/**
	 * Get service options
	 */
	public function get_service_options( $user_id ,$service_name)
    {
        return $this->emailService->where('service', $service_name)->where('user_id' , $user_id )->lists('value');
    }

	/**
	 * Set email service connection.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	private function setGetResponseConnection( $inputs )
	{
		if ( null != $this->emailService->where( 'service' , $this->serviceName )->where( 'user_id' , $this->auth->id() )->first() ) {
			return [ 'status' => 'warning' , 'message' => 'You already connected to this api.' ];
		}
		$this->emailService->create( $this->setGetResponseConnectionInputs( $inputs ) );
		return [ 'status' => 'success' , 'message' => 'You has been successfully connected.' ];
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
			$getResponse = new GetResponse( $inputs['api_key'] );
			if( $getResponse->ping() == "pong" ) {
				return $this->setGetResponseConnection( $inputs );
			}
			return [ 'status' => 'warning' , 'message' => 'Please enter the valid api key.' ];
		} catch (Exception $e) {
			return [ 'status' => 'warning' , 'message' => $e->getMessage() ];
		}
	}

	public function getResponseAccessByUserID()
	{
		return $this->emailService->where('service', $this->serviceName)->where('user_id',\Auth::id())->first();
	}

	/**
	 * get list
	 *
	 * @return array
	 */
	public function getList()
	{	

        $getresponse_data = $this->getResponseAccessByUserID();
        if(isset($getresponse_data)) {
	        $getresponse_data = json_decode($getresponse_data->value);
	        $api_key = $getresponse_data->api_key;
	        
	        try{
				$gr = new GetResponse($api_key);
				$data = (array)$gr->getCampaigns();
	        }catch(Exception $e){
	        	echo $e->getMessage(); exit;
	        }

	        if(empty($data)) {
	            return array('success' => false ,'message' => 'Email List not found.');
	        }
	        $lists = [];
	        foreach ($data as $list_id => $list) {
	            $lists[$list_id] = $list->name;   
	        }
	        return $lists;
        	
        }

	}

	/**
	 * GetResponse Add contact to list
	 */
	public function add_contact( $user_id, $list_id, $contact_data )
	{
		try{	
	        $conf = $this->get_service_options( $user_id, $this->serviceName );
	        $conf = json_decode($conf[0]);
	        $gr = new GetResponse($conf->api_key);
	        $result = $gr->addContact($list_id, $contact_data['name'], $contact_data['email']);
			
			return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
			
		} catch(Exception $e) {
			return ['status' => 'error', 'message' => 'Please connect to GetResponse service!'];
		}
	}
}