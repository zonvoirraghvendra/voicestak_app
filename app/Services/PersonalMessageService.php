<?php namespace App\Services;
use Illuminate\Contracts\Auth\Guard;
use App\Contracts\PersonalMessageServiceInterface;
use App\Contracts\MessageServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Services\CallFireService;
use App\Services\CallRailService;
use App\Services\TwilioService;
use App\Models\PersonalMessage;

class PersonalMessageService implements PersonalMessageServiceInterface {
	
	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct(Guard $auth, 
								CallFireService $callFire ,
	  							CallRailService $callRail,
	  							TwilioService $twilio,
	  							MessageServiceInterface $messageService,
	  							WidgetServiceInterface $widgetService,
	  							PersonalMessage $personalMessage )
	{
		$this->auth 		   = $auth;
		$this->callFire		   = $callFire;
		$this->callRail 	   = $callRail;
		$this->twilio   	   = $twilio;
		$this->messageService  = $messageService;
		$this->widgetService   = $widgetService;
		$this->personalMessage = $personalMessage;
	}

	public function sendSMS( $inputs )
	{
		$inputs['user_id'] = $this->auth->id();
		$messages = $this->messageService->getAllMessagesByWidgetID($inputs['widget_id']);
		$phoneNumbers = array();
		foreach ($messages as $message) {
			if(isset($message->consent) && $message->consent == 1){
				array_push($phoneNumbers, $message->phone);
			}
		}
		$phoneNumbers = array_unique($phoneNumbers);
		$widget = $this->widgetService->getWidgetById($inputs['widget_id']);
		if(isset($widget->sms_provider) && $widget->sms_provider == 'Twilio'){
			$response = $this->twilio->sendMessage($inputs, $phoneNumbers);
			if( $response['status'] == 'success' ){
				$inputs['users_count'] = count($phoneNumbers);
				$this->personalMessage->create($inputs);
				return $response;
			}
			return $response;
		}
		if(isset($widget->sms_provider) && $widget->sms_provider == 'CallFire'){
			$response = $this->callFire->sendSMS($inputs, $phoneNumbers);
			if($response['status'] == 'success'){
				$inputs['users_count'] = count($phoneNumbers);
				$this->personalMessage->create($inputs);
				return $response;
			}
			return $response;
		}
		if(isset($widget->sms_provider) && $widget->sms_provider == 'CallRail'){
			$response = $this->callRail->sendMessage($inputs, $phoneNumbers);
			if($response['status'] == 'success'){
				$inputs['users_count'] = count($phoneNumbers);
				$this->personalMessage->create($inputs);
				return $response;
			}
			return $response;
		}
	}

	public function getAllPersonalMessages()
	{
		if( $this->auth->user()->role == "user" ){
			return $this->personalMessage->where('user_id', $this->auth->id())->get();
		}else{
			$assigned_campaigns = json_decode($this->auth->user()->assigned_campaigns);
			return $this->personalMessage->whereIn('campaign_id', $assigned_campaigns )->get();
		}
	}

	public function destroyPersonalMessage($id)
	{
		return $this->personalMessage->find($id)->delete();
	}

	public function getPersonalMessagesByCampaignID( $campaign_id )
	{
		if( $this->auth->user()->role == "user" ){
			return $this->personalMessage->where('user_id', $this->auth->id())->where('campaign_id' , $campaign_id)->orderBy( 'created_at' , 'DESC' )->get();
		}else{
			if( in_array( $campaign_id, json_decode($this->auth->user()->assigned_campaigns) ) ){
				return $this->personalMessage->where('campaign_id', $campaign_id)->orderBy( 'created_at' , 'DESC' )->get();
			}
		}
	}

	public function collection( $campaign_id )
	{
		$personalMessages = $this->getPersonalMessagesByCampaignID($campaign_id);
		return $personalMessages;
	}
}