<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmsService extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'user_id' , 'service' , 'value', 'active' ];

}