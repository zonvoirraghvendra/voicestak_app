<?php namespace App\Http\Requests;
use App\Http\Requests\Request;
use Intervention\Image\ImageManagerStatic as InterventionImage;
use Auth;
use Input;

class WhiteLabelUpdateRequest extends Request {

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

                'company_name' => 'required|string',
                'support_link' => 'required|url|string',
                'contact_person' => 'required',
                'contact_email' => 'required|email',
                'premium_upgrade_url' => 'url',
                'company_logo' => 'image',
                'cname_url'  =>  'string',
                'top_bar_color'  =>  'string',
                'header_bar_color'  =>  'string',
                'background_color'  =>  'string',
                'button_color'  =>  'string',
                'smtp_host'  =>  'string',
                'smtp_port'  =>  'integer',
                'smtp_protocol'  =>  'string',
                'smtp_username'  =>  'string',
                'smtp_password'  =>  'string',
                'smtp_from_name'  =>  'string',
                'smtp_from_email'  =>  'email',
                'wl_audio_email' => 'string',
                'wl_video_email'=> 'string',
                'wl_welcome_email' => 'string',
                'wl_welcome_email_subject'=> 'string'   ,
                'wl_video_email_subject' => 'string',
                'wl_audio_email_subject'=> 'string'                   

            ];
	}

}