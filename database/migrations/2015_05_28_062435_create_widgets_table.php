<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWidgetsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('widgets', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('campaign_id');
			$table->string('widget_name');
			$table->string('type');
			$table->string('tab_design');
			$table->string('tab_bg_color');
			$table->string('tab_bg_color_2');
			$table->string('tab_text_color');
			$table->boolean('lightbox');
			$table->string('widget_design');
			$table->string('widget_bg_color');
			$table->string('widget_main_headline');
			$table->string('widget_main_headline_color');
			$table->string('widget_text_color');
			$table->string('image');
			$table->string('remove_powered_by');
			$table->string('first_name_field_key');
			$table->string('first_name_field_value');
			$table->boolean('first_name_field_active');
			$table->boolean('first_name_field_required');
			$table->string('email_field_key');
			$table->string('email_field_value');
			$table->boolean('email_field_active');
			$table->boolean('email_field_required');
			$table->string('phone_field_key');
			$table->string('phone_field_value');
			$table->boolean('phone_field_active');
			$table->boolean('phone_field_required');
			$table->string('email_provider');
			$table->string('email_provider_value');
			$table->text('row_html_code');
			$table->string('sms_provider');
			$table->boolean('sms_notification');
			$table->string('helpdesk_email');
			$table->boolean('create_ticket');
			$table->integer('feedbacks');
			$table->integer('optins');
			$table->integer('clicks');
			$table->boolean('is_complete');
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
		Schema::drop('widgets');
	}

}
