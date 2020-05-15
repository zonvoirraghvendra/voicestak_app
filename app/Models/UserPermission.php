<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model {

	public $timestamps = false;

	protected $table = 'user_permissions';

	protected $fillable = [ 'user_id', 'permission_id' ];

}
