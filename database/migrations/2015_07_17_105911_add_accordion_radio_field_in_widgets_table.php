<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAccordionRadioFieldInWidgetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('widgets', function(Blueprint $table)
		{
			$table->text('provider_type')->after('image');
			$table->dropColumn('row_html_code');
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
			$table->dropColumn('provider_type');
			$table->text('row_html_code')->after('email_provider_value');
		});
	}

}
