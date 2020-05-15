<?php namespace App\Services;

use App\Contracts\WidgetClicksServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Models\WidgetClicks;
use App\Models\Widget;
use Illuminate\Contracts\Auth\Guard;

class WidgetClicksService implements WidgetClicksServiceInterface {

	public function __construct( WidgetServiceInterface $widget_service , WidgetClicks $widget_clicks, Widget $widget ) 
	{
		$this->widget_service = $widget_service;
		$this->widget_clicks = $widget_clicks;
		$this->widget = $widget;
	}

	public function addWidgetClick( $widget_token )
	{
		$widget = $this->widget_service->getWidgetByToken( $widget_token );
		if (!empty($_SERVER['HTTP_CLIENT_IP']))  
		{  
		    $ip=$_SERVER['HTTP_CLIENT_IP'];  
		}  
		elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))  
		//to check ip is pass from proxy  
		{  
		    $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];  
		}  
		else  
		{  
		    $ip=$_SERVER['REMOTE_ADDR'];  
		}  

		$inputs = [
					'widget_id' => $widget->id,					
					'ip'        => $ip
		];
		if( null == $this->widget_clicks->where('ip',$ip)->where('widget_id' , $widget->id)->count() ){
			$this->widget_clicks->create( $inputs );
		}
	}

}
