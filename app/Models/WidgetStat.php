<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WidgetStat extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'widget_id', 'user_id' ];

}
