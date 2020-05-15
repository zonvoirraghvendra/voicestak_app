<?php namespace App\Services;

use App\Contracts\SmsServiceInterface;
use App\Models\SmsService;
use Lib\Twilio\Twilio;
use Illuminate\Contracts\Auth\Guard;
use Exception;
class TwilioService implements SmsServiceInterface {
	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , SmsService $smsService )
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
	private $serviceName = 'Twilio';

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
		$sid = $inputs['account_sid']; // Your Account SID from www.twilio.com/user/account
		$token = $inputs['auth_token']; // Your Auth Token from www.twilio.com/user/account

		$client = new \Services_Twilio($sid, $token);
		try {	
			foreach($client->account->connect_apps as $connect_app) {
		        $app = $connect_app;
		    }
		    $this->set_service_option($this->serviceName, [ 'account_sid' => $sid, 'auth_token' => $token ]);/**/

		    return ['status' => 'success', 'message' => 'You are successfully connected!'];
		} catch(Exception $e){
			return ['status' => 'warning', 'message' => 'Invalid Credentails!!!'];
		}
		
	}

	public function sendMessage($inputs, $phoneNumbers)
	{
		$conf = $this->get_service_options($this->auth->id(), $this->serviceName);
        $conf = json_decode($conf[0]);
		$client = new \Services_Twilio($conf->account_sid, $conf->auth_token);
		try {
			foreach ($phoneNumbers as $number) {
			    $message = $client->account->messages->create(array(
			        "From" => $inputs['senderPhone'],
			        "To"   => $number,
			        "Body" => $inputs['text']
			    ));
			}
			return ['status' => 'success', 'message' => 'Your message has been sent.'];
		} catch (Exception $e) {
		    return [ 'status' => 'error', 'message' => $e->getMessage()];
		}
		
	}
}