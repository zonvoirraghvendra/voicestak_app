<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class YoutubeAccessToken extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'user_id', 'access_token' ];

}
