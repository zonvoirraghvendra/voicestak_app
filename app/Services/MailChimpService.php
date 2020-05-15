<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use Lib\MailChimp\Mailchimp;
use Illuminate\Contracts\Auth\Guard;
use Exception;
use Auth;

class MailChimpService implements EmailServiceInterface {

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
	private $serviceName = 'MailChimp';

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
	 * Get service options
	 */
	public function get_service_options( $user_id, $service_name )
    {
        return $this->emailService->where('service', $service_name)->where('user_id', $user_id)->lists('value');
    }

	public function connect( $inputs )
	{
		try {
			$mc = new Mailchimp( $inputs['mailchimp_api_key'] );
            $response = $mc->helper->ping();
	     	if($response['msg'] == "Everything's Chimpy!"){
	        	$this->set_service_option( $this->serviceName, ['mailchimp_api_key' => $inputs['mailchimp_api_key']] );
	        	return ['status' => 'success', 'message' => 'You has been successfully connected.' ];
	        }
        } catch (Exception $e) {
        	return ['status' => 'warning', 'message' => 'The API key is invalid.'];
        }
	}

    /**
	 * Get MailChimp lists
	 */
	public function getList()
    {
        //require_once(app_path() . "/libraries/Mailchimp/Mailchimp.php"); // Add Curl library
		
        $api_key = $this->get_service_options( \Auth::id() , $this->serviceName);
        $api_key = json_decode($api_key[0])->mailchimp_api_key;

        $mc = new Mailchimp($api_key);
        $lists = array();
        $data = $mc->lists->getList();

        foreach ($data['data'] as $list) {
            $lists[$list['id']] = $list['name'];
        }

        return $lists;
    }

    /**
     * MailChimp Add contact to list
     */
    public function add_contact($user_id , $list_id, $contact_data)
    {
    	try{
    		$api_key = $this->get_service_options( $user_id, $this->serviceName );
    		$api_key = json_decode($api_key[0])->mailchimp_api_key;
    		$mc = new Mailchimp($api_key);
    		$result = $mc->lists->subscribe($list_id, array('email' => $contact_data['email']), array('FNAME' => $contact_data['name']), 'html', FALSE);
    		return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
    	} catch(Exception $e) {
    		return ['status' => 'error', 'message' => 'Please connect to MailChimp service!'];
    	}
        
    }

}