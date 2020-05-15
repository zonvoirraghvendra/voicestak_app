<?php namespace App\Services;

use App\Contracts\SmsServiceInterface;
use App\Models\SmsService;

use Illuminate\Contracts\Auth\Guard;
use SMS;
class CallRailService implements SmsServiceInterface {
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
	private $serviceName = 'CallRail';

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
	 * Connect to sms service.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	public function connect( $inputs )
	{
		$api_url = 'https://api.callrail.com/v1/companies.json';
  
		// Replace with your API Key
		$api_key = $inputs['callRail_api_key'];

		$ch = curl_init($api_url);

		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: Token token=\"{$api_key}\""));

		$json_data = curl_exec($ch);
		$parsed_data = json_decode($json_data);
		curl_close($ch);
		if(isset($parsed_data->error))
		{
			return ['status' => 'warning', 'message' => 'Invalid Api Key!!!'];
		}
		$this->set_service_option($this->serviceName, ['callRail_api_key' => $inputs['callRail_api_key']]);
		return ['status' => 'success', 'message' => 'You are successfully connected!'];
	}

	public function sendMessage( $inputs, $phoneNumbers )
	{
		return false;
	}
}