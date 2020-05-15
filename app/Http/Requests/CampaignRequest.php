<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class CampaignRequest extends Request {

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
			'name' 		  => 'required_without:campaign_id',
			'widget_name' => 'required'
		];
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function messages()
	{
		return [
		    'name.required_without' => 'Please select one of campaigns list or type name to create a new campaign.',
		];
	}


}