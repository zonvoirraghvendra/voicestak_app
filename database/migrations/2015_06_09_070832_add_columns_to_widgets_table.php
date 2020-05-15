<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToWidgetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('widgets', function(Blueprint $table)
		{
			$table->string('tab_bg_color_3')->after('tab_bg_color_2');
			$table->string('tab_text_color_2')->after('tab_text_color');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('widgets', function(Blueprint $table)
		{
			$table->dropColumn('tab_bg_color_3');
			$table->dropColumn('tab_text_color_2');
		});
	}

}
