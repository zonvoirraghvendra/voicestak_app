<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\CampaignServiceInterface;
use App\Contracts\MessageServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Contracts\WidgetFeedbackServiceInterface;
use App\Contracts\WidgetOptinServiceInterface;
use App\Contracts\WidgetStatServiceInterface;
use App\Contracts\YoutubeServiceInterface;
use App\Http\Requests\MessageRequest;
use App\Http\Requests\MessageAudioRequest;
use App\Http\Requests\MessageVideoRequest;
use App\Models\Message;
use Maatwebsite\Excel\Excel;

use Illuminate\Http\Request;
use File;
use App\User;
use Exception;

class ApiMessagesController extends Controller {

	public function __construct() {
		$this->middleware('auth', ['except' => [ 'uploadAudioFile' , 'uploadVideoFile' , 'deleteVideo' , 'deleteAudio' , 'createMessage' , 'updateMessage' , 'markMessageAsRead', 'getDomain' , 'getUnreadMessagesCount']]);
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(  Message $message , MessageRequest $request , MessageServiceInterface $messageService, WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService )
	{
		// dd($request->get('status'));
		$widget_id   = $request->get('widget_id');
		$campaign_id = $request->get('campaign_id');

		$page 		 = $request->get('page');
		if($request->get('status') != null)
			$status = $request->get('status');
		else
			$status = 0;
		if($campaign_id === '0')
			return Response::json(['status' => 'failed', 'message' => 'No data found!']);
			// return redirect('/messages');
		// if($page){
		// 	if($campaign_id){
		// 		$messages = $messageService->collection($status, $campaign_id, $widget_id);
		// 		return view('messages.parts.list',[ 'messagesList' => $messages , 'campaigns' => $campaignService->getAllCampaigns(), 'campaign_id' => $campaign_id, 'widgets' => $widgetService->getAllWidgets()]);
		// 	} else {
		// 		$messages = $messageService->getAllMessages($status);
		// 		return view('messages.parts.list', ['messagesList' => $messages]);
		// 	}
		// } else {
			if($campaign_id){
				$messages = $messageService->collection($status, $campaign_id, $widget_id);
			} else {
				$messages = $messageService->getAllMessages($status);
				//dd($messages);
			}
			return Response::json([ 'messages' => $messages , 'campaigns' => $campaignService->getAllCampaigns(), 'campaign_id' => $campaign_id, 'widget_id' => $widget_id , 'widgets' => $widgetService->getAllWidgets(), 'status' => $status]);

			// return view('messages.inbox',[ 'messages' => $messages , 'campaigns' => $campaignService->getAllCampaigns(), 'campaign_id' => $campaign_id, 'widget_id' => $widget_id , 'widgets' => $widgetService->getAllWidgets(), 'status' => $status]);
		//}
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create( MessageServiceInterface $messageService )
	{
		return Response::json([ 'message' => $messageService->getAllMessages() ]);
		// return view('messages.inbox',[ 'message' => $messageService->getAllMessages() ]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store( MessageServiceInterface $messageService, MessageRequest $request )
	{
		// $campaign_id = $request->get('campaign_id');
		// $widget_id = $request->get('widget_id');
		// if(null != $message = $messageService->createMessage( $request->all())) {
		// 	return redirect('/messages');
		// }
	}

	public function createMessage( MessageServiceInterface $messageService, MessageRequest $request, WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService )
	{
		if(null != $message = $messageService->createMessage($request->all())){
			return Response::json(['file_name' => $message->file_name, 'id' => $message->id]);
			// return ['file_name' => $message->file_name, 'id' => $message->id];
		}
		return Response::json(['status' => 'failed', 'message' => 'Error was occured!']);
	}

	public function updateMessage( $id, WidgetStatServiceInterface $widgetStatService, MessageServiceInterface $messageService, MessageRequest $request, WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService, YoutubeServiceInterface $youtubeService , WidgetFeedbackServiceInterface $widget_feedback_service , WidgetOptinServiceInterface $widget_optin_service )
	{
		$type = null;
		$url = null;
		$token   	 = $request->get('token');
		$widget 	 = $widgetService->getAllWidgets()->where('token_field', $token)->first();
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
				// 	$fileName = $youtubeService->makeVideoFromAudio($messageService->getMessageById($id)->file_name);
				// 	try {
				// 		$youtube_id = $youtubeService->uploadVideoToYoutube($fileName);
				// 	} catch(Exception $e) {
				// 		return "<h1><center style='margin-top: 50%'>Something went wrong please try again!!!</center></h1>";
				// 	}
				// } else {
					try {
						$youtube_id = $youtubeService->uploadVideoToYoutube($messageService->getMessageById($id)->file_name);
						$youtube_url = '//youtu.be/'.$youtube_id;
						$type = 'video';
						$url = $youtube_url;
						$message = $messageService->getMessageById($id);
						$message->youtube_url = $youtube_url;
						$message->save();
						// $messageService->updateMessages( $id, ['youtube_url' => $youtube_url]);
					} catch(Exception $e) {
						return Response::json([ 'status' => 'failed', 'message' => $e->getMessage()]);
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
					// $messageService->updateMessages( $id, ['file_name' => $audio_file]);
				}
			}
			if((isset($widget->first_name_field_active) && $widget->first_name_field_active == '1') || (isset($widget->email_field_active) && $widget->email_field_active == '1') || (isset($widget->phone_field_active) && $widget->phone_field_active == '1'))
			{
				$widget_optin_service->addWidgetOptin( $widget->id );
			}
			$messageService->sendEmailWithSandLane( $email , $type , $url );
			$widget_feedback_service->addWidgetFeedback( $widget->id );
			if(!$isLoggedIn)
				\Auth::logout();
			return Response::json([ 'show' => 1]);
			// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
		}


		

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
	public function update( $id, MessageServiceInterface $messageService, MessageRequest $request )
	{
		// if(null != $message = $messageService->markMessageAsRead( $id, $request->all())) {
		// 	return redirect('/messages');
		// }
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy( $id, MessageServiceInterface $messageService )
	{
		if($messageService->destroyMessage( $id )) {
			return Response::json([ 'status' => 'success', 'message' => 'Message successfully deleted' ]);
			// return redirect('/messages');
		}
		return Response::json([ 'status' => 'failed', 'message' => 'Error was occured!' ]);
	}

	public function markMessageAsRead( Request $request , MessageServiceInterface $messageService )
	{
		$id = $request->get('message_id');	
		if(null != $message = $messageService->markMessageAsRead( $id )) {
			return Response::json([ 'status' => 'success' ]);
			// return 'success';
		}
		return Response::json([ 'status' => 'failed', 'message' => 'Error was occured!' ]);
	}

	public function markMessageAsArchived( $id , MessageServiceInterface $messageService )
	{
		if(null != $message = $messageService->markMessageAsArchived( $id )) {
			return Response::json([ 'status' => 'success' ]);
			// return redirect('/messages');
		}
		return Response::json([ 'status' => 'failed', 'message' => 'Error was occured!' ]);
	}

	public function deleteAudio(MessageAudioRequest $request){
		$file = $request->get('name');
		File::delete("uploads/audio/".$file);
	}

	public function deleteVideo(MessageVideoRequest $request){
		$file = $request->get('name');
		File::delete("uploads/video/".$file);
	}

	public function uploadAudioFile(MessageAudioRequest $request, MessageServiceInterface $messageService){
		return $messageService->saveAudioFile($request->file('file'));
	}

	public function uploadVideoFile(MessageVideoRequest $request, MessageServiceInterface $messageService){
		return $messageService->saveVideoFile( $request->all() );
	}

	public function deleteIncompleteMessages( MessageServiceInterface $messageService ){
		return $messageService->deleteIncompleteMessages();
	}

	public function getUnreadMessagesCount( MessageServiceInterface $messageService ){
		return Response::json([ 'count' => $messageService->getUnreadMessagesCount() ]);
		// return $messageService->getUnreadMessagesCount();
	}

	public function exportCSV( Excel $excel , MessageServiceInterface $messageService , WidgetServiceInterface $widgetService , CampaignServiceInterface $campaignService )
	{
		
		$messagesForExport = array();
		
		$messages = $messageService->getAllMessagesForExport();
		$messages = $messages->toArray();
		
		foreach ( $messages as $message ) {
			unset($message['id']);
			unset($message['user_id']);
			unset($message['is_complete']);
			unset($message['is_readed']);
			unset($message['file_name']);
			unset($message['created_at']);
			unset($message['updated_at']);
			unset($message['url']);
			unset($message['user_ip']);
			unset($message['consent']);
			unset($message['duration']);
			unset($message['file_type']);
			
			if( null !== $widgetService->getWidgetByID( $message['widget_id'] )){
				$message['widget_id'] = $widgetService->getWidgetByID( $message['widget_id'] )->widget_name;
			}
			if( null !== $campaignService->getCampaignByID( $message['campaign_id'] )) {
				$message['campaign_id'] = $campaignService->getCampaignByID( $message['campaign_id'] )->name;
			}
			if( $message['widget_id'] !== '0' && $message['campaign_id'] !== '0'  ){
			    array_push($messagesForExport, $message);	
			}
		}
		
		$excel->create('Messages', function($excel) use($messagesForExport) {

		        $excel->sheet('Excel sheet', function($sheet) use($messagesForExport) {

		            $sheet->loadView('messages.exportTable' , [ 'messages' => $messagesForExport ]);

		        });

		    })->export('csv');

	}

}