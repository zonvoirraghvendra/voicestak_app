<?php namespace App\Services;

use App\Contracts\SmsServicesServiceInterface;
use App\Models\SmsService;
use Illuminate\Contracts\Auth\Guard;

class SmsServicesService implements SmsServicesServiceInterface {
	
	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , SmsService $smsService )
	{
		$this->auth 	= $auth;
		$this->smsService  = $smsService;
	}
	
	 /**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllSmsServices()
	{
		$smsServices = $this->smsService->where( 'user_id' , $this->auth->id() )->where('active' , 1)->get();
		$response = [];
		foreach ($smsServices as $key => $smsService) {
			$values = json_decode( $smsService->value );
			foreach ($values as $key => $value) {
			 	$smsService->$key = $value;
			} 
			$response[$smsService->service] = $smsService;
		}
		return $response;
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Message object or NULL
	 */
	public function getSmsServiceByID( $id )
	{
		return $this->smsService->where('user_id',$this->auth->id())->find($id);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Message object or NULL
	 */
	public function createSmsService( $inputs )
	{
		return $this->smsService->create( $inputs );
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroySmsService( $id )
	{
		return $this->getSmsServiceByID( $id )->delete();
	}
}

