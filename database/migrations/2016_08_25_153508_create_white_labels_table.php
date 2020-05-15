<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWhiteLabelsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('white_labels', function(Blueprint $table)
		{
			
                    $table->engine = 'InnoDB';
                    $table->increments('id');
                    $table->integer('user_id')->unsigned();
                    $table->string('company_name');
                    $table->string('support_link');
                    $table->string('contact_person');
                    $table->string('contact_email');
                    $table->string('premium_upgrade_url');
                    $table->string('top_bar_color');
                    $table->string('header_bar_color');
                    $table->string('background_color');   
                    $table->string('button_color');                  
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
		Schema::drop('white_labels');
	}

}
