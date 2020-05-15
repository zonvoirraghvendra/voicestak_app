<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WidgetClicks extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'widget_id', 'ip' ];

}
