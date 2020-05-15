<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserIdColumnToPersonalMessagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('personal_messages', function(Blueprint $table)
		{
			$table->integer('user_id')->after('id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('personal_messages', function(Blueprint $table)
		{
			$table->dropColumn('user_id');
		});
	}

}
