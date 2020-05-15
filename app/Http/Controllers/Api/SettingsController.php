<?php namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Contracts\EmailServicesServiceInterface;
use App\Contracts\SmsServicesServiceInterface;
use App\Contracts\MessageServiceInterface;
use App\Contracts\CampaignServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Contracts\WidgetFeedbackServiceInterface;
use App\Contracts\WidgetOptinServiceInterface;
use App\Contracts\WidgetStatServiceInterface;
use App\Contracts\YoutubeServiceInterface;
use App\Services\GetResponseService;
use App\Services\IcontactService;
use App\Services\AWeberService;
use App\Services\InterspireService;
use App\Services\MailChimpService;
use App\Services\SendReachService;
use App\Services\InfusionSoftService;
use App\Services\ActiveCampaignService;
use App\Services\OntraportService;
use App\Services\ConstantContactService;
use App\Services\TwilioService;
use App\Services\CallFireService;
use App\Services\CallRailService;
use App\Services\CampaignMonitorService;
use App\Http\Requests\MessageRequest;
use App\Http\Requests\GetResponseApiConnectRequest;
use App\Http\Requests\IcontactApiConnectRequest;
use App\Http\Requests\InterspireApiConnectRequest;
use App\Http\Requests\MailChimpApiConnectRequest;
use App\Http\Requests\SendReachApiConnectRequest;
use App\Http\Requests\InfusionSoftApiConnectRequest;
use App\Http\Requests\ActiveCampaignApiConnectRequest;
use App\Http\Requests\OntraportApiConnectRequest;
use App\Http\Requests\ConstantContactApiConnectRequest;
use App\Http\Requests\AweberApiConnectRequest;
use App\Http\Requests\AWeberApiConnectCallbackRequest;
use App\Http\Requests\CallFireApiConnectRequest;
use App\Http\Requests\CallRailApiConnectRequest;
use App\Http\Requests\TwilioApiConnectRequest;
use App\Http\Requests\CampaignMonitorApiConnectRequest;
use Lib\Youtube\MyYoutube;
use SMS, Log;
use Exception;

