<?php namespace App\Contracts;

interface SmsServiceInterface {

	/**
	 * Connect to email service.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	public function connect( $inputs );
}