<?php namespace App\Contracts;

interface EmailServiceInterface {

	/**
	 * Connect to email service.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	public function connect( $inputs );
}