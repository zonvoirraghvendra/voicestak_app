<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToWlTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('white_labels', function(Blueprint $table)
		{
                    $table->boolean('configure_smtp')->default(0);
                    $table->boolean('configure_email_templates')->default(1);
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
                    $table->dropColumn('configure_smtp');
                    $table->dropColumn('configure_email_templates');
                    
		});
	}

}
