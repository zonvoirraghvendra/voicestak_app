<?php namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Auth;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'last_name', 'email', 'password', 'image' , 'assigned_campaigns','parent_id', "role", "status", "timezone", 'create_widgets', 'edit_widgets', 'add_users', 'add_integrations', 'remove_powered_by', 'is_premium', 'enterprise_id'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];

	public function messages() {
		return $this->hasMany('App\\Models\\Message');
	}

	public function unreadmessages() {
		return count($this->messages->where('is_readed',0));
	}
	
	public function campaigns() {
		return $this->hasMany('App\\Models\\Campaign');
	}

	public function user_assigned_campaigns(){
		$campaigns =  json_decode($this->assigned_campaigns);
                if(Auth::user()->role == 'user') {
                    $user = Auth::user();
                } else {
                   $user = User::find(Auth::user()->parent_id);
                }
                
		return $user->hasMany('App\\Models\\Campaign')->whereIn('id',$campaigns);
	}

	public function addPlan( $plan ){

		if( $plan == 'vs-premium' || $plan == 'vs-premium-monthly' ) {
			$this->is_premium = 1;
		} else {
			$this->is_premium = 0;
		}

		$this->plan = $plan;
		$this->save();
	}

	public function permissions() {
		return $this->belongsToMany('App\\Models\\Permission', 'user_permissions');
	}

	public function getPermissionIdsAttribute() {
		return $this->belongsToMany('App\\Models\\Permission', 'user_permissions')->lists('permission_id');
	}

}
