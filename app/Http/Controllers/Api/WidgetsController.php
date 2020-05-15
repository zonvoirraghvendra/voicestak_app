<?php namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\WidgetServiceInterface;

use Illuminate\Http\Request;

class WidgetsController extends Controller {


	public function __construct()
	{
		$this->middleware('api');
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(WidgetServiceInterface $widgetService)
	{
		return response()->json(['data' => ['widgets' => $widgetService->getAllWidgets()]], 200);
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
	public function store(Request $request, WidgetServiceInterface $widgetService)
	{
		if(null !== $widget = $widgetService->createWidget($request->all())){
			dd( $widget );
			return response()->json(['data' => ['widget' => $widget]], 200);
		}
		return response()->json(['message' => 'Error was occured!'], 501);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id, WidgetServiceInterface $widgetService)
	{
		if(null !== $widget = $widgetService->getWidgetByID($id)){
			return response()->json(['data' => ['widget' => $widget]], 200);
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
	public function update($id, Request $request, WidgetServiceInterface $widgetService)
	{
		if(null !== $widget = $widgetService->updateWidget($id, $request->all())){
			return response()->json(['data' => ['widget' => $widget]], 200);	
		}
		return response()->json(['message' => 'Error was occured!'], 404);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id, WidgetServiceInterface $widgetService)
	{
		if(null != $widgetService->getWidgetByID($id)){
			$widgetService->destroyWidget($id);
			return response()->json(['message' => 'Widget Successfully Deleted'], 200);
		}
		return response()->json(['message' => 'Error was occured!'], 404);
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  string  $token
	 * @return Response
	 */
	public function getWidgetByToken($token, WidgetServiceInterface $widgetService)
	{
		if(null !== $widget = $widgetService->getWidgetByToken($token)){
			return response()->json(['data' => ['widget' => $widget]], 200);
		}
		return response()->json(['message' => 'Error was occured!'], 404);
	}
        
                
        
        	public function widgetInfo(Request $request, WidgetServiceInterface $widgetService)
	{
		
                    if(null !== $widget = $widgetService->getWidgetByToken($request->get('token'))){
			return response()->json([
                            'first_name_field_active' => $widget->first_name_field_active, 
                            'first_name_field_required'=>$widget->first_name_field_required, 
                            'email_field_required'=>$widget->email_field_required,
                            'phone_field_active'=>$widget->phone_field_active,
                            'phone_field_required'=>$widget->phone_field_active
                                ], 200);
		}
		return response()->json(['message' => 'An Error Occured!'], 404);
	}
        
        
}
