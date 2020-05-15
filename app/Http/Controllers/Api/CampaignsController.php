<?php namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\CampaignServiceInterface;
use Illuminate\Http\Request;

class CampaignsController extends Controller {


	public function __construct()
	{
		$this->middleware('api');
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(CampaignServiceInterface $campaignService)
	{
		return response()->json(['data' => ['campaigns' => $campaignService->getAllCampaigns()]], 200);
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
	public function store(Request $request, CampaignServiceInterface $campaignService)
	{
		if(null !== $campaign = $campaignService->createCampaign($request->all())){
			return response()->json(['data' => ['campaign' => $campaign]], 200);
		}
		return response()->json(['message' => 'Error was occured!'], 501);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id, CampaignServiceInterface $campaignService)
	{
		if(null !== $campaign = $campaignService->getCampaignByID($id)){
			return response()->json(['data' => ['campaign' => $campaign]], 200);
		}
		return response()->json(['message' => 'Error was occured!'], 404);
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
	public function update($id, Request $request, CampaignServiceInterface $campaignService)
	{
		if(null !== $campaign = $campaignService->updateCampaign($id, $request->all())){
			return response()->json(['data' => ['campaign' => $campaign]], 200);	
		}
		return response()->json(['message' => 'Error was occured!'], 404);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id, CampaignServiceInterface $campaignService)
	{
		if(null != $campaignService->getCampaignByID($id)){
			$campaignService->destroyCampaign($id);
			return response()->json(['message' => 'Campaign Successfully Deleted'], 200);
		}
		return response()->json(['message' => 'Error was occured!'], 404);
	}

}
