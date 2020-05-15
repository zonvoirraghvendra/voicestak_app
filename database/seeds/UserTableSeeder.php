<?php
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserTableSeeder extends Seeder {

    public function run()
    {
        if( null === User::where('email', 'support@publishvault.com')->first() ){
	        
	        $user = User::create([
	        	'name' => 'Support', 
	        	'email' => 'support@publishvault.com', 
	        	'password' => bcrypt('support123456')
	        ]);
	        
	        $user->is_premium = 1;
	        $user->is_super_admin = 1;
	        
	        $user->save();
	    }
    }
}