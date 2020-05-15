<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPrivacyPolicyFieldIntoWidgetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('widgets', function(Blueprint $table)
		{
			$table->string('privacy_policy_url')->after('widget_text_color');
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
			$table->dropColumn('privacy_policy_url');
		});
	}

}
