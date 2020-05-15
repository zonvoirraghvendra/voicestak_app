<?php namespace App\Services;


use App\Contracts\AdminServiceInterface;
use App\User;
use Config, Postmark;

class AdminService implements AdminServiceInterface {

	public function __construct( User $user ) {
		$this->user = $user;
	}

	public function sendWelcomeEmail( $user, $password ) {
		$status = Postmark\Mail::compose( Config::get( 'mail.postmark_api_key' ) )
			    ->from( 'support@voicestak.com', 'VoiceStak Support' )
			    ->addTo( $user->email, $user->name )
			    ->subject( "Welcome to VoiceStak!" )
			    ->messageHtml(
			        "<p>Dear {$user->name},</p>

			        <p>You have successfully registered as one of our VoiceStak members.</p>

			        <p>Please keep this information safe as it contains your username and password.</p>

			       	<p>Your Membership Info:</p>
			        <p>Login URL: https://app.voicestak.com/</p>
			        <p>u: [{$user->email}]</p>
					<p>p: [{$password}]</p>

					<p>If you have any questions or concerns, please submit a support ticket at support@voicestak.com</p>

					<p>To your online success!</p>
					<p>The VoiceStak Team</p>"

			    )->send();
		
		// dd($status);

		return $status;
	}
}