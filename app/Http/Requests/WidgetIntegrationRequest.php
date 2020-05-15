<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class WidgetIntegrationRequest extends Request {

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
			'email_provider_value'	=> 'required_if:provider_type,autoresponder',
			'raw_html_code' 		=> 'required_if:provider_type,raw-html',
			'rawhtml_form_action'	=> 'required_if:provider_type,raw-html',
			'first_name_field_active' 	=> 'required_if:provider_type,autoresponder|required_if:provider_type,raw-html',
			'helpdesk_email'		=> 'email'
		];
	}
}