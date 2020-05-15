<?php namespace App\Http\Controllers;

use App\Contracts\CampaignServiceInterface;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UserCreateRequest;
use App\User;
use Exception;
use Config, Postmark;
use Illuminate\Contracts\Auth\Guard;
Class ApiUserController extends Controller{

	public function __construct()
	{
		$this->middleware('auth');
	}

	public function getIndex( Request $request, User $user , Guard $auth , CampaignServiceInterface $campainservice)
	{
		if(!empty($request->get('campaign_id'))){
			$user_campaigns = [];
			$campaign_id = $request->get('campaign_id');
			$users = $user->where( 'parent_id' , $auth->id())->get();
			foreach ($users as $user) {
				foreach (json_decode($user->assigned_campaigns) as $key => $value) {
					if( $value == $campaign_id ){
						array_push( $user_campaigns , $user ) ;
					}
				}
			}
			$users = (object)$user_campaigns;
		}else{
			$users = $user->where( 'parent_id' , $auth->id())->get();
		}
		$campaigns = [];
		$allCampaigns = $campainservice->getAllCampaigns();
		foreach ($allCampaigns as $value) {
			$campaigns[$value->id] = $value->name ;
		};
		
		$zones_arrays = array();
		  $timestamp = time();
		  foreach(timezone_identifiers_list() as $key => $zone) {
		    date_default_timezone_set($zone);
		    $zones_arrays[$key]['zone'] = $zone;
		    $zones_arrays[$key]['diff_from_GMT'] = 'UTC/GMT ' . date('P', $timestamp);
		  }
		  return Response::json([ 'users' => $users , 'campaigns' => $allCampaigns ,'campaignslist' => $campaigns, 'first' => 1, 'zones_arrays' => $zones_arrays ]);
		// return view( 'users.index' ,[ 'users' => $users , 'campaigns' => $allCampaigns ,'campaignslist' => $campaigns, 'first' => 1, 'zones_arrays' => $zones_arrays ]);
	}

	public function getAddUser( CampaignServiceInterface $campainservice )
	{
		$campaigns = [];
		$allCampaigns = $campainservice->getAllCampaigns();
		foreach ($allCampaigns as $value) {
			$current = [ $value->id => $value->name ];
			$campaigns = array_merge($campaigns , $current);
		}
		return Response::json([ 'campaigns' => $campaigns ]);
		// return view('users.addUser' , [ 'campaigns' => $campaigns ]);	
	}

	public function postAddUser( UserCreateRequest $request , User $user)
	{
		$inputs = $request->inputs();
		if( $request->has('imagecreateurl') ){
			$inputs['image'] = $request->get('imagecreateurl');
		}elseif( $request->hasFile('image') ) {
					$avatar_name = str_random(10). "." . $request->file('image')->getClientOriginalExtension();
					$request->file('image')->move( public_path().'/assets/img/' , $avatar_name );
					$inputs['image'] = '/assets/img/'.$avatar_name;
		}
		$password = $inputs['simple_password'];
		unset($inputs['simple_password']);
		$inputs['role'] = 'customer';
		$user = $user->create( $inputs ) ;
		$this->sendWelcomeEmail( $user , $password);
		return Response::json([ 'status' => 'success', 'message' => 'User successfully created!']);
		// return redirect('/users');
	}

	public function postUpdateUser( UserUpdateRequest $request , User $user)
	{
		$id = $request->get('user_id');
		$inputs = $request->inputs();
		if($request->has('emptyimage')){
			$inputs['image'] = '';
		}elseif( $request->has('updateimageurl') ){
					$inputs['image'] = $request->get('updateimageurl');
		}elseif( $request->hasFile('image') ) {
					$avatar_name = str_random(10). "." . $request->file('image')->getClientOriginalExtension();
					$request->file('image')->move( public_path().'/assets/img/' , $avatar_name );
					$inputs['image'] = '/assets/img/'.$avatar_name;
		}
		$user->find( $id )->update( $inputs ) ;
		return Response::json([ 'status' => 'success', 'message' => 'User successfully updated!']);
		// return redirect('/users');	
	}

	public function postDeleteUser( Request $request , User $user )
	{
		$id = $request->get('id');
		$user = $user->find( $id )->delete();
		return Response::json([ 'status' => 'success', 'message' => 'User successfully deleted!']);
		// return redirect('/users')->withSuccess('User Has Been Successfully Deleted');
	}

	public function postEmailExists( Request $request ,User $user )
	{
		$email = $request->get( 'email' );
		if( $request->has('user_id') ){
			$user_id = $request->get( 'user_id' );
			return Response::json([ 'user' => $user->where( 'email' , $email )->where('id' , '!=' , $user_id)->first()]);
			// return $user->where( 'email' , $email )->where('id' , '!=' , $user_id)->first();
		}else{
			return Response::json([ 'user' => $user->where( 'email' , $email )->first()]);
			// return $user->where( 'email' , $email )->first();
		}
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
			        <p>email: [{$user->email}]</p>
					<p>password: [{$password}]</p>

					<p>If you have any questions or concerns, please submit a support ticket at support@voicestak.com</p>

					<p>To your online success!</p>
					<p>The VoiceStak Team</p>"

			    )->send();
		
		// dd($status);
			    return Response::json([ 'status' => $status]);
		// return $status;
	}
}