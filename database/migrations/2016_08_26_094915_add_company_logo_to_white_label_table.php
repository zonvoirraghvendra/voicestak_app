<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCompanyLogoToWhiteLabelTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('white_labels', function(Blueprint $table)
		{
		$table->string('company_logo')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('white_labels', function(Blueprint $table)
		{
                    $table->dropColumn('company_logo');
		});
	}

}
