<?php namespace App\Http\Requests;

use App\Http\Requests\Request;
use Hash;

class AdminAddUserRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function inputs()
	{
		$inputs = $this->all();
		$inputs['password'] = Hash::make($inputs['password']);
		return $inputs;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'name'	=>	'required',
			'last_name'	=>	'required',
			'email'	=>	'required|email|unique:users',
			'password'	=>	'required|confirmed',
			'password_confirmation'	=>	'required',
			'is_premium'	=>	'required',
			'status'	=>	'required',
			'timezone'	=>	'required'
		];
	}

	public function messages()
	{
		return [
			'name.required' => 'Name field is Required',
			'website_id.required' => 'Select a website',
			'permission_level.required' => 'Choose Contributors Permission Level',
			'password.required' => 'Password field is required',
			'password.confirmed' => 'Passwords don\'t match'
		];
	}

}