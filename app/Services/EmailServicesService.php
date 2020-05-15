<?php namespace App\Services;

use App\Contracts\EmailServicesServiceInterface;
use App\Models\EmailService;
use App\Models\WidgetEmailService;
use Illuminate\Contracts\Auth\Guard;

class EmailServicesService implements EmailServicesServiceInterface {
	
	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , EmailService $emailService , WidgetEmailService $widgetemailservice)
	{
		$this->auth 	= $auth;
		$this->emailService  = $emailService;
		$this->widgetemailservice = $widgetemailservice;
	}
	
	 /**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllEmailServices()
	{
		$emailServices = $this->emailService->where( 'user_id' , $this->auth->id() )->where('active' , 1)->get();
		$response = [];
		foreach ($emailServices as $key => $emailService) {
			$values = json_decode( $emailService->value );
			foreach ($values as $key => $value) {
			 	$emailService->$key = $value;
			} 
			$response[$emailService->service] = $emailService;
		}
		return $response;
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Message object or NULL
	 */
	public function getEmailServiceByID( $id )
	{
		return $this->emailService->where('user_id',$this->auth->id())->find($id);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Message object or NULL
	 */
	public function createEmailService( $inputs )
	{
		return $this->emailService->create( $inputs );
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyEmailService( $id )
	{
		return $this->getEmailServiceByID( $id )->delete();
	}
}

