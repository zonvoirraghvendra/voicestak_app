<?php
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class PermissionsTableSeeder extends Seeder {

    public function run()
    {
    	DB::table('permissions')->truncate();
    	$permissions_array = ['create-widget', 'edit-widget', 'create-integration'];
	    foreach ($permissions_array as $key => $name) {
		    $permission = Permission::create([
		    	'name' => $name
		    ]);
	    }  
    }
}