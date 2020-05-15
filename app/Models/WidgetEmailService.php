<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WidgetEmailService extends Model {

	

	protected $fillable = [ 'widget_id', 'email_service_id' ];

	public function widgets()
	{
		return $this->belongsTo('App\\Models\\Widget');
	}

	public function widgetemailservices()
	{
		return $this->hasManyThrough('App\\Models\\Widget','App\\Models\\EmailService');
	}
}