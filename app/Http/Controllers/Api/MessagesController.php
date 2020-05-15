<?php namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SettingsController;
use App\Contracts\MessageServiceInterface;
use App\Contracts\WidgetStatServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Contracts\CampaignServiceInterface;
use App\Contracts\YoutubeServiceInterface;
use App\Contracts\WidgetFeedbackServiceInterface;
use App\Contracts\WidgetOptinServiceInterface;
use Illuminate\Http\Request;
use App\Http\Requests\MessageRequest;

class MessagesController extends Controller {


	public function __construct()
	{
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
	public function store(MessageRequest $request, MessageServiceInterface $messageService)
	{
		if(null != $message = $messageService->createMessage($request->all())){
			return response()->json(['data' => ['file_name' => $message->file_name, 'id' => $message->id]], 200);
			// return ['file_name' => $message->file_name, 'id' => $message->id];
		}
		return response()->json(['message' => 'Error was occured!'], 501);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id, MessageServiceInterface $messageService)
	{
		if(null !== $message = $messageService->getMessageById($id)) {
			return response()->json(['data' => $message]);
		}
		return response()->json(['status' => 'error', 'message' => 'Message not found!']);
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
		
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function updateMessage($id, WidgetStatServiceInterface $widgetStatService, MessageServiceInterface $messageService, MessageRequest $request, WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService, YoutubeServiceInterface $youtubeService , WidgetFeedbackServiceInterface $widget_feedback_service , WidgetOptinServiceInterface $widget_optin_service)
	{
		$type 		 = null;
		$url 		 = null;
		$token   	 = $request->get('token');
		$widget 	 = $widgetService->getAllWidgets()->where('token_field', $token)->first();
		if( $widget === null ) {
			return response()->json(['message' => 'Widget with this token not found!'], 404);
		}
		$widget_id   = $widget->id;
		$campaign_id = $widget->campaign_id;
		$isLoggedIn  = false;
		$campaigns   = $campaignService->getCampaignByID($campaign_id);
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
		$widgetStatService->createWidgetStat([ 'user_id' => $user_id, 'widget_id' => $widget_id]);
		
		if(null != $message = $messageService->updateMessages( $id, $request->inputs($campaign_id, $widget_id, $user_id ))) {
			if(count($youtubeService->isConnected($user_id))){
				$exists = $youtubeService->exists(1);
				if($request->get('file_type') == 'video'){
					try {
						$youtube_id = $youtubeService->uploadVideoToYoutube($messageService->getMessageById($id)->file_name);
						$youtube_url = '//youtu.be/'.$youtube_id;
						$type = 'video';
						$url = $youtube_url;
						$message = $messageService->getMessageById($id);
						$message->youtube_url = $youtube_url;
						$message->save();
					} catch(Exception $e) {
						return response()->json(['message' => $e->getMessage()], 501);
						// return "<h1><center style='margin-top: 50%'>" . $e->getMessage() . "</center></h1>";
					}
				}
			}
			if($request->get('file_type') == 'audio'){
				if(null !== $audio = $messageService->uploadAudioToAmazon($messageService->getMessageById($id)->file_name)){
					$audio_file = $messageService->getAudioFromAmazon($audio);
					$type = 'audio';
					$url = $audio_file;
					$message = $messageService->getMessageById($id);
					$message->file_name = $audio_file;
					$message->save();
				}
			}
			if((isset($widget->first_name_field_active) && $widget->first_name_field_active == '1') || (isset($widget->email_field_active) && $widget->email_field_active == '1') || (isset($widget->phone_field_active) && $widget->phone_field_active == '1'))
			{
				$widget_optin_service->addWidgetOptin( $widget->id );
			}
			// $message = $messageService->getMessageById($id);
			$messageService->sendEmailWithSandLane( $email , $type , $url );
			$widget_feedback_service->addWidgetFeedback( $widget->id );
			if(!$isLoggedIn)
				\Auth::logout();
			return response()->json(['message' => 'Message successfully updated!', 'message_name' => $url], 200);
		} 
		return response()->json(['message' => 'Something went wrong please check your data and try again!'], 500);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id, MessageServiceInterface $messageService)
	{
		if(null != $messageService->getMessageByID($id)){
			$messageService->destroyMessage( $id );
			return response()->json(['message' => 'Message Successfully Deleted'], 200);
			// return redirect('/messages');
		}
		return response()->json(['message' => 'Error was occured!'], 404);
	}

}
