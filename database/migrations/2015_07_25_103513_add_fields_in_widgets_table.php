<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsInWidgetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('widgets', function(Blueprint $table)
		{
			$table->string('widget_buttons_text_color')->after('widget_main_headline_color');
			$table->string('widget_buttons_bg_color')->after('widget_main_headline_color');
			$table->string('widget_main_headline_bg_color')->after('widget_main_headline_color');
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
			$table->dropColumn('widget_buttons_text_color');
			$table->dropColumn('widget_buttons_bg_color');
			$table->dropColumn('widget_main_headline_bg_color');
		});
	}

}
