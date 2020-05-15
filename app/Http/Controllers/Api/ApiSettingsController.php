<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
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
use Illuminate\Contracts\Auth\Guard;
use Lib\Youtube\MyYoutube;
use SMS, Log;
use Illuminate\Http\Request;
use Exception;
class ApiSettingsController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , MyYoutube $myYoutube , WidgetStatServiceInterface $widgetStatService, MessageServiceInterface $messageService, MessageRequest $request, WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService, YoutubeServiceInterface $youtubeService , WidgetFeedbackServiceInterface $widget_feedback_service , WidgetOptinServiceInterface $widget_optin_service , Message $message)
	{
		$this->auth = $auth;
		$this->widgetStatService = $widgetStatService;
		$this->messageService = $messageService;
		$this->widgetService = $widgetService;
		$this->campaignService = $campaignService;
		$this->youtubeService = $youtubeService;
		$this->request = $request;
		$this->message = $message;
		$this->widget_feedback_service = $widget_feedback_service;
		$this->widget_optin_service = $widget_optin_service;

		$this->middleware('auth', ['except' => ['createSubscriber', 'updateMessage','createSubscriberRow']]);
		if( $myYoutube->getLatestAccessTokenFromDB()){
			view()->share('youtube_connect', true);
		}
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index( EmailServicesServiceInterface $emailService, SmsServicesServiceInterface $smsService, CampaignServiceInterface $campaignService )
	{
		return Response::json([ 'emailSettings' => $emailService->getAllEmailServices(), 'smsSettings' => $smsService->getAllSmsServices(), 'campaigns' => $campaignService->getAllCampaigns() ]);
		// return view('settings.index' , [ 'emailSettings' => $emailService->getAllEmailServices(), 'smsSettings' => $smsService->getAllSmsServices(), 'campaigns' => $campaignService->getAllCampaigns() ]);
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
	 * Store a newly getResponse connection created resource in storage.
	 *
	 * @return Response
	 */

	public function getResponseApiConnect( GetResponseApiConnectRequest $request , GetResponseService $getResponseService )
	{
		$response = $getResponseService->connect( $request->all() );
		return Response::json(['status' => $response['status'], 'message' => $response['message']]);
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
	}

	public function connectIcontactApi( IcontactApiConnectRequest $request , IcontactService $icontactservice )
	{
		$response = $icontactservice->connect( $request->all() );
		return Response::json(['status' => $response['status'], 'message' => $response['message']]);
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
	}

	public function getResponseList( GetResponseService $getResponseService )
	{
		return  $getResponseService->getList();
	}

	public function aweberList( AWeberService $aweberService )
	{
		return $aweberService->getList();
	}

	public function activeCampaignList( ActiveCampaignService $activeCampaignService )
	{
		return $activeCampaignService->getList();
	}

	public function constantContactList( ConstantContactService $constantContactService )
	{
		return $constantContactService->getList();
	}

	public function icontactList( IcontactService $icontactService )
	{
		return $icontactService->getList();
	}

	public function interspireList( InterspireService $interspireService )
	{
		return $interspireService->getList();
	}

	public function mailChimpList( MailChimpService $mailChimpService )
	{
		
		return $mailChimpService->getList();
	}

	public function sendReachList( SendReachService $sendReachService )
	{
		
		return $sendReachService->getList();
	}

	public function infusionList( InfusionSoftService $infusionService )
	{
		
		return $infusionService->getList();
	}

	/**
	 * Connected to interspire api.
	 *
	 * @return Response
	 */
	public function connectInterspireApi( InterspireApiConnectRequest $request , InterspireService $interspireService )
    {
     	$response = $interspireService->connect( $request->all() );
     	//dd($response);
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connected to mailChimp api.
	 *
	 * @return Response
	 */
	public function connectMailChimpApi( MailChimpApiConnectRequest $request , MailChimpService $mailChimpService )
    {
     	$response = $mailChimpService->connect( $request->all() );
     	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
    	
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connected to sendreach api.
	 *
	 * @return Response
	 */
	public function connectSendReachApi( SendReachApiConnectRequest $request , SendReachService $sendReachService )
    {
    	//dd('s');
     	$response = $sendReachService->connect( $request->all() );
     	
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connected to InfusionSoft api.
	 *
	 * @return Response
	 */
	public function connectInfusionSoftApi( InfusionSoftApiConnectRequest $request , InfusionSoftService $infusionSoftService )
    {
     	$response = $infusionSoftService->connect( $request->all() );
     	if($response['status'] == 'notauthorized'){
     		return Response::json(['status' => $response['status'], 'message' => $response['message']]);
     		// return redirect($response['message']);
     	}
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

     /**
	 * Callback function from InfusionSoft api.
	 *
	 * @return Response
	 */
    public function infusionRedirectUrl(Request $request, InfusionSoftService $infusionSoftService )
    {
    	Log::info( $request->all() );
    	$response = $infusionSoftService->callback( $request->all() );
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
    	// return redirect('/settings')->withInput()->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connected to active campaign api.
	 *
	 * @return Response
	 */
	public function connectActiveCampaignApi( ActiveCampaignApiConnectRequest $request , ActiveCampaignService $activeCampaignService )
    {
    	//dd('s');
     	$response = $activeCampaignService->connect( $request->all() );
     	
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connected to ontraport api.
	 *
	 * @return Response
	 */
	public function connectOntraportApi( OntraportApiConnectRequest $request , OntraportService $ontraportService )
    {
    	//dd('s');
     	$response = $ontraportService->connect( $request->all() );
     	
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connected to constant contact api.
	 *
	 * @return Response
	 */
	public function connectConstantContactApi( ConstantContactApiConnectRequest $request , ConstantContactService $constantContactService )
    {
    	//dd('s');
    	
     	$response = $constantContactService->connect( $request->all() );
     	
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
		// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

	/**
	 * Connected to aweber api.
	 *
	 * @return Response
	 */
	public function connectAweberApi( AweberApiConnectRequest $request , AweberService $aweberService )
    {
     	$connect = $aweberService->connect( $request->all());
     	if(gettype($connect) == "array"){
	    	if( $connect['status'] === 'warning' ){
	    		return Response::json(['status' => $response['status'], 'message' => $response['message']]);
				// return redirect()->back()->withInput()->with( $connect['status'] , $connect['message'] );
	    	}
	    }
	    return Response::json(['authorize_url' => $connect]);
    	// return $connect;
    }

    /**
	 * Connected to CallFire api.
	 *
	 * @return Response
	 */
    public function connectCallFireApi( CallFireApiConnectRequest $request, CallFireService $callFireService )
    {
    	
    	//dd(\Config::get('sms.callfire'));
    	
    	// 'app_login' => 'keith@ampedpublishing.com',
     	// 	'app_password' => 'voicestak'
     	
    	$response = $callFireService->connect( $request->all() );
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
    	// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connected to CallRail api.
	 *
	 * @return Response
	 */
    public function connectCallRailApi( CallRailApiConnectRequest $request, CallRailService $callRailService )
    {
    	$response = $callRailService->connect( $request->all() );
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
    	// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connected to Twilio api.
	 *
	 * @return Response
	 */
    public function connectTwilioApi( TwilioApiConnectRequest $request, TwilioService $twilioService )
    {
    	$response = $twilioService->connect( $request->all() );
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
    	// return redirect()->back()->withInput()->with( $response['status'] , $response['message'] );
    }
	
	/**
	 * Store a newly aweber connection created resource in storage.
	 *
	 * @return Response
	 */
    public function connectAweberApiCallback( AWeberApiConnectCallbackRequest $request , AweberService $aweberService )
    {
    	$response = $aweberService->connectCallback( $request->all() );
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
    	// return redirect('/settings')->with( $response['status'] , $response['message'] );
    }

    /**
	 * Connect Campaign Monitor.
	 *
	 * @return Response
	 */
    public function connectCampaignMonitorApi( CampaignMonitorApiConnectRequest $request , CampaignMonitorService $campaignMonitorService )
    {
    	$response = $campaignMonitorService->connect( $request->all() );
    	return Response::json(['status' => $response['status'], 'message' => $response['message']]);
    	// return redirect('/settings')->with( $response['status'] , $response['message'] );
    }


	/**
	 * Remove the specified email resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function emailApiDisconnect( $id , EmailServicesServiceInterface $emailService )
	{
		if ( $emailService->destroyEmailService( $id ) ) {
			return Response::json(['status' => 'success', 'message' => 'Email Service successfully disconnected.']);
			// return redirect()->back()->with( 'success' , 'Email Service successfully disconnected.' );
		}
	}

	/**
	 * Remove the specified sms resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function smsApiDisconnect( $id , SmsServicesServiceInterface $smsService )
	{
		if ( $smsService->destroySmsService( $id ) ) {
			return Response::json(['status' => 'success', 'message' => 'Sms Service successfully disconnected.']);
			// return redirect()->back()->with( 'success' , 'Sms Service successfully disconnected.' );
		}
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
			if($mailChimpService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);	
			}
			return Response::json(['provider' => 'MailChimp', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'MailChimp', 'show' => 1]);
		}elseif( $email_provider == 'GetResponse' ){
			if($getResponseService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'GetResponse', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'GetResponse', 'show' => 1]);
		}elseif( $email_provider == 'Aweber' ){
			if($aweberService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'Aweber', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'Aweber', 'show' => 1]);
		}elseif( $email_provider == 'Icontact' ){
			if($icontactService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'Icontact', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'Icontact', 'show' => 1]);
		}elseif($email_provider == 'Interspire'){
			if($interspireService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'Interspire', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'Interspire', 'show' => 1]);
		}elseif($email_provider == 'ActiveCampaign'){
			if($activeCampaignService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'ActiveCampaign', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'ActiveCampaign', 'show' => 1]);
		}elseif($email_provider == 'ConstantContact'){
			if($constantContactService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'ConstantContact', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'ConstantContact', 'show' => 1]);
		}elseif($email_provider == 'CampaignMonitor'){
			if($campaignMonitorService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'CampaignMonitor', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'CampaignMonitor', 'show' => 1]);
		}elseif($email_provider == 'Ontraport'){
			if($ontraportService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'Ontraport', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'Ontraport', 'show' => 1]);
		}elseif($email_provider == 'SendReach'){
			if($sendReachService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'SendReach', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'SendReach', 'show' => 1]);
		}elseif($email_provider == 'InfusionSoft'){
			if($infusionService->add_contact($user_id, $email_provider_value, $request->all())){
				return Response::json(['show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
			return Response::json(['provider' => 'InfusionSoft', 'show' => 1]);
			// return view('widgets.templates.popups.design1.step13', ['provider' => 'InfusionSoft', 'show' => 1]);
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
		// dd( $this->request->inputs($campaign_id, $widget_id, $user_id) );
		
		$name = isset( $inputs['name'] ) ? $inputs['name'] : null;

		if(null != $message = $this->messageService->updateMessages( $inputs['id'], $this->request->inputs($campaign_id, $widget_id, $user_id , $name , $inputs['email']) )) {


			if(count($this->youtubeService->isConnected($user_id))){
				$exists = $this->youtubeService->exists(1);
				if($inputs['file_type'] == 'video'){
				// 	$fileName = $youtubeService->makeVideoFromAudio($messageService->getMessageById($id)->file_name);
				// 	try {
				// 		$youtube_id = $youtubeService->uploadVideoToYoutube($fileName);
				// 	} catch(Exception $e) {
				// 		return "<h1><center style='margin-top: 50%'>Something went wrong please try again!!!</center></h1>";
				// 	}
				// } else {
					try {
						$youtube_id = $this->youtubeService->uploadVideoToYoutube($this->messageService->getMessageById($inputs['id'])->file_name);
						$youtube_url = '//youtu.be/'.$youtube_id;
						$type = 'video';
						$url = $youtube_url;
						$message = $this->messageService->getMessageById($inputs['id']);
						$message->youtube_url = $youtube_url;
						$message->save();
						// $this->messageService->updateMessages( $inputs['id'], ['youtube_url' => $youtube_url]);
					} catch(Exception $e) {
						return Response::json([ 'status' => 'failed', 'message' => $e->getMessage()]);
						// return "<h1><center style='margin-top: 50%'>Something went wrong please try again!!!</center></h1>";
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
					// $this->messageService->updateMessages( $inputs['id'], ['file_name' => $audio_file]);
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
			return Response::json([ 'show' => 1]);
			// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
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
				return Response::json([ 'show' => 1]);
				// return view('widgets.templates.popups.design1.step12', ['show' => 1]);
			}
		} else { 
			return Response::json([ 'status' => 'failed', 'message' => 'Error was occured!']);
			// return 'something went wrong' ;
		}		
	}

}
