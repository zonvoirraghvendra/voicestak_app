<?php namespace App\Contracts;

interface SmsServicesServiceInterface {

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllSmsServices();

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Message object or NULL
	 */
	public function getSmsServiceByID( $id );

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Message object or NULL
	 */
	public function createSmsService( $inputs );

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroySmsService( $id );
}