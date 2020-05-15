<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('messages', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id');
			$table->integer('campaign_id');
			$table->integer('widget_id');
			$table->string('name');
			$table->string('email');
			$table->string('phone');
			$table->boolean('is_readed');
			$table->string('url');
			$table->string('file_name');
			$table->string('duration');
			$table->string('file_type');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('messages');
	}

}
