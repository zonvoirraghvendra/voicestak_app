<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSmtpinfoToWhitelabelsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('white_labels', function(Blueprint $table)
		{
		            $table->string('smtp_host');
                            $table->bigInteger('smtp_port');
                            $table->string('smtp_protocol');
                            $table->string('smtp_username');
                            $table->string('smtp_password');
                            $table->string('smtp_from_name');
                            $table->string('smtp_from_email');
                            $table->string('cname_url');
                            
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
                    $table->dropColumn(['smtp_host', 'smtp_port', 'smtp_protocol', 'smtp_username', 'smtp_password', 'smtp_from_name', 'smtp_from_email', 'cname_url']);	//
		});
	}

}
