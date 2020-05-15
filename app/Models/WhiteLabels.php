<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhiteLabels extends Model {

    protected $table = 'white_labels';

    protected $fillable = [
        
        'user_id',
        'cname_url', 
        'company_name', 
        'support_link', 
        'contact_person', 
        'contact_email', 
        'premium_upgrade_url', 
        'top_bar_color', 
        'header_bar_color', 
        'background_color', 
        'button_color',
        'company_logo',
        'configure_smtp',
        'smtp_host',
        'smtp_port',
        'smtp_protocol',
        'smtp_username',
        'smtp_password',
        'smtp_from_name',
        'smtp_from_email',
        'configure_email_templates',
        'wl_video_email',
        'wl_audio_email',
        'wl_welcome_email',
        'wl_welcome_email_subject',
        'wl_audio_email_subject',
        'wl_video_email_subject'
        
    ];

}
