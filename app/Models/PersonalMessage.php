<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalMessage extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'user_id' , 'users_count' , 'campaign_id' , 'text' ];

	public function campaign() {
		return $this->belongsTo('App\\Models\\Campaign');
	}
}