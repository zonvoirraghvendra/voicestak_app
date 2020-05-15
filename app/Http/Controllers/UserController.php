<?php namespace App\Http\Controllers;

use App\Contracts\CampaignServiceInterface;
use App\Contracts\MessageServiceInterface;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UserCreateRequest;
use App\User;
use App\Models\Permission;
use App\Models\UserPermission;
use Exception;
use Config, Postmark;
use Illuminate\Contracts\Auth\Guard;
use Auth;
use App\Repositories\WhiteLabelRepository;

Class UserController extends Controller{

	public function __construct()
	{
		$this->middleware('auth');
	}

	public function getIndex( Request $request, User $user , Permission $permission ,  Guard $auth , CampaignServiceInterface $campainservice, UserPermission $userPermission)
	{
		if(!empty($request->get('campaign_id'))){
			$user_campaigns = [];
			$campaign_id = $request->get('campaign_id');
                        
                        if(Auth::user()->role == 'customer') {
                            
                           $users = $user->where( 'parent_id' , Auth::user()->parent_id)->get(); 
                            
                        } else {
                            
                           $users = $user->where( 'parent_id' , $auth->id())->get(); 
                            
                        }
                        
			foreach ($users as $user) {
				foreach (json_decode($user->assigned_campaigns) as $key => $value) {
					if( $value == $campaign_id ){
						array_push( $user_campaigns , $user ) ;
					}
				}
			}
			$users = (object)$user_campaigns;
		} else {
                    
			if(Auth::user()->role == 'customer') {
                            
                           $users = $user->where( 'parent_id' , Auth::user()->parent_id)->get(); 
                            
                        } else {
                            
                           $users = $user->where( 'parent_id' , $auth->id())->get(); 
                            
                        }
                        
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

		$permissions_list = ['create_widgets', 'edit_widgets', 'add_users', 'add_integrations', 'remove_powered_by'];

		return view( 'users.index' ,[ 'users' => $users , 'campaigns' => $allCampaigns ,'campaignslist' => $campaigns, 'first' => 1, 'zones_arrays' => $zones_arrays , 'permissions_list' => $permissions_list ]);
                
}

	public function getAddUser( CampaignServiceInterface $campainservice )
	{
		$campaigns = [];
		$allCampaigns = $campainservice->getAllCampaigns();
		foreach ($allCampaigns as $value) {
			$current = [ $value->id => $value->name ];
			$campaigns = array_merge($campaigns , $current);
		}

		return view('users.addUser' , [ 'campaigns' => $campaigns ]);	
	}

	public function postAddUser( UserCreateRequest $request , User $user, UserPermission $userPermission, MessageServiceInterface $messageService )
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
                
                if(Auth::user()->is_enterprise == 1) {
                    $inputs['role'] = 'user';
                    $inputs['enterprise_id'] = Auth::user()->id;
                }
                
                if(Auth::user()->is_premium == 1) {
                    
                    $inputs['role'] = 'customer';
                
                    $inputs['create_widgets'] = (isset($inputs['permissions']) && in_array('create_widgets', $inputs['permissions']))? 1 : 0;

                    $inputs['edit_widgets'] = (isset($inputs['permissions']) && in_array('edit_widgets', $inputs['permissions']))? 1 : 0;

                    $inputs['add_users'] = (isset($inputs['permissions']) && in_array('add_users', $inputs['permissions']))? 1 : 0;

                    $inputs['add_integrations'] = (isset($inputs['permissions']) && in_array('add_integrations', $inputs['permissions']))? 1 : 0;

                    $inputs['remove_powered_by'] =  (isset($inputs['permissions']) && in_array('remove_powered_by', $inputs['permissions']))? 1 : 0;   
                    
                    $inputs['enterprise_id'] = Auth::user()->enterprise_id;

                } 

                $inputs['parent_id'] = Auth::user()->id;                 

                $user = $user->create( $inputs ) ;
                
		$messageService->sendWelcomeEmail( $user->name , $user->email, $password );

		return redirect('/users')->withSuccess('User Has Been Successfully Created');                
               
	}

	public function postUpdateUser( UserUpdateRequest $request , User $user , UserPermission $userPermission)
	{
            $id = $request->get('user_id');

            $user = User::find( $id );

            $inputs = $request->inputs();

            if(Auth::user()->is_premium) {

                if($request->has('emptyimage')){
                        $inputs['image'] = '';
                }elseif( $request->has('updateimageurl') ){
                                        $inputs['image'] = $request->get('updateimageurl');
                }elseif( $request->hasFile('image') ) {
                                        $avatar_name = str_random(10). "." . $request->file('image')->getClientOriginalExtension();
                                        $request->file('image')->move( public_path().'/assets/img/' , $avatar_name );
                                        $inputs['image'] = '/assets/img/'.$avatar_name;
                }

                $inputs['create_widgets'] = (isset($inputs['permissions']) && in_array('create_widgets', $inputs['permissions']))? 1 : 0;

                $inputs['edit_widgets'] = (isset($inputs['permissions']) && in_array('edit_widgets', $inputs['permissions']))? 1 : 0;

                $inputs['add_users'] = (isset($inputs['permissions']) && in_array('add_users', $inputs['permissions']))? 1 : 0;

                $inputs['add_integrations'] = (isset($inputs['permissions']) && in_array('add_integrations', $inputs['permissions']))? 1 : 0;

                $inputs['remove_powered_by'] =  (isset($inputs['permissions']) && in_array('remove_powered_by', $inputs['permissions']))? 1 : 0;                      

            } 
            
            
                
            $user->update( $inputs );

            return redirect('/users')->withSuccess('User Has Been Successfully Updated');
                
	}

	public function postDeleteUser( Request $request , User $user, UserPermission $userPermission )
	{
		$id = $request->get('id');
		$user_permissions = $userPermission->where( 'user_id', $id )->delete();
		$user = $user->find( $id )->delete();
		return redirect('/users')->withSuccess('User Has Been Successfully Deleted');
	}

	public function postEmailExists( Request $request ,User $user )
	{
		$email = $request->get( 'email' );
		if( $request->has('user_id') ){
			$user_id = $request->get( 'user_id' );
			return $user->where( 'email' , $email )->where('id' , '!=' , $user_id)->first();
		}else{
			return $user->where( 'email' , $email )->first();
		}
	}

	public function sendWelcomeEmail( $user, $password  ) {
            
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

		return $status;
                
	}
}
