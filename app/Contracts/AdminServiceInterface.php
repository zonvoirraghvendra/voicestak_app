<?php namespace App\Contracts;

interface AdminServiceInterface {

	public function sendWelcomeEmail( $user, $password );

	
}