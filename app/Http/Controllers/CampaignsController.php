<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\CampaignServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Contracts\MessageServiceInterface;
use App\Services\EmailServicesService;
use App\Services\SmsServicesService;
use App\Http\Requests\WidgetAppearanceRequest;
use App\Http\Requests\WidgetEmbedRequest;
use App\Http\Requests\WidgetIntegrationRequest;
use App\Http\Requests\WidgetImageDeleteRequest;
use App\Http\Requests\CampaignRequest;
use App\Http\Requests\CampaignEditRequest;
use App\Http\Requests\SingleCampaignRequest;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use App\User;
use File;

class CampaignsController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth, User $user )
	{
		$this->auth = $auth;
		$this->user = $user;
		$this->middleware('auth');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index( SingleCampaignRequest $request, CampaignServiceInterface $campaignService, WidgetServiceInterface $widgetService)
	{
		$campaign_id = $request->get('campaign_id');
		if($campaign_id === '0')
			return redirect('/campaigns');
		return view('campaigns.index', $campaignService->collection($campaign_id));
	}

	public function getCampaign( $id, SingleCampaignRequest $request, CampaignServiceInterface $campaignService, WidgetServiceInterface $widgetService )
	{


		if($id === '0')
			return redirect('/widgets');
		
		return view("campaigns.index", $campaignService->collection($id));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create( CampaignServiceInterface $campaignService )
	{
		return view('campaigns.wizard.details' ,[ 'campaigns' => $campaignService->getCampaignsList() ]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Redirect
	 */
	public function store( CampaignServiceInterface $campaignService , CampaignRequest $request , WidgetServiceInterface $widgetService )
	{
		if( $request->get('campaign_id') != '' && null != $widget = $widgetService->createWidget( $request->all() ) ){
			return redirect('/campaigns/'.$request->get('campaign_id').'/wizard-appearance/'.$widget->id);
		}
		else if( ( $request->get('campaign_id') == '' ) && ( null != $campaign = $campaignService->createCampaign( $request->all() ) ) ){
			if ( null != $widget = $widgetService->createWidget( array_merge( $request->all() ,  ['campaign_id' => $campaign->id ] ) ) ) {
				return redirect('/campaigns/'.$campaign->id.'/wizard-appearance/'.$widget->id);
			}
		}
		return redirect()->back();
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $campaign_id
	 * @return Response
	 */
	public function show( $campaign_id , CampaignServiceInterface $campaignService )
	{
		//dd('show');
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $campaign_id
	 * @return Response
	 */
	public function edit( $campaign_id , CampaignServiceInterface $campaignService )
	{
		return view('campaigns.wizard.details',[ 'campaigns' => $campaignService->getCampaignsList() ]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @return Redirect
	 */
	public function update( $campaign_id , CampaignServiceInterface $campaignService , CampaignRequest $request )
	{
		//update campaign
		if( null != $campaignService->updateCampaign( $request->inputs( $campaign_id )) ) {
			return redirect('/campaigns/'.$campaign_id);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $campaign_id
	 * @return Redirect
	 */
	public function destroy( $campaign_id , CampaignServiceInterface $campaignService, WidgetServiceInterface $widgetService, MessageServiceInterface $messageService )
	{
		if($messageService->getAllMessagesByCampaignID($campaign_id)){
			if($messageService->destroyCampaignMessages($campaign_id)) {
				if($widgetService->getWidgetsByCampaignID($campaign_id)){
					if($widgetService->destroyCapmaignWidgets($campaign_id) && $campaignService->destroyCampaign($campaign_id)) {
						return redirect('/widgets');
					}	
				}
			}	
		}
		if($widgetService->getWidgetsByCampaignID($campaign_id)){
			if($widgetService->destroyCapmaignWidgets($campaign_id) && $campaignService->destroyCampaign($campaign_id)) {
				return redirect('/widgets');
			}	
		}
		if($campaignService->destroyCampaign($campaign_id)) {
			return redirect('/widgets');
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
		return redirect('/campaigns/'.$campaign_id.'/wizard-appearance/'.$widget_id);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $campaign_id
	 * @return Response
	 */
	public function editCampaign( $campaign_id , CampaignServiceInterface $campaignService )
	{
		return view('campaigns.editCampaign',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ) ]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @return Redirect
	 */
	public function updateCampaign( $campaign_id , CampaignServiceInterface $campaignService , CampaignEditRequest $request )
	{
		//update campaign
		if( null != $campaignService->updateCampaign( $campaign_id, $request->all()) ) {
			return redirect('/campaigns/'.$campaign_id);
		}
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
		return view('campaigns.wizard.details',['widget' => $widgetService->getWidgetByID( $widget_id ), 'campaigns' => $campaignService->getCampaignsList() ]);
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
		if( null != $widget = $widgetService->updateWidget( $request->request->all() )) {
			return redirect('/campaigns/'.$campaign_id.'/wizard-appearance/'.$widget->id);
		}
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
		return view('campaigns.wizard.appearance',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'widget' => $widgetService->getWidgetByID($widget_id), 'user' => $user, 'parent' => $parent ]);
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
		$widget = $widgetService->getWidgetByID( $widget_id );
		$widgetcustoms = $widgetService->getWidgetCustomisationByWidgetID($widget_id);
		if(isset($widgetcustoms) && !empty($widgetcustoms)){
			foreach($this->formatWidgetCustomsToArray($widgetcustoms) as $key => $value){
				$widget->setAttribute($key,$value);
			}
		}
		return view('campaigns.wizard.appearance',[ 'widget' => $widget , 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'user' => $user, 'parent' => $parent ]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Redirect
	 */
	public function postWizardWidgetAppearance( $campaign_id , $widget_id, WidgetServiceInterface $widgetService , WidgetAppearanceRequest $request )
	{
		if($request->get('image_path'))
			File::delete($widgetService->getWidgetByID($widget_id)->image);
		if($widgetService->updateWidget($widget_id,$request->all())) {
			return redirect('/campaigns/'.$campaign_id.'/wizard-integration/'.$widget_id);
		}
	}

	public function getEmailServiceList( WidgetIntegrationRequest $request, WidgetServiceInterface $widgetService )
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
		$widgetcustoms = $widgetService->getWidgetCustomisationByWidgetID($widget_id);
		if(isset($widgetcustoms) && !empty($widgetcustoms)){
			foreach($this->formatWidgetCustomsToArray($widgetcustoms) as $key => $value){
				$widget->setAttribute($key,$value);
			}
		}
		if(!empty($widget->raw_html_code)){
			$widget_rowhtml = json_decode(urldecode($widget->raw_html_code));
		}else{
			$widget_rowhtml = null;
		}
		$widget->raw_html_code = null;
		if(old('email_provider'))
			return view('campaigns.wizard.integration',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'widget' => $widget, 'emailServices' => $emailServicesArray, 'smsServices' => $smsServicesArray, 'widget_rowhtml' => $widget_rowhtml, 'email_provider_values' => $widgetService->getEmailServiceList( old('email_provider') ) ]);
		if(isset($email_provider_values))
			return view('campaigns.wizard.integration',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'widget' => $widget, 'emailServices' => $emailServicesArray, 'smsServices' => $smsServicesArray, 'email_provider_values' => $email_provider_values, 'widget_rowhtml' => $widget_rowhtml ]);
		return view('campaigns.wizard.integration',[ 'campaign' => $campaignService->getCampaignByID( $campaign_id ), 'widget' => $widget, 'emailServices' => $emailServicesArray, 'smsServices' => $smsServicesArray, 'widget_rowhtml' => $widget_rowhtml ]);
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
		//update widget
		if($widgetService->updateWidget($widget_id,$request->all())) {
			return redirect('/campaigns/'.$campaign_id.'/wizard-embed/'.$widget_id);
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
		$widget = $widgetService->getgetWidgetByIDExerptRowHtmlCode( $widget_id );
		$widgetcustoms = $widgetService->getWidgetCustomisationByWidgetID($widget_id);
		if(isset($widgetcustoms) && !empty($widgetcustoms)){
		foreach($this->formatWidgetCustomsToArray($widgetcustoms) as $key => $value){
			$widget->setAttribute($key,$value);
		}
	}
		return view('campaigns.wizard.embed',['campaign' => $campaignService->getCampaignByID( $campaign_id )  , 'widget' => $widget]);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $campaign_id
	 * @param  int  $widget_id
	 * @return Response
	 */
	public function postWizardEmbed( $campaign_id , $widget_id , CampaignServiceInterface $campaignService , WidgetEmbedRequest $request)
	{
		//update widget
		return redirect('/campaigns')->withSuccess('Campaign has been successfully created.');
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
	public function changeTabType(Request $request,WidgetServiceInterface $widgetService)
	{
		if($request->data['tab_type']=='voice'){
			$widget = $widgetService->getWidgetByID($request->data['widget_id']);
			return view('widgets.templates.tabs.ajax_load.tab_design_voice',['tab_type' => $request->data['tab_type']  , 'widget' => $widget]);
		}elseif ($request->data['tab_type']=='video') {
			$widget = $widgetService->getWidgetByID($request->data['widget_id']);
			return view('widgets.templates.tabs.ajax_load.tab_design_video',['tab_type' => $request->data['tab_type']  , 'widget' => $widget]);
		}else{
			$widget = $widgetService->getWidgetByID($request->data['widget_id']);
			return view('widgets.templates.tabs.ajax_load.tab_design_both',['tab_type' => $request->data['tab_type']  , 'widget' => $widget]);
		}
	}
}
