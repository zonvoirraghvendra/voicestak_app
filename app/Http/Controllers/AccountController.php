<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\AccountSettingsRequest;

use Illuminate\Http\Request;

use Auth;
class AccountController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function getIndex()
	{
		$user =  Auth::user();

		$zones_arrays = array();
		  $timestamp = time();
		  foreach(timezone_identifiers_list() as $key => $zone) {
		    date_default_timezone_set($zone);
		    $zones_arrays[$key]['zone'] = $zone;
		    $zones_arrays[$key]['diff_from_GMT'] = 'UTC/GMT ' . date('P', $timestamp);
		  }

		return view('account.index', ['user' => $user, 'zones_arrays' => $zones_arrays]);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function putUpdate( AccountSettingsRequest $request )
	{
		$user = Auth::user();

		$inputs = $request->all();

		if( $request->hasFile('image') ) {
			$avatar_name = str_random(10). "." . $request->file('image')->getClientOriginalExtension();
			$request->file('image')->move( public_path().'/assets/img/' , $avatar_name );
			$inputs['image'] = "/assets/img/".$avatar_name;
		}

		if( $request->has('password') ) {
			$inputs['password'] = bcrypt( $request['password'] );
		} else {
			unset( $inputs['password'] );
		}


		if ( null != $user->update( $inputs ) ) {
			return \Redirect::back()->withSuccess('The user has been successfully updated !');
		}
		return \Redirect::back()->withError('Input fields are incorrect !');
	}

}