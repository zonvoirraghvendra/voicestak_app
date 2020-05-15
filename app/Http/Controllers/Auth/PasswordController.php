<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Auth\Passwords\TokenRepositoryInterface;
use Illuminate\Http\Request;
use Postmark\Mail;
use Input, Response, Config, App, Hash, Auth;


class PasswordController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Password Reset Controller
	|--------------------------------------------------------------------------
	|
	| This controller is responsible for handling password reset requests
	| and uses a simple trait to include this behavior. You're free to
	| explore this trait and override any methods you wish to tweak.
	|
	*/

	use ResetsPasswords;

	/**
	 * Create a new password controller instance.
	 *
	 * @param  \Illuminate\Contracts\Auth\Guard  $auth
	 * @param  \Illuminate\Contracts\Auth\PasswordBroker  $passwords
	 * @return void
	 */
	public function __construct(Request $request, TokenRepositoryInterface $tokens, Guard $auth, PasswordBroker $passwords)
	{
		$this->auth = $auth;
		$this->passwords = $passwords;
		$this->tokens = $tokens;
		$this->request = $request;

		$this->middleware('guest');
	}


	public function postEmail()
	{
		$user = $this->passwords->getUser($this->request->only('email'));
		if ( !$user )
		{
			return redirect()->back()->withNotice('Invalid user');
		}
	
		$token = $this->tokens->create($user);
		// dd( $user, $token );
		Mail::compose( Config::get( 'mail.postmark_api_key' ) )
		                     ->from( 'support@voicestak.com', 'Voicestak Support' )
		                     ->addTo( $user->email, $user->namespace )
		                     ->subject( "Reset Password" )
		                     ->messageHtml(
		                         "Please click <a href='https://app.voicestak.com/password/reset/{$token}' target='_blank'>here</a> to reset your password.
								<br />
								Sincerely,<br />
								Mark Thompson & Matt Callen"
		                     )->send();
		    
		return redirect()->back()->with('success', 'Reset link was sent to your email!');
	}



	public function postReset(){
	    $credentials = $this->request->only(
	        'email', 'password', 'password_confirmation', 'token'
	    );
	    $user = $this->passwords->getUser($this->request->only('email'));
		//var_dump($credentials);exit;
	    $response = $this->passwords->reset($credentials, function($user, $password)
	    {
	        $user->password = bcrypt($password);

	        $user->save();
	    });

	    switch ($response)
	    {
	        case PasswordBroker::INVALID_PASSWORD:
	        case PasswordBroker::INVALID_TOKEN:
	        case PasswordBroker::INVALID_USER:
	            return redirect()->back()->withNotice(trans($response));

	        case PasswordBroker::PASSWORD_RESET:
	            Auth::login($user);
	            return redirect()->to('/widgets')->with('success','Your password has been successfully changed.');
	    }
	}
}
