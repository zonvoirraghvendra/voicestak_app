<?php namespace App\Services;

use App\Contracts\WidgetFeedbackServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Models\WidgetFeedback;

class WidgetFeedbackService implements WidgetFeedbackServiceInterface {

	public function __construct( WidgetFeedback $widget_feedback ) 
	{
		$this->widget_feedback = $widget_feedback;
	}

	public function addWidgetFeedback( $widget_id )
	{
		$inputs = [ 'widget_id' => $widget_id ];
		return $this->widget_feedback->create( $inputs );
	}

}
