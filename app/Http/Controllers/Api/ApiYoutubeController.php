<?php namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Contracts\Auth\Guard;
use App\Http\Controllers\Controller;
use App\Contracts\YoutubeServiceInterface;
use App\Http\Requests\YoutubeConnectRequest;
use Illuminate\Http\Request;
use Exception;
class ApiYoutubeController extends Controller {

	public function __construct( Guard $auth )
	{
		$this->auth = $auth; 
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function connect( YoutubeConnectRequest $request, YoutubeServiceInterface $youtubeService )
	{
		if(isset($youtubeService->connect()['status']) && $youtubeService->connect()['status'] == 'warning'){
			return redirect()->back()->with( 'warning' , 'Something went wrong, please try again!' );
		}
		return redirect()->to($youtubeService->connect());	
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function callback(Request $request, YoutubeServiceInterface $youtubeService)
	{
		if($code = $request->get('code')){
			try{
				$youtubeService->saveAccessTokenToDB($code); 
			}catch(Exception $e){
				return redirect('/settings')->with( 'warning' , 'Wrong credentials, please try again!' );
			}
			return redirect('/settings')->with( 'success' , 'You are successfully connected to your Youtube account!' );
		}
		return redirect('/settings')->with( 'warning' , 'Wrong credentials, please try again!' );

	}

	public function upload( YoutubeServiceInterface $youtubeService )
	{
		$youtubeService->uploadVideoToYoutube();
	}

	public function disconnect( YoutubeServiceInterface $youtubeService )
	{
		if( $youtubeService->deleteUserAccessToken($this->auth->id()) ){
			return redirect()->back()->with('success' , 'You are successfully disconnected from your Youtube account!');
		}
		return redirect()->back()->with('warning' , 'Ups, Something went wrong, please try later.');

	}

}
