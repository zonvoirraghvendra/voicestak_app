<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class WidgetCustomisation extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array, 'remove_powered_by'
	 */
	protected $table = 'widget_customisation';

	protected $fillable = [ 'widget_id','widget_video_headline','widget_voice_headline', 'template_one', 'template_two', 'template_three', 'template_four', 'template_five', 'template_six', 'template_seven', 'template_eight', 'template_nine','ty_msg'];
	public function widget() {
		return $this->hasMany('App\\Models\\Widget')->orderBy('created_at','DESC');
	}

}