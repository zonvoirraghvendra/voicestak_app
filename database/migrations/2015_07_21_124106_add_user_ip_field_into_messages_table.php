<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserIpFieldIntoMessagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('messages', function(Blueprint $table)
		{
			$table->string('user_ip')->after('user_id');
			$table->string('consent')->after('is_readed');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('messages', function(Blueprint $table)
		{
			$table->dropColumn('user_ip');
			$table->dropColumn('consent');
		});
	}

}
