<?php namespace App\Http\Requests;

use App\Http\Requests\Request;
use Auth;
class AccountSettingsRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return \Auth::check();
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'name' 					=> '',
			'email' 				=> "email|unique:users,email,".Auth::id(),
			'password' 				=> 'sometimes|confirmed',
			'password_confirmation' => '',
			'image'					=> 'mimes:jpeg,bmp,png',
			'timezone'				=> 'required'
		];
	}
}