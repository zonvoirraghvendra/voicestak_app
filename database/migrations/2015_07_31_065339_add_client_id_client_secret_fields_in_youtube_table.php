<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClientIdClientSecretFieldsInYoutubeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('youtube_access_tokens', function(Blueprint $table)
		{
			$table->string('client_secret')->after('access_token');
			$table->string('client_id')->after('access_token');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('youtube_access_tokens', function(Blueprint $table)
		{
			$table->dropColumn('client_secret');
			$table->dropColumn('client_id');
		});
	}

}
