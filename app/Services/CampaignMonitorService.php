<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use Illuminate\Contracts\Auth\Guard;
use Exception;

class CampaignMonitorService implements EmailServiceInterface {

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
	private $serviceName = 'CampaignMonitor';

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
	public function get_service_options( $user_id , $service_name)
    {
        return $this->emailService->where('service', $service_name)->where( 'user_id' , $user_id )->lists('value');
    }

	public function connect( $inputs )
	{
		try {
            $auth = array('api_key' => $inputs['cm_api_key']);
	    	$wrap = new \CS_REST_General($auth);
	    	$result = $wrap->get_clients();
	    	if(empty($result) || (isset($result->response->Code) && $result->response->Code == '50') ) {
	    		return ['status' => 'warning', 'message' => 'The API key is invalid.'];
	    	}
	    	$this->set_service_option( $this->serviceName, ['cm_api_key' => $inputs['cm_api_key']] );
	    	return ['status' => 'success', 'message' => 'You has been successfully connected.' ];
        } catch (Exception $e) {
        	return ['status' => 'warning', 'message' => 'The API key is invalid.'];
        }
	}

    /**
	 * Get MailChimp lists
	 */
	public function getList()
    {
		$api_key = $this->get_service_options( \Auth::id() , $this->serviceName);
        $api_key = json_decode($api_key[0])->cm_api_key;

        $auth = array('api_key' => $api_key);
    	$wrap = new \CS_REST_General($auth);
    	$data = $wrap->get_clients();
    	foreach ($data->response as $key => $client) {
    		$wrap = new \CS_REST_Clients( $client->ClientID, $auth);
    		$campaignes[] = $wrap->get_campaigns();
    	}
    	foreach ($campaignes as $campaigne) {
    		foreach ($campaigne->response as $camp) {
	    		$wrap = new \CS_REST_Campaigns($camp->CampaignID, $auth);
	    		$camp_lists[] = $wrap->get_lists_and_segments();
    		}
    	}
    	foreach($camp_lists as $lists){
    		foreach ($lists->response as $list) {
    			foreach ($list as $item) {
    				$mylists[$item->ListID] = $item->Name;
    			}
    		}
    	}
    	return $mylists;
    }

    /**
     * CampaignMonitor Add contact to list
     */
    public function add_contact( $user_id , $list_id, $contact_data)
    {
    	try{
	    	$conf = $this->get_service_options( $user_id , $this->serviceName);
	    	$conf = json_decode($conf[0]);
	    	$auth = array('api_key' => $conf->cm_api_key);
			$wrap = new \CS_REST_Subscribers($list_id, $auth);
			$result = $wrap->add(array(
			    'EmailAddress' => $contact_data['email'],
			    'Name' => $contact_data['name'],
			    'Resubscribe' => false
			));
			/*echo "Result of POST /api/v3.1/subscribers/{list id}.{format}\n<br />";*/
			if($result->was_successful()) {
			    return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
			} else {
			    return ['status' => 'warning', 'message' => 'You already subscribed!!!'];
			}
    	} catch(Exception $e) {
    		return ['status' => 'error', 'message' => 'Please connect to CampaignMonitor service!'];
    	}
    	
    }

}