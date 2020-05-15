<?php namespace App\Services;

use App\Contracts\WidgetOptinServiceInterface;
use App\Models\WidgetOptin;

class WidgetOptinService implements WidgetOptinServiceInterface {

	public function __construct( WidgetOptin $widget_optin ) 
	{
		$this->widget_optin = $widget_optin;
	}

	public function addWidgetOptin( $widget_id )
	{
		$inputs = [ 'widget_id' => $widget_id];
		return $this->widget_optin->create( $inputs );
	}

}
