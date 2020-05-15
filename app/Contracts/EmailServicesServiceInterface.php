<?php namespace App\Contracts;

interface EmailServicesServiceInterface {

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllEmailServices();

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Message object or NULL
	 */
	public function getEmailServiceByID( $id );

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Message object or NULL
	 */
	public function createEmailService( $inputs );

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyEmailService( $id );
}