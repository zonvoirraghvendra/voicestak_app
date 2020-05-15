<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMoreSmtpInfoToWhitelabelsTabble extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('white_labels', function(Blueprint $table)
		{
			$table->string('wl_welcome_email_subject');
                        $table->string('wl_audio_email_subject');
                        $table->string('wl_video_email_subject');
			$table->text('wl_welcome_email')->nullable();
                        $table->text('wl_audio_email')->nullable();
                        $table->text('wl_video_email')->nullable();                    
                        
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
			$table->dropColumn([ 'wl_video_email_subject', 'wl_audio_email_subject', 'wl_welcome_email_subject', 'wl_welcome_email', 'wl_audio_email', 'wl_video_email' ]);
		});
	}

}
