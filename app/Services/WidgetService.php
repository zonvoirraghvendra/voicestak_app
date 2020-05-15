<?php namespace App\Services;

use App\Contracts\WidgetServiceInterface;
use App\Models\Widget;
use App\Models\WidgetCustomisation;
use App\Models\EmailService;
use App\Models\WidgetEmailService;
use Illuminate\Contracts\Auth\Guard;
use App\Services\GetResponseService;
use App\Services\OntraportService;
use App\Services\SendReachService;
use App\Services\ActiveCampaignService;
use App\Services\AWeberService;
use App\Services\ConstantContactService;
use App\Services\IcontactService;
use App\Services\InterspireService;
use App\Services\MailChimpService;
use App\Services\CampaignMonitorService;
use App\Services\InfusionSoftService;
use Illuminate\Support\Facades\DB;

use File;

class WidgetService implements WidgetServiceInterface {

	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth ,
		Widget $widget ,
		EmailService $emailService ,
		WidgetEmailService $widgetemailservice,
		GetResponseService $getResponse,
		ActiveCampaignService $activeCampaign,
		AWeberService $aweber,
		ConstantContactService $constantContact,
		IcontactService $icontact,
		InterspireService $interspire,
		MailChimpService $mailChimp,
		CampaignMonitorService $campaignMonitor,
		InfusionSoftService $infusionSoftService,
		SendReachService $sendReach,
		OntraportService $ontraportService,
		WidgetCustomisation $widgetcustomisation)
	{
		$this->auth   			  	= $auth;
		$this->widget 			  	= $widget;
		$this->emailService 	  	= $emailService;
		$this->widgetemailservice 	= $widgetemailservice;
		$this->getResponse 		  	= $getResponse;
		$this->activeCampaign 	  	= $activeCampaign;
		$this->aweber 			  	= $aweber;
		$this->constantContact 	  	= $constantContact;
		$this->icontact 		  	= $icontact;
		$this->interspire 		  	= $interspire;
		$this->mailChimp 		  	= $mailChimp;
		$this->campaignMonitor 	  	= $campaignMonitor;
		$this->infusionSoftService 	= $infusionSoftService;
		$this->sendReachService 	= $sendReach;
		$this->ontraportService 	= $ontraportService;
		$this->widgetcustomisation  = $widgetcustomisation;
	}

	/**
	 * Get a array of the resource for select input.
	 *
	 * @return array
	 */
	public function getWidgetsList()
	{
		if( $this->auth->user()->role == "user" ){
			$result = $this->auth->user()->campaigns()->lists('id');
			return $this->widget->whereIn('campaign_id', $result )->where('user_id', $this->auth->id())->orderBy( 'created_at' , 'DESC' )->get();
		}else{
			$assigned = $this->auth->user()->assigned_campaigns;
			$assigned = json_decode($assigned);
			return $this->widget->whereIn( 'campaign_id' , $assigned )->orderBy( 'created_at' , 'DESC' )->get() ;
		}
	}

	/**
	 * get email service list
	 *
	 * @param  string  $serviceName
	 * @return list
	 */
	public function getEmailServiceList( $serviceName )
	{
		if($serviceName == "GetResponse"){
			$list = $this->getResponse->getList();
			return $list;
		}
		if($serviceName == "ActiveCampaign"){
			$list = $this->activeCampaign->getList();
			return $list;
		}
		if($serviceName == "Aweber"){
			$list = $this->aweber->getList();
			return $list;
		}
		if($serviceName == "ConstantContact"){
			$list = $this->constantContact->getList();
			return $list;
		}
		if($serviceName == "Icontact"){
			$list = $this->icontact->getList();
			return $list;
		}
		if($serviceName == "Interspire"){
			$list = $this->interspire->getList();
			return $list;
		}
		if($serviceName == "MailChimp"){
			$list = $this->mailChimp->getList();
			return $list;
		}
		if($serviceName == "CampaignMonitor"){
			$list = $this->campaignMonitor->getList();
			return $list;
		}
		if($serviceName == "InfusionSoft"){
			$list = $this->infusionSoftService->getList();
			return $list;
		}
		if($serviceName == "SendReach"){
			$list = $this->sendReachService->getList();
			return $list;
		}
	}

	/**
	 * check is widget completely filled
	 *
	 * @param  int  $id
	 * @return boolean
	 */
	public function isWidgetCompletelyFilled($id)
	{
		$count = 0;
		$widget = $this->widget->find( $id );
		if($widget->name === "" || $widget->type === "" || $widget->tab_design === "") {
			$count++;
		}
		if($count == 0){
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * Adding image in storage
	 *
	 * @param [type] $image [description]
	 */
	public function addImage( $image ) {
		$file = $image;
	    $destinationPath = 'uploads/images'; // upload path
	    $extension = $file->getClientOriginalExtension(); // getting image extension
	    $fileName = str_random(32).'.'.$extension; // renameing image
	    $file->move($destinationPath, $fileName); // uploading file to given path
	    $image_path = $destinationPath . "/" . $fileName;
	    return $image_path;
	}

	/**
	 *
	 * Delete image from storage
	 *
	 * @param [type] $image [description]
	 */
	public function deleteImage( $id , $image ) {
		$widget = $this->getWidgetByID( $id );
		$widget->image = '';
		$widget->save();
		File::delete($image);
	}

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllWidgets()
	{
		return $this->widget->all();
	}

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getWidgetsByCampaignID($id)
	{
		if( $this->auth->user()->role == "user"  ){
			return $this->widget->where('campaign_id', $id)->where('user_id', $this->auth->id())->get();
		}else{
			return $this->widget->where('campaign_id', $id)->get();
		}
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Widget object or NULL
	 */
	public function getWidgetByID( $id )
	{
		if( isset($this->auth->user()->role) && $this->auth->user()->role == "user" ){
			return $this->widget->where('user_id', $this->auth->id())->find( $id );
		}else{
			return $this->widget->find( $id );
		}
	}

	public function getgetWidgetByIDExerptRowHtmlCode( $id )
	{
		if( $this->auth->user()->role == "user" ){
			$widget = $this->widget->where('user_id', $this->auth->id())->find( $id );
		}else{
			$widget = $this->widget->find( $id );
		}
		$widget->raw_html_code = null;
		return $widget;
	}

	/**
	 * Get the specified resource by token.
	 *
	 * @param  string  $token
	 * @return Widget object or NULL
	 */
	public function getWidgetByToken( $token )
	{
		$widget = $this->widget->where( 'token_field' , $token )->first();
		return $widget;
	}

	/**
	 * Manage data for a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return array
	 */
	private function createWidgetInputs( $inputs )
	{
		//var_dump($inputs);
		//md5(microtime())
		$inputs['token_field'] = md5(microtime());
		return $inputs;
	}


	public function getConnectedServices( $id )
	{
		$connectedservices=[];
		$services = $this->widgetemailservice->where('widget_id',$id)->get();
		foreach ($services as $key => $value) {
			$service = $this->emailservice->where('id',$value->email_service_id)->first();
			if($service->service=='GetResponse'){
				array_push($connectedservices, 'GetResponse');
			}
			if($service->service=='Aweber'){
				array_push($connectedservices, 'Aweber');
			}
		}
		return $connectedservices;
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Widget object or NULL
	 */
	public function createWidget( $inputs )
	{
		$inputs['user_id'] = $this->auth->id();
		if($this->auth->user()->is_premium && isset($inputs['remove_powered_by']) && isset($inputs['image'])){
			$widget = $this->widget->create( $this->createWidgetInputs( $inputs ) );
			$widget->remove_powered_by = 1;
			$widget->image = $this->addImage($inputs['image']);
			$widget->save();
			return $widget;
		} else {
			$widget = $this->widget->create( $this->createWidgetInputs( $inputs ) );
			$widget->remove_powered_by = 0;
			$widget->save();
			return $widget;
		}
	}

	/**
	 * Manage data for update the specified resource in storage.
	 *
	 * @param  array  $inputs
	 * @return array
	 */
	private function updateWidgetEmailInputs( $id , $email_id)
	{
		$inputs = ['widget_id' => $id , 'email_service_id' => $email_id];
		return $inputs;
	}
	public function createwidgetemailservice( $id )
	{
		$emailGetresponse = $this->emailService->where('service', 'getResponse')->where('user_id' , $this->auth->id())->first();
		$emailAweber      = $this->emailService->where('service', 'aweber')->where('user_id' , $this->auth->id())->first();
		if(isset($emailGetresponse)){
			$email_id = $emailGetresponse->id;
			if(!$this->widget->find($id)->emailServices()->find($email_id)){
				$this->widget->find($id)->emailServices()->attach($email_id);
			}
		}
		if(isset($emailAweber)){
			$email_id = $emailAweber->id;
			if(!$this->widget->find($id)->emailServices()->find($email_id)){
				$this->widget->find($id)->emailServices()->attach($email_id);
			}
		}
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int 		$id
	 * @param  bool    $flag
	 * @param  array  $inputs
	 *
	 */
	public function addRemovePoweredBy($id, $flag, $inputs)
	{
		$widget = $this->widget->find($id);
		if($flag){
			$widget->remove_powered_by = 1;
			$widget->image = $this->addImage($inputs['image']);
			$widget->save();
		} else {
			$widget->remove_powered_by = 0;
			$widget->save();
		}
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int    $id
	 * @param  array  $inputs
	 * @return Boolean
	 */
	public function updateWidget( $id , $inputs )
	{

		$widget = $this->widget->find($id);
		$updatedWidget = $this->getWidgetByID( $id )->update( $this->updateWidgetInputs( $inputs ) );
		if(isset($inputs['one1'])){
			$widgetcustomisation = WidgetCustomisation::where(['widget_id'=>$id])->first();
			if($widgetcustomisation){
				$widgetcustomisation->update($this->getWidgetCustomInputs($id,$inputs));
			}else{
				WidgetCustomisation::create($this->getWidgetCustomInputs($id,$inputs));
			}
		}	
		if($this->isWidgetCompletelyFilled($id)) {
			$widget->is_complete = 1;
			$widget->save();
		} else {
			$widget->is_complete = 0;
			$widget->save();
		}
		return $updatedWidget;
	}

	/**
	 * Manage data for update the specified resource in storage.
	 *
	 * @param  array  $inputs
	 * @return array
	 */
	private function updateWidgetInputs( $inputs )
	{
		if(isset($inputs['tab_design'])){
			if(empty($inputs['lightbox'])){
				$inputs['lightbox'] = 0;
			}
		}
		if(isset($inputs['provider_type']))
		{
			if($inputs['provider_type'] == 'raw-html'){
				$inputs['email_provider'] = null;
				$inputs['email_provider_value'] = null;
				if($inputs['raw_html_code']){
					$inputs['raw_html_code'] = urlencode(json_encode($inputs['raw_html_code']));
				}
			//$b = json_decode(urldecode($a));
			}elseif($inputs['provider_type'] == 'autoresponder'){
				$inputs['raw_html_code'] = null;
				$inputs['rawhtml_form_action'] = null;
				$inputs['rawhtml_form_hidden_inputs'] = null;
				$inputs['first_name_field_value'] = null;
				$inputs['first_name_field_value'] = null;
				$inputs['first_name_field_value'] = null;
			}
			if(empty($inputs['send_email']))
				$inputs['send_email'] = 0;
			if(empty($inputs['create_ticket']))
				$inputs['create_ticket'] = 0;
			if(empty($inputs['sms_notification']))
				$inputs['sms_notification'] = 0;
			if(empty($inputs['phone_field_required']))
				$inputs['phone_field_required'] = 0;
			if(empty($inputs['phone_field_active']))
				$inputs['phone_field_active'] = 0;
			if(empty($inputs['email_field_required']))
				$inputs['email_field_required'] = 0;
			if(empty($inputs['email_field_active']))
				$inputs['email_field_active'] = 0;
			if(empty($inputs['first_name_field_required']))
				$inputs['first_name_field_required'] = 0;
			if(empty($inputs['first_name_field_active']))
				$inputs['first_name_field_active'] = 0;
			/*************** ty page url development by raghvendra ************/
			if(empty($inputs['url_field_required']))
				$inputs['url_field_required'] = 0;
			if(empty($inputs['url_field_active']))
				$inputs['url_field_active'] = 0;
		}
		if(isset($inputs['sendlane_emails'])){
			$mails = explode(',', $inputs['sendlane_emails']);
			$inputs['sendlane_emails'] = json_encode($mails); 
		}
		if(isset($inputs['sms_notification']) && $inputs['sms_notification'] == 0) {
			$inputs['sms_provider'] = "";
		}

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
		$inputs['country_code'] = $this->ip_info($ip, "Country Code");
		if(isset($inputs['tab_title_one'])){
			$tabDesign = [
				$inputs['tab_title_one'],
				$inputs['tab_title_two'],
				$inputs['tab_title_three']
			];
			$inputs['tab_design_text'] = json_encode($tabDesign);
		}
		return $inputs;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int    $id
	 * @param  array  $inputs
	 * @return Boolean
	 */
	public function updateWidgetEnbedCode($id, $campaign_id, $inputs)
	{
		if(null != $widget = $this->widget->where('id', $id)->where('campaign_id', $campaign_id)->first()) {
			return $widget->update($inputs);
		} else {
			return false;
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyWidget( $id )
	{
		return $this->getWidgetByID( $id )->delete();
	}

	/**
	 * Remove the specified resources from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyCapmaignWidgets( $id )
	{
		return $this->widget->where('campaign_id', $id)->delete();
	}

	private function ip_info($ip = NULL, $purpose = "location", $deep_detect = TRUE) {
		$output = NULL;
		if (filter_var($ip, FILTER_VALIDATE_IP) === FALSE) {
			$ip = $_SERVER["REMOTE_ADDR"];
			if ($deep_detect) {
				if (filter_var(@$_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP))
					$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
				if (filter_var(@$_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP))
					$ip = $_SERVER['HTTP_CLIENT_IP'];
			}
		}
		$purpose    = str_replace(array("name", "\n", "\t", " ", "-", "_"), NULL, strtolower(trim($purpose)));
		$support    = array("country", "countrycode", "state", "region", "city", "location", "address");
		$continents = array(
			"AF" => "Africa",
			"AN" => "Antarctica",
			"AS" => "Asia",
			"EU" => "Europe",
			"OC" => "Australia (Oceania)",
			"NA" => "North America",
			"SA" => "South America"
		);

		if (filter_var($ip, FILTER_VALIDATE_IP) && in_array($purpose, $support)) {
			$ipdat = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=" . $ip));
			if (@strlen(trim($ipdat->geoplugin_countryCode)) == 2) {
				switch ($purpose) {
					case "location":
					$output = array(
						"city"           => @$ipdat->geoplugin_city,
						"state"          => @$ipdat->geoplugin_regionName,
						"country"        => @$ipdat->geoplugin_countryName,
						"country_code"   => @$ipdat->geoplugin_countryCode,
						"continent"      => @$continents[strtoupper($ipdat->geoplugin_continentCode)],
						"continent_code" => @$ipdat->geoplugin_continentCode
					);
					break;
					case "address":
					$address = array($ipdat->geoplugin_countryName);
					if (@strlen($ipdat->geoplugin_regionName) >= 1)
						$address[] = $ipdat->geoplugin_regionName;
					if (@strlen($ipdat->geoplugin_city) >= 1)
						$address[] = $ipdat->geoplugin_city;
					$output = implode(", ", array_reverse($address));
					break;
					case "city":
					$output = @$ipdat->geoplugin_city;
					break;
					case "state":
					$output = @$ipdat->geoplugin_regionName;
					break;
					case "region":
					$output = @$ipdat->geoplugin_regionName;
					break;
					case "country":
					$output = @$ipdat->geoplugin_countryName;
					break;
					case "countrycode":
					$output = @$ipdat->geoplugin_countryCode;
					break;
				}
			}
		}
		return $output;
	}
	public function getWidgetCustomInputs($widgetId,$inputs)
	{
		$template_one = $template_two = $template_three = $template_four = $template_five = [];
		$template_six = $template_seven = $template_eight = $template_none = [];

		for($i = 1;$i < 7;$i++){
			if(count($template_one) < 6){
				$template_one['one'.$i] = $inputs['one'.$i];
			}
			if(count($template_two) < 5){
				$template_two['two'.$i] = $inputs['two'.$i];
			}
			if(count($template_three) < 4){
				$template_three['three'.$i] = $inputs['three'.$i];
			}
			if(count($template_four) < 1){
				$template_four['four'.$i] = $inputs['four'.$i];
			}
			if(count($template_five) < 4){
				$template_five['five'.$i] = $inputs['five'.$i];
			}
			if(count($template_six) < 6){
				$template_six['six'.$i] = $inputs['six'.$i];
			}
			if(count($template_seven) < 1){
				$template_seven['seven'.$i] = $inputs['seven'.$i];
			}
			if(count($template_eight) < 1){
				$template_eight['eight'.$i] = $inputs['eight'.$i];
			}
			if(count($template_none) < 2){
				$template_none['none'.$i] = $inputs['none'.$i];
			}

		}
		return [ 
			'widget_id' => $widgetId, 
			'template_one' => json_encode($template_one),
			'template_two' => json_encode($template_two),
			'template_three' => json_encode($template_three),
			'template_four' => json_encode($template_four),
			'template_five' => json_encode($template_five),
			'template_six' => json_encode($template_six),
			'template_seven' => json_encode($template_seven),
			'template_eight' => json_encode($template_eight),
			'template_nine' => json_encode($template_none),
			'widget_video_headline' => $inputs['widget_video_headline'],
			'widget_voice_headline' => $inputs['widget_voice_headline'],
			'ty_msg' => $inputs['ty_msg']
		];
	}

	public function getWidgetCustomisationByWidgetID( $id )
	{
		//DB::enableQueryLog();
		if( isset($this->auth->user()->role) && $this->auth->user()->role == "user" ){
			$data = $this->widgetcustomisation->where('widget_id', $id)->first();
		}else{
			$data = $this->widgetcustomisation->where('widget_id', $id)->first();
		}
		return $data;
	}
}