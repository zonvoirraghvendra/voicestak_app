<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class InterspireApiConnectRequest extends Request {

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
			'intr_username' => 'required',
			'intr_usertoken' => 'required',
			'intr_api_path' => 'required',
		];
	}

}