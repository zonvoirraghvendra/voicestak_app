<?php namespace App\Http\Controllers;

use App\User;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\CampaignServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Contracts\MessageServiceInterface;
use App\Contracts\WidgetClicksServiceInterface;
use App\Contracts\YoutubeServiceInterface;
use App\Services\EmailServicesService;
use App\Services\SmsServicesService;
use App\Http\Requests\WidgetAppearanceRequest;
use App\Http\Requests\WidgetEmbedRequest;
use App\Http\Requests\WidgetImageDeleteRequest;
use App\Http\Requests\WidgetIntegrationRequest;
use App\Http\Requests\WidgetPreviewRequest;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use File;
use Sinergi\BrowserDetector\Os;

class WidgetsController extends Controller {

	public function __construct( Guard $auth, User $user )
	{
		$this->auth = $auth;
		$this->user = $user;
		$this->middleware('auth' , [ 'except' => [ 'getSideWidgetPreview' , 'getFooterWidgetPreview' , 'getPopupWidgetPreview' , 'getPopupWidgetPreviewForEmbed' , 'getSideWidgetPreviewForEmbed' , 'getFooterWidgetPreviewForEmbed' , 'addClick' , 'getCustomButtonPreviewForEmbed' ] ]);
	}


	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index( WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService, YoutubeServiceInterface $youtubeService )
	{
		$user_id = \Auth::id();
		if(count($youtubeService->isConnected($user_id))){
			$youtube_connected = true;
		} else {
			$youtube_connected = false;
		}
		return view('widgets.index' , [ 'widgets' => $widgetService->getWidgetsList(), 'campaigns' => $campaignService->getAllCampaigns(), 'youtube_connected' => $youtube_connected ]);
	}

	public function getWidgetsByCampaign( WidgetServiceInterface $widgetService, WidgetPreviewRequest $request, CampaignServiceInterface $campaignService )
	{ 	
		if( $request->get('type') == 'grid' ) {
			if( $request->get('campaign_id') == 0 ){
				return view('widgets.parts.grid',['widgets' => $widgetService->getWidgetsList()]);	
			}
			view()->share('campaign_id', $request->get('campaign_id'));
			return view('widgets.parts.grid',['widgets' => $widgetService->getWidgetsByCampaignID($request->get('campaign_id'))]);	
		}else if( $request->get('type') == 'list' ){
			if( $request->get('campaign_id') == 0 ){
				return view('widgets.parts.list',['widgets' => $widgetService->getWidgetsList()]);	
			}
			view()->share('campaign_id', $request->get('campaign_id'));
			return view('widgets.parts.list',['widgets' => $widgetService->getWidgetsByCampaignID($request->get('campaign_id'))]);
		} else {
			return $widgetService->getWidgetsByCampaignID($request->get('campaign_id'));
		}
	}

	/**
	 * Remove image from storage.
	 *
	 * @return Response
	 */
	public function imageDelete( WidgetImageDeleteRequest $request , WidgetServiceInterface $widgetService)
	{
		$image_path = $request->get('imageDelete');
		$campaign_id = $request->get('campaign_id');
		$widget_id = $request->get('widget_id');
		$widgetService->deleteImage( $widget_id, $image_path );
		return redirect('/widgets/'.$campaign_id.'/wizard-appearance/'.$widget_id);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id, WidgetServiceInterface $widgetService, MessageServiceInterface $messageService)
	{
		if($messageService->getAllMessagesByWidgetID($id)){
			if($messageService->destroyWidgetMessages($id) && $widgetService->destroyWidget($id)) {
				return redirect()->back();
			}
		}
		if($widgetService->destroyWidget($id)) {
			return redirect()->back();
		}
	}

	/**
	 * Preview the specified resource.
	 *
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getSideWidgetPreview( $widget_id , WidgetPreviewRequest $request )
	{
		return view('widgets.side' , [ 'widget_id' => $widget_id , 'widget' => json_decode( $request->get('widget') ) ]);
	}

	/**
	 * Preview the specified resource for embed code.
	 *
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getSideWidgetPreviewForEmbed( $token , WidgetServiceInterface $widgetService )
	{
		return view('widgets.side' , [ 'widget' => $widgetService->getWidgetByToken( $token ) ]);
	}

	/**
	 * Preview the specified resource.
	 *
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getFooterWidgetPreview( $widget_id , WidgetPreviewRequest $request )
	{
		return view('widgets.footer' , [ 'widget_id' => $widget_id , 'widget' => json_decode( $request->get('widget') ) ]);
	}

	/**
	 * Preview the specified resource for embed code.
	 *
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getFooterWidgetPreviewForEmbed( $token , WidgetServiceInterface $widgetService )
	{
		return view('widgets.footer' , [ 'widget' => $widgetService->getWidgetByToken( $token ) ]);
	}

	/**
	 * Preview the specified resource.
	 *
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getCustomButtonPreviewForEmbed( $token , WidgetServiceInterface $widgetService )
	{
		return view('widgets.custom_button' , [ 'widget' => $widgetService->getWidgetByToken( $token ) ]);
	}

	/**
	 * Preview the specified resource.
	 *
	 * @param  int  $widget_id
	 * @return Response
	 */

	public function getPopupWidgetPreview( $widget_design, $widget_design_step, WidgetServiceInterface $widgetService, WidgetPreviewRequest $request )
	{
		//dd($request->get('widget'));
		$data = [
			'widget_design' => $widget_design,
			'widget_design_step' => $widget_design_step,
			'widget' => json_decode( $request->get('widget') ),
			'ios' => false,
		];
		return view('widgets.popup' , $data);
	}

	/**
	 * Preview the specified resource for embed code.
	 *
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getPopupWidgetPreviewForEmbed( $token , WidgetServiceInterface $widgetService )
	{
//		dd(\Request::get('saveraw'));

		$saveRaw = false;
		if (\Request::has('saveraw')) {
			$saveRaw = \Request::get('saveraw') == 'true' ? 'true' : 'false';
		}

		if (!$widget = $widgetService->getWidgetByToken( $token )) 
			return response()->json(['message' => 'Widget not found.'], 404);

		$os = new Os();
		$ios = $os->getName() === Os::IOS;

		$widgetcustoms = $widgetService->getWidgetCustomisationByWidgetID($widget->id);
		if(isset($widgetcustoms) && !empty($widgetcustoms)){
			foreach($this->formatWidgetCustomsToArray($widgetcustoms) as $key => $value){
				$widget->setAttribute($key,$value);
			}
		}

		$data = [
			'widget' => $widget,
			'widget_design_step' => 1,
			'widget_design' => $widget->widget_design,
			'is_premium' => $this->user->where('id', $widget->user_id)->first()->is_premium,
			'saveraw' => $saveRaw,
			'ios' => $ios,
		];
		return view('widgets.popup', $data);
	}

	/**
	 * Display a appearance of the resource.
	 *
	 * @param  int  $campaign_id
	 * @return Response
	 */
	public function getCreate( $campaign_id , CampaignServiceInterface $campaignService )
	{
		$campaignService->id = $campaign_id;
		return view('campaigns.wizard.appearance', [ 'campaign' => $campaignService ]);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getEditWithWidget( $campaign_id , $widget_id , WidgetServiceInterface $widgetService , CampaignServiceInterface $campaignService )
	{
		$campaignService->id = $campaign_id;
		return view('campaigns.wizard.details',[ 'campaign' => $campaignService ,  'widget' => $widgetService->getgetWidgetByIDExerptRowHtmlCode( $widget_id ) ]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Redirect
	 */
	public function putUpdateWithWidget( $campaign_id , $widget_id , CampaignServiceInterface $campaignService , CampaignRequest $request )
	{
		//update campaign
		return redirect('/campaigns/'.$campaign_id.'/wizard-appearance/'.$widget_id);
	}

	/**
	 * Display a appearance of the resource.
	 *
	 * @param  int  $campaign_id
	 * @return Response
	 */
	public function getWizardAppearance( $campaign_id , $widget_id , CampaignServiceInterface $campaignService , WidgetServiceInterface $widgetService )
	{
		$user = $this->user->where('id', $this->auth->id())->first();
		$parent = $this->user->where('id', $user->parent_id)->first();
		return view('campaigns.wizard.appearance',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'widget' => $widgetService->getgetWidgetByIDExerptRowHtmlCode($widget_id), 'user' => $user, 'parent' => $parent ]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @return Redirect
	 */
	public function postWizardAppearance( $campaign_id , $widget_id , WidgetServiceInterface $widgetService , WidgetAppearanceRequest $request )
	{
		if( null != $widget = $widgetService->updateWidget( $widget_id, $request->all()) ) {
			return redirect('/campaigns/'.$campaign_id.'/wizard-integration/'.$widget_id);
		}
	}

	/**
	 * Display a appearance of the resource.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getWizardWidgetAppearance( $campaign_id , $widget_id , WidgetServiceInterface $widgetService , CampaignServiceInterface $campaignService )
	{
		$user = $this->user->where('id', $this->auth->id())->first();
		$parent = $this->user->where('id', $user->parent_id)->first();
		return view('campaigns.wizard.appearance',[ 'widget' => $widgetService->getgetWidgetByIDExerptRowHtmlCode( $widget_id ) , 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'user' => $user, 'parent' => $parent ]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Redirect
	 */
	public function postWizardWidgetAppearance( $campaign_id , $widget_id , WidgetServiceInterface $widgetService , WidgetAppearanceRequest $request )
	{
		//update widget
		if($this->auth->user()->is_premium && isset($request['remove_powered_by']) && isset($request['image'])){
			$widgetService->addRemovePoweredBy($widget_id, true, $request->all());
		} else {
			$widgetService->addRemovePoweredBy($widget_id, false, $request->all());
		}
		if($request->get('image_path'))
			File::delete($widgetService->getWidgetByID($widget_id)->image);
		if($widgetService->updateWidget($widget_id, $request->all())) {
			return redirect('/widgets/'.$campaign_id.'/wizard-integration/'.$widget_id);
		}
	}

	public function getEmailServiceList( Request $request, WidgetServiceInterface $widgetService )
	{
		$serviceName = $request->get('serviceName');
		$list = $widgetService->getEmailServiceList( $serviceName );

		return $list;
	}

	/**
	 * Display a integration form of the resource.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getWizardIntegration( $campaign_id , $widget_id , CampaignServiceInterface $campaignService , WidgetServiceInterface $widgetService, EmailServicesService $emailService, SmsServicesService $smsService )
	{
		$email_provider = $widgetService->getWidgetByID($widget_id)->email_provider;
		if($email_provider !== "")
			$email_provider_values = $widgetService->getEmailServiceList( $email_provider );
		$emailServices = $emailService->getAllEmailServices();
		$smsServices = $smsService->getAllSmsServices();
		$emailServicesArray = [];
		$smsServicesArray = [];
		foreach($emailServices as $emailService) {
			$emailServicesArray[$emailService['service']] = $emailService['service'];
		}
		foreach($smsServices as $smsService) {
			$smsServicesArray[$smsService['service']] = $smsService['service'];
		}
		$widget = $widgetService->getWidgetByID( $widget_id );
		$widget_rowhtml = json_decode(urldecode($widget->raw_html_code)); 
		$widget->raw_html_code = null;
		if(old('email_provider'))
			return view('campaigns.wizard.integration',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'widget' => $widget , 'emailServices' => $emailServicesArray, 'smsServices' => $smsServicesArray, 'widget_rowhtml' => $widget_rowhtml, 'email_provider_values' => $widgetService->getEmailServiceList( old('email_provider') ) ]);
		if(isset($email_provider_values))
			return view('campaigns.wizard.integration',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'widget' => $widget , 'emailServices' => $emailServicesArray, 'smsServices' => $smsServicesArray, 'email_provider_values' => $email_provider_values, 'widget_rowhtml' => $widget_rowhtml ]);
		return view('campaigns.wizard.integration',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'widget' => $widget , 'emailServices' => $emailServicesArray, 'smsServices' => $smsServicesArray, 'widget_rowhtml' => $widget_rowhtml ]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Redirect
	 */
	public function postWizardIntegration( $campaign_id , $widget_id , WidgetServiceInterface $widgetService , WidgetIntegrationRequest $request )
	{
		if($widgetService->updateWidget($widget_id, $request->all() )  ) {
			$widgetService->createwidgetemailservice($widget_id);
			return redirect('/widgets/'.$campaign_id.'/wizard-embed/'.$widget_id);
		}
	}

	/**
	 * Display a embed code of the resource.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function getWizardEmbed( $campaign_id , $widget_id , CampaignServiceInterface $campaignService , WidgetServiceInterface $widgetService )
	{
		return view('campaigns.wizard.embed',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ) , 'widget' => $widgetService->getgetWidgetByIDExerptRowHtmlCode( $widget_id ) ]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function postWizardEmbed( $campaign_id , $widget_id , WidgetServiceInterface $widgetService , WidgetEmbedRequest $request)
	{
		//update widget

		if($widgetService->updateWidgetEnbedCode($widget_id, $campaign_id, $request->all())) {
			return redirect('/widgets')->withSuccess('Widget has been successfully created.');
		} else {
			return redirect('/widgets')->withError('Widget has not been created.');
		}

	}

	public function addClick( Request $request , WidgetServiceInterface $widgetService, WidgetClicksServiceInterface $widgetClicksService )
	{
		$user_id = $widgetService->getWidgetByToken($request->get('widget_token'))->user_id;

		
		return $widgetClicksService->addWidgetClick( $request->get('widget_token') );	
	}

	private function formatWidgetCustomsToArray($widgetCustoms){
		$numerals = ['one','two','three','four','five','six','seven','eight','nine'];
		$regenerated_arr = array();
		foreach ($numerals as $value) {
			$template = json_decode($widgetCustoms->{'template_'.$value},true);
			foreach($template as $key=>$temp){
				$regenerated_arr[$key]=$temp;
			}	
		}
		$regenerated_arr['widget_video_headline'] = $widgetCustoms->widget_video_headline;
		$regenerated_arr['widget_voice_headline'] = $widgetCustoms->widget_voice_headline;
		$regenerated_arr['ty_msg'] = $widgetCustoms->ty_msg;
		return $regenerated_arr;
	}

}