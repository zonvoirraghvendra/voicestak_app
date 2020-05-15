<?php namespace App\Http\Requests;
use App\Http\Requests\Request;


class SmtpTestRequest extends Request {

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


                    'smtp_host' => 'required|string',
                    'smtp_port' => 'required|integer',
                    'smtp_protocol' => 'required',
                    'smtp_username' => 'required|string',
                    'smtp_password' => 'required|string',
                    'smtp_from_name' => 'required|string',
                    'smtp_from_email' => 'required|email',                 

            ];
	}

}