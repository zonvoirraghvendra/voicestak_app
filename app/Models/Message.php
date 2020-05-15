<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'user_id' , 'user_ip' , 'campaign_id' , 'widget_id' , 'name' , 'email' , 'phone' , 'is_readed' , 'is_archived', 'consent' , 'url' , 'file_name' , 'duration' , 'file_type' , 'is_complete', 'youtube_url' , 'created_at', 'browser_and_version', 'os_and_version', 'screen_size', 'mobile' , 'tags' ];

	public function campaign() {
		return $this->belongsTo('App\\Models\\Campaign');
	}

	public function widget() {
		return $this->belongsTo('App\\Models\\Widget');
	}

	public function user() {
		return $this->belongsTo('App\\User');
	}
	
	public function userWithAssignedCampaignMessages( $assigned_campaigns )
	{
		return $this->where( 'user_id' , \Auth::id() )->orWhereIn( 'campaign_id' , $assigned_campaigns );
	}

	public function userWithAssignedCampaignMessagesCount( $assigned_campaigns )
	{
		return $this->userWithAssignedCampaignMessages( $assigned_campaigns )->where('is_readed' , 0 )->count();
	}
}