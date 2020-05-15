<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\WidgetStatServiceInterface;
use App\Contracts\CampaignServiceInterface;
use App\Contracts\WidgetServiceInterface;
use App\Http\Requests\WidgetStatRequest;
use Carbon\Carbon; 
use Illuminate\Http\Request;

class ApiWidgetStatsController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index( WidgetStatRequest $request, WidgetStatServiceInterface $widgetStatService, WidgetServiceInterface $widgetService, CampaignServiceInterface $campaignService )
	{
		$campaign_id = $request->get('campaign_id');
		if($widget_id = $request->get('widget_id')){
			$stats = $widgetStatService->getWidgetStatsById($widget_id);
			$stats_days = $stats->lists('created_at');
			
			$days = array();
			if($filterDays = $request->get('filterDays')){
				foreach ($stats_days as $day) {
					$day = Carbon::parse($day)->format('Y-m-d');
					foreach($filterDays as $fd){	
						if($day == $fd){
							array_push($days,$day);
						}
					}
				}
				
				return view('reports.index' , [ 'widgets' => $widgetService->getWidgetsByCampaignId($campaign_id), 'campaigns' => $campaignService->getAllCampaigns(), 'campaign_id' => $campaign_id, 'days' => $days ]);
			}
			foreach ($stats_days as $day) {
				$day = Carbon::parse($day)->format('Y-m-d');
				array_push($days,$day);	
			}
			return view('reports.index' , [ 'widgets' => $widgetService->getWidgetsByCampaignId($campaign_id), 'campaigns' => $campaignService->getAllCampaigns(), 'campaign_id' => $campaign_id, 'days' => $days ]);
		}
		//$stats = $widgetStatService->getAllStats();
		//dd($stats);
		
		return view('reports.index' , [ 'widgets' => $widgetService->getWidgetsByCampaignId($campaign_id), 'campaigns' => $campaignService->getAllCampaigns(), 'campaign_id' => $campaign_id ]);
	}

	// public function createWidgetStat( WidgetStatServiceInterface $widgetStatService, WidgetStatRequest $request ){
	// 	if(null != $widgetStat = $widgetStatService->createWidgetStat( $request->all() )){
	// 		return $widgetStat;
	// 	}
	// }
}
