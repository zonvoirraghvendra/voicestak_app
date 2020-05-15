<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class SendReachApiConnectRequest extends Request {

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
	public function rules()
	{
		return [
			'sr_public_key' => 'required',
			'sr_private_key' => 'required'
		];
	}

}