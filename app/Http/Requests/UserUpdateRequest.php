<?php namespace App\Http\Requests;

use App\Http\Requests\Request;
use Hash;
use Auth;
class UserUpdateRequest extends Request {

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

		if( $this->has( 'password' ) ) {
			$inputs['password'] = Hash::make($inputs['password']);
		} else {
			unset( $inputs['password'] );
		}

		unset($inputs['confirm_password']);
		unset($inputs['user_id']);
                
		if( $this->has( 'assigned_campaigns' ) ) {
			$inputs['assigned_campaigns'] = json_encode($inputs['assigned_campaigns']);
		}                

		return $inputs;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
            
            if(Auth::user()->is_enterprise) {
                
		return [
			'email' => 'required|email'
		];                
                
            } else {
		return [
			'email' => 'required|email',
			'assigned_campaigns' => 'required'
		];                
            }

	}

}