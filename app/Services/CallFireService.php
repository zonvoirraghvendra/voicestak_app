<?php namespace App\Services;

use CallFire\Api\Rest\Response\ResourceException;
use  CallFire\Api\Client;
use CallFire\Api\Rest\Request\QueryBroadcasts;
use App\Contracts\SmsServiceInterface;
use App\Models\SmsService;
use Illuminate\Contracts\Auth\Guard;
use CallFire\Api\Rest\Request\QueryContactLists;
use CallFire\Api\Rest\Request\QueryContacts;
use CallFire\Api\Rest\Request\SendText;
use CallFire\Api\Soap\Request\GetContactList;

use SMS;
use Exception;
use Config;

require_once(base_path().'/lib/CallFire/vendor/autoload.php');

class CallFireService implements SmsServiceInterface {
	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth  ,SmsService $smsService )
	{
		$this->auth = $auth;
		$this->smsService = $smsService;
	}


	/**
	 * Get service name
	 *
	 * @var string
	 * @access private
	 */
	private $serviceName = 'CallFire';

	/**
	 * Get inputs to set sms service connection.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	public function set_service_option( $service, $value )
	{
		$this->smsService->user_id = $this->auth->id();

		$this->smsService->service = $service;

		$this->smsService->value   = json_encode($value);

		$this->smsService->active  = 1;

		$this->smsService->save();
	}

	/**
     * Get service options
     */
    public function get_service_options($user_id, $service_name)
    {
        return $this->smsService->where('service', $service_name)->where('user_id', $user_id)->lists('value');
    }

	/**
	 * Connect to sms service.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	public function connect( $inputs )
	{
		try{

			$client = Client::Rest($inputs['app_login'], $inputs['app_password'], "Broadcast");
			$request = new QueryBroadcasts;
			$response = $client->QueryBroadcasts($request);
			$broadcasts = $client::response($response);
			if(method_exists($broadcasts,'getHttpStatus')){
				return ['status' => 'warning','message' => 'Invalid Login and/or password'];
			}
			$this->set_service_option($this->serviceName, ['app_login' => $inputs['app_login'], 'app_password' => $inputs['app_password']]);
			return [ 'status' => 'success', 'message' => 'You are successfully connected'];	
		} catch(Exception $e){
			return [ 'status' => 'error', 'message' => $e->getMessage()];
		}
		
	}

	public function getLists()
	{
		$client = Client::Rest('a204b1568974', '1a2537b2d115e151', "Contact");
		$request = new QueryContactLists();
		$response = $client->QueryContactLists($request);

		$array=json_decode(json_encode(simplexml_load_string($response)),true);
		$lists = $array['ContactList'];
		dd($lists);
	}

	public function getListContacts()
	{
		$client = Client::Soap('a204b1568974', '1a2537b2d115e151', "Contact");
		$request = new GetContactList;
		$request = $request->setId('721934003');
		$response = $client->GetContactList( $request );
		dd( $response );

		$array=json_decode(json_encode(simplexml_load_string($response)),true);
		dd( $array );
	}
	public function sendSMS($inputs, $phoneNumbers)
	{
		$conf = $this->get_service_options($this->auth->id(), $this->serviceName);
        $conf = json_decode($conf[0]);
		$client = Client::Rest($conf->app_login, $conf->app_password, "Text");

		$request = new SendText;
		$request->setFrom($inputs['senderPhone']);
		$request->setTo($phoneNumbers);
		$request->setMessage($inputs['text']);

		$response = $client->SendText($request);
		$result = $client::response($response);
		if($result instanceof ResourceReference) {
		    return ['status' => 'success', 'message' => 'Your message has been sent.'];
		}
		return [ 'status' => 'error', 'message' => $result->getMessage()];
	}
	
}