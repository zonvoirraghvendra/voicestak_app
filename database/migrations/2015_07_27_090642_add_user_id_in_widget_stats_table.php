<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserIdInWidgetStatsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('widget_stats', function(Blueprint $table)
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
		Schema::table('widget_stats', function(Blueprint $table)
		{
			$table->dropColumn('user_id');
		});
	}

}