class SettingsController extends Controller {


	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct( MyYoutube $myYoutube , WidgetStatServiceInterface $widgetStatService, MessageServiceInterface $messageService, MessageRequest $request, WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService, YoutubeServiceInterface $youtubeService , WidgetFeedbackServiceInterface $widget_feedback_service , WidgetOptinServiceInterface $widget_optin_service , Message $message)
	{
		$this->widgetStatService = $widgetStatService;
		$this->messageService = $messageService;
		$this->widgetService = $widgetService;
		$this->campaignService = $campaignService;
		$this->youtubeService = $youtubeService;
		$this->request = $request;
		$this->message = $message;
		$this->widget_feedback_service = $widget_feedback_service;
		$this->widget_optin_service = $widget_optin_service;

		$this->middleware('api');
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

	public function createSubscriber( 	$user_id,
										$email_provider,
	 								  	$email_provider_value,
	  									Request $request,
	   									MailChimpService $mailChimpService,
	   									GetResponseService $getResponseService,
	   									AweberService $aweberService,
	   									SendReachService $sendReachService,
	   									IcontactService $icontactService,
	   									OntraportService $ontraportService,
	   									InfusionSoftService $infusionService,
	   									InterspireService $interspireService,
	   									ActiveCampaignService $activeCampaignService,
	   									ConstantContactService $constantContactService,
	   									CampaignMonitorService $campaignMonitorService
	   								)
	{
		$this->updateMessage($request->all());

		if( $email_provider == 'MailChimp' ){
			$service = $mailChimpService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);	
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif( $email_provider == 'GetResponse' ){
			$service = $getResponseService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif( $email_provider == 'Aweber' ){
			$service = $aweberService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif( $email_provider == 'Icontact' ){
			$service = $icontactService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif($email_provider == 'Interspire'){
			$service = $interspireService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif($email_provider == 'ActiveCampaign'){
			$service = $activeCampaignService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif($email_provider == 'ConstantContact'){
			$service = $constantContactService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif($email_provider == 'CampaignMonitor'){
			$service = $campaignMonitorService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif($email_provider == 'Ontraport'){
			$service = $ontraportService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif($email_provider == 'SendReach'){
			$service = $sendReachService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}elseif($email_provider == 'InfusionSoft'){
			$service = $infusionService->add_contact($user_id, $email_provider_value, $request->all());
			if($service['status'] != "error"){
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
			return response()->json(['message' => 'Something went wrong please try again!'], 501);
		}

	}

	private function updateMessage($inputs)
	{
		$type = null;
		$url = null;
		$token   	 = $inputs['token'];
		$widget 	 = $this->widgetService->getAllWidgets()->where('token_field', $token)->first();
		$widget_id   = $widget->id;
		$campaign_id = $widget->campaign_id;
		$isLoggedIn  = false;
		$campaigns   = $this->campaignService->getCampaignByID($campaign_id);
		$user_id 	 = $widget->user_id;
		if(\Auth::id() && \Auth::id() == $user_id){
			$isLoggedIn = true;
		} else {
			\Auth::loginUsingId($user_id);
			$isLoggedIn = false;
		}
		$email = json_decode($widget->sendlane_emails);
		if( $widget->helpdesk_email ){
			array_push( $email, $widget->helpdesk_email );
		}
		
		$this->widgetStatService->createWidgetStat([ 'user_id' => $user_id, 'widget_id' => $widget_id]);
		
		$name = isset( $inputs['name'] ) ? $inputs['name'] : null;

		if(null != $message = $this->messageService->updateMessages( $inputs['id'], $this->request->inputs($campaign_id, $widget_id, $user_id , $name , $inputs['email']) )) {


			if(count($this->youtubeService->isConnected($user_id))){
				$exists = $this->youtubeService->exists(1);
				if($inputs['file_type'] == 'video'){
					try {
						$youtube_id = $this->youtubeService->uploadVideoToYoutube($this->messageService->getMessageById($inputs['id'])->file_name);
						$youtube_url = '//youtu.be/'.$youtube_id;
						$type = 'video';
						$url = $youtube_url;
						$message = $this->messageService->getMessageById($inputs['id']);
						$message->youtube_url = $youtube_url;
						$message->save();
					} catch(Exception $e) {
						return response()->json(['message' => $e->getMessage()], 501);
					}
				}
			}
			if($inputs['file_type'] == 'audio'){
				if(null !== $audio = $this->messageService->uploadAudioToAmazon($this->messageService->getMessageById($inputs['id'])->file_name)){
					$audio_file = $this->messageService->getAudioFromAmazon($audio);
					$type = 'audio';
					$message = $this->messageService->getMessageById($inputs['id']);
					$url = $audio_file;
					$message->file_name = $audio_file;
					$message->save();
				}
			}

			if((isset($widget->first_name_field_active) && $widget->first_name_field_active == '1') || (isset($widget->email_field_active) && $widget->email_field_active == '1') || (isset($widget->phone_field_active) && $widget->phone_field_active == '1'))
			{
				$this->widget_optin_service->addWidgetOptin( $widget->id );
			}
			$this->messageService->sendEmailWithSandLane( $email , $type , $url );
			$this->widget_feedback_service->addWidgetFeedback( $widget->id );
			if(!$isLoggedIn)
				\Auth::logout();
			return response()->json(['message' => 'Message successfully updated!'], 200);
		}
	}

	public function createSubscriberRow( WidgetServiceInterface $widgetService , MessageServiceInterface $messageService, Request $request )
	{
		$inputs      = $request->all();
		$fields      = $request->all();
		unset( $fields['token'] , $fields['id'] , $fields['file_name'] , $fields['file_type'] , $fields['is_complete'] , $fields['duration'] );
		$token   	 = $request->get('token');
		$widget 	 = $widgetService->getAllWidgets()->where('token_field', $token)->first();
		$inputs['user_id'] 	 = $widget->user_id;
		$form_action = $widget->rawhtml_form_action;
		if( strrpos( $form_action , '?' ) )
		{
			$form_params = substr( $form_action, strrpos( $form_action , '?' ) +1 );
			$form_action = substr( $form_action, 0 , strrpos( $form_action , '?' ) );
		}
		
		$postvars = '';

		foreach( $fields as $key => $value ) {
			if( gettype ( $value ) == 'array' ){
				foreach( $value as $key2 => $value2 ){
					$postvars .= $key2 . "=" . $value2 . "&";
				}
			}else{
			    $postvars .= $key . "=" . $value . "&";
			}
		}


		if( isset($form_params) )
		{
			$postvars = $postvars.$form_params;
		}else{
			$postvars = rtrim($postvars, '&');
		}
		try {
		    $ch = curl_init();

		    if ( FALSE === $ch )
		        throw new Exception('failed to initialize');
		    curl_setopt( $ch, CURLOPT_HEADER, 0 );
		    // dd( $form_action , $postvars );
		    if( false === strpos( $form_action , 'http' ) ){
		    	curl_setopt( $ch, CURLOPT_URL, 'http:'.$form_action );
		    }else{
		    	curl_setopt( $ch, CURLOPT_URL, $form_action );
		    }
		    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		    curl_setopt( $ch, CURLOPT_POST, true );
    		curl_setopt( $ch, CURLOPT_POSTFIELDS, $postvars );
		    $content = curl_exec($ch);
		    
		    if (FALSE === $content)
		        throw new Exception(curl_error($ch), curl_errno($ch));

		} catch(Exception $e) {
		    trigger_error(sprintf(
		        'Curl failed with error #%d: %s',
		        $e->getCode(), $e->getMessage()),
		        E_USER_ERROR);

		}

    	curl_close ($ch);

    	$newInputs = null;
    	foreach ($inputs as $key => $value) {
    		$newKey = strtolower($key);
    		$newInputs[$newKey] = $value;
    	}

		if ( $content !== false ) {
			if( !in_array('email', $newInputs) ){
				foreach ($newInputs as $key => $value) {
					if( preg_match("/mail/" , $key ) ){
						$newInputs['email'] = $value;
					}else{
						if( gettype($value) == 'array' ){
							foreach ( $value as $key1 => $value1 ) {
								if ( preg_match("/mail/" , $key1 ) ){
									$newInputs['email'] = $value1;
								}
							}
						}
					}
				}
			}

			if( !in_array('name', $newInputs) ){
				foreach ($newInputs as $key => $value) {
					if( preg_match("/name/" , $key ) ){
						if( $key !== 'file_name' ){
							$newInputs['name'] = $value;
						}
					}else{
						if( gettype($value) == 'array' ){
							foreach ( $value as $key1 => $value1 ) {
								if( preg_match("/name/" , $key1 ) ){
									if( $key !== 'file_name' ){
										$newInputs['name'] = $value;
									}
								}
							}
						}
					}
				}
			}
			if( $this->updateMessage( $newInputs ) )
			{
				return response()->json(['message' => 'You are successfully subscribed!'], 200);
			}
		} else { 
			return response()->json(['message' => 'Error was occured!'], 501);
		}		
	}

}
