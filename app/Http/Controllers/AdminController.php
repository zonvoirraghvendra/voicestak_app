<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Auth, Redirect;
use App\Http\Requests\AdminAddUserRequest;
use App\Http\Requests\AdminEditUserRequest;
use App\Contracts\AdminServiceInterface;

class AdminController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function __construct( ) {

		$this->middleware('super_admin');
	}

	public function getIndex() {
		$users = User::where('role' , '<>' , 'customer')->paginate(5);
		return view('admin.admin_template', ['users'  =>  $users]);
	}

	public function getAdd() {
		$zones_arrays = array();
		  	$timestamp = time();

		  	foreach(timezone_identifiers_list() as $key => $zone) {
			    date_default_timezone_set($zone);
			    $zones_arrays[$key]['zone'] = $zone;
			    $zones_arrays[$key]['diff_from_GMT'] = 'UTC/GMT ' . date('P', $timestamp);
		  	}

		return view('admin.add-user', ['zones_arrays' => $zones_arrays]);
	}

	public function getEdit($id) {
		$user = User::find($id);

		$zones_arrays = array();
			$timestamp = time();

			foreach(timezone_identifiers_list() as $key => $zone) {
			    date_default_timezone_set($zone);
			    $zones_arrays[$key]['zone'] = $zone;
			    $zones_arrays[$key]['diff_from_GMT'] = 'UTC/GMT ' . date('P', $timestamp);
			}

		return view('admin.edit-user', ['user'	=>	$user, 'zones_arrays' => $zones_arrays]);
	}

	public function getDestroy($id)	{
		$user = User::find($id);
		$user->delete();
		return Redirect::back();
	}

	public function getLogin($id) {
		Auth::logout();
		Auth::loginUsingId($id);
		return Redirect::to('/');
	}

	public function postRegister(AdminAddUserRequest $request, AdminServiceInterface $AdminService)
	{
		$inputs = $request->inputs();
		$passwordCache = $request->get('password');

		$inputs['role'] = 'user';
		$user = User::create( $inputs );
		$user->is_premium = $inputs['is_premium'];
		$user->save();
		if( null != $user ) {
			$AdminService->sendWelcomeEmail( $user, $passwordCache );
			return Redirect::to('/su')->withSuccess('The user has been successfully registered. The Welcome Email has been sent!');
		}
		return Redirect::back()->withInput()->with('message', 'The user has been successfully registered !');
	}

	public function postUpdate(AdminEditUserRequest $request) {
		$inputs = $request->all();

		$user = User::find( $inputs['id'] );

		if( $request->has('password') ) {
			$inputs['password'] = bcrypt( $inputs['password'] );
			$user->password = $inputs['password'];
		} else {
			unset( $inputs['password'] );
		}
		$user->is_premium = $inputs['is_premium'];
		$user->save();

		if ( null != $user->update( $inputs ) ) {
			return redirect()->back()->withInput()->withSuccess('The user has been successfully updated !');
		}

		return redirect()->back()->with('message', 'Input fields are incorrect !');
	}

	public function getSearch( Request $request ) {
		$users = new User ;
		if( $request->get('filter_email') ) {
			$users = $users->where('email', 'LIKE' , "%".$request->get('filter_email')."%" );
		}
		if( $request->get('filter_name') ) {
			$users = $users->where('name', 'LIKE' , "%".$request->get('filter_name')."%" );
		}
		$users = $users->paginate(10);
		return view('admin.admin_template', ['users'  =>  $users]);
	}

}