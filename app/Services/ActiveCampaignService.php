<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use Lib\ActiveCampaign\ActiveCampaign;
use Illuminate\Contracts\Auth\Guard;
use Exception;
class ActiveCampaignService implements EmailServiceInterface {

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
	private $serviceName = 'ActiveCampaign';

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
	public function get_service_options( $user_id, $service_name)
    {
        return $this->emailService->where('service', $service_name)->where('user_id', $user_id )->lists('value');
    }

	/**
	 * Connect to active campaign.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
    public function connect( $inputs )
	{
		require_once(base_path().'/lib/ActiveCampaign/ActiveCampaign.class.php');
	    $ac = new ActiveCampaign($inputs['ac_api_url'], $inputs['ac_api_key']);
   		if (!(int)$ac->credentials_test()) {
   		    return ['status' => 'warning', 'message' => 'Access denied: Invalid credentials (URL and/or API key)'];
   		}

	    $this->set_service_option($this->serviceName, ['ac_api_key' => $inputs['ac_api_key'] , 'ac_api_url' => $inputs['ac_api_url'] ] );

	    return ['status' => 'success', 'message' => 'API config data saved!'];
	}

    /**
	 * Get interspire Lists.
	 *
	 * @return array
	 */
	public function getList()
    {
    	require_once(base_path().'/lib/ActiveCampaign/ActiveCampaign.class.php');
        try {
            $conf = $this->get_service_options( \Auth::id() ,$this->serviceName);
            $conf = json_decode($conf[0]);
            //dd($conf->ac_api_url);
            $ac = new ActiveCampaign( $conf->ac_api_url, $conf->ac_api_key );
            
            $data = ['ids'=>'all'];
            $lists_data = $ac->api( "list/list", $data );

            foreach ( $lists_data as $key => $value ) {
                if( is_numeric($key) ) {
                    $lists[$value->id] = $value->name;
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
    public function add_contact( $user_id , $list_id, $contact_data )
    {
    	require_once(base_path().'/lib/ActiveCampaign/ActiveCampaign.class.php');
        try {
            $conf = $this->get_service_options( $user_id , $this->serviceName);
            $conf = json_decode($conf[0]);
            //dd($conf->ac_api_url);
            $ac = new ActiveCampaign( $conf->ac_api_url, $conf->ac_api_key );
			//dd($contact_data);
			
            $contact = [
                    "email"       	   => $contact_data['email'],
                    "name"  	  	   => $contact_data['name'],
                    "p[$list_id]" 	   => $list_id,
                    "status[$list_id]" => 1,
                ];

            $contact_sync = $ac->api("contact/sync", $contact);

            if ((int)$contact_sync->success) {
                $contact_id = (int)$contact_sync->subscriber_id;
                return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
            } else {
            	return ['status' => 'warning', 'message' => 'You already subscribed!!!'];
            }
        } catch (Exception $e) {
        	return ['status' => 'error', 'message' => 'Please connect to ActiveCampaign service!'];
        }
    }

}