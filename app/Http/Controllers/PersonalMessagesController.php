<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\CampaignServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Contracts\PersonalMessageServiceInterface;
use App\Services\SmsServicesService;
use App\Http\Requests\PersonalMessageRequest;

use Illuminate\Http\Request;

class PersonalMessagesController extends Controller {


	public function __construct() {
		$this->middleware('auth');
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index( PersonalMessageRequest $request, PersonalMessageServiceInterface $pmService, WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService, SmsServicesService $smsService )
	{
		$campaign_id = $request->get('campaign_id');
		if($widget_id = $request->get('widget_id')){
			return $widgetService->getWidgetById($widget_id)->sender_phone;
		}
		if($campaign_id === '0')
			return redirect('/personal-messages');
		if($campaign_id){
			$personalMessages = $pmService->collection($campaign_id);
		} else {
			$personalMessages = $pmService->getAllPersonalMessages();
			//dd($messages);
		}
		return view('personalMessages.index' , [ 'personalMessages' => $personalMessages, 'campaign_id' => $campaign_id, 'widgets' => $widgetService->getWidgetsList(), 'campaigns' => $campaignService->getAllCampaigns() ]);
	}

	public function sendMessage( PersonalMessageRequest $request, PersonalMessageServiceInterface $pmService, WidgetServiceInterface $widgetService )
	{

		$widget = $widgetService->getWidgetById($request->get('widget_id'));
		if(empty($widget->sms_provider)){
			return redirect()->back()->with('warning', 'There are no SMS service connected. Please go to the Integrations page, connect one of SMS services and connect it to your widget.');
		}
		$response = $pmService->sendSMS($request->all());
		
		return redirect()->back()->with($response['status'], $response['message']);
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
	public function destroy($id, PersonalMessageServiceInterface $pmService)
	{
		if($pmService->destroyPersonalMessage( $id )) {
			return redirect('/personal-messages');
		}
	}

}
