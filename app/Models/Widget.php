<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Widget extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array, 'remove_powered_by'
	 */


	protected $fillable = [ 'campaign_id' ,
							'user_id',
	 						'widget_name' ,
	 						'embed_code' ,
	 						'token_field' ,
	 						'type' ,
	 						'tab_design' ,
	 						'tab_bg_color' ,
	 						'tab_bg_color_2' ,
	 						'tab_bg_color_3' ,
	 						'tab_text_color' ,
	 						'tab_text_color_2' ,
	 						'lightbox' ,
	 						'custom_button_code',
	 						'widget_design' ,
	 						'widget_bg_color' ,
	 						'widget_main_headline' ,
	 						'widget_main_headline_color' ,
	 						'widget_main_headline_bg_color' ,
	 						'widget_buttons_bg_color' ,
	 						'widget_buttons_text_color' ,
	 						'widget_text_color' ,
	 						'remove_powered_by',
	 						'privacy_policy_url',
	 						'first_name_field_key' ,
	 						'first_name_field_value' ,
	 						'first_name_field_active' ,
	 						'first_name_field_required' ,
	 						'email_field_key' ,
	 						'email_field_value' ,
	 						'email_field_active' ,
	 						'email_field_required' ,
	 						'phone_field_key' ,
	 						'phone_field_value' ,
	 						'phone_field_active' ,
	 						'phone_field_required' ,
	 						'email_provider' ,
	 						'email_provider_value' ,
	 						'raw_html_code' ,
	 						'rawhtml_form_action',
	 						'rawhtml_form_hidden_inputs',
	 						'sms_provider' ,
	 						'sms_notification' ,
	 						'sender_phone',
	 						'helpdesk_email' ,
	 						'create_ticket' ,
	 						'send_email' ,
	 						'sendlane_emails' ,
	 						'country_code' ,
	 						'feedbacks' ,
	 						'optins' ,
	 						'clicks',
	 						'provider_type',
	 						'url_field_key' ,
	 						'url_field_value' ,
	 						'url_field_active' ,
	 						'url_field_required',
	 						'tab_type',
	 						'tab_design_text'
	 					];
	public function campaign() {
		return $this->belongsTo('App\\Models\\Campaign');
	}

	public function messages() {
		return $this->hasMany('App\\Models\\Message')->orderBy('created_at','DESC');
	}
	public function emailServices() {
		return $this->BelongsToMany('App\\Models\\EmailService', 'widget_email_services');
	}

	public function widgetClicks() {
  		return $this->HasMany('App\\Models\\WidgetClicks')->where('created_at', '>=', Carbon::now()->subMonth());
	}

	public function widgetOptins() {
  		return $this->HasMany('App\\Models\\WidgetOptin')->where('created_at', '>=', Carbon::now()->subMonth());
	}

	public function widgetFeedbacks() {
  		return $this->HasMany('App\\Models\\WidgetFeedback')->where('created_at', '>=', Carbon::now()->subMonth());
	}

	public function widgetcustomisation()
    {
        return $this->HasOne('App\\Models\\WidgetCustomisation');
    }
}