<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'user_id' , 'name' ];

	public function widgets() {
		return $this->hasMany('App\\Models\\Widget')->orderBy('created_at','DESC');
	}

	public function messages() {
		return $this->hasMany('App\\Models\\Message')->orderBy('created_at','DESC');
	}

	public function personalMessages() {
		return $this->hasMany('App\\Models\\PersonalMessage')->orderBy('created_at','DESC');
	}

}
