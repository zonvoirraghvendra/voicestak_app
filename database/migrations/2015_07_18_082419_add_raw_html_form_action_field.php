<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRawHtmlFormActionField extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('widgets', function(Blueprint $table)
		{
			$table->text('rawhtml_form_action')->after('raw_html_code');
			$table->text('rawhtml_form_hidden_inputs')->after('rawhtml_form_action');
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
			$table->dropColumn('rawhtml_form_action');
			$table->dropColumn('rawhtml_form_hidden_inputs');
		});
	}

}
