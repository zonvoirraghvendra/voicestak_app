<?php namespace App\Services;

use Illuminate\Contracts\Auth\Guard;
use App\Contracts\YoutubeServiceInterface;
use App\Models\YoutubeAccessToken;
use Config;
use Lib\Youtube\MyYoutube;
use GuzzleHttp;
use File;

class YoutubeService implements YoutubeServiceInterface {

	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth, YoutubeAccessToken $youtube )
	{	
		$this->auth = $auth;
		
		$this->youtube = $youtube;
	}

	public function connect( $inputs )
	{
		$myYoutube = new MyYoutube();
		$ch = curl_init($myYoutube->createAuthUrl());

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_exec($ch);
		$info = curl_getinfo($ch);
		//dd($info['http_code']);
		if($info['http_code'] != 302)
		{
		    return ['status' => 'warning', 'message' => 'Access denied: Invalid credentials'];
		}
		return $myYoutube->createAuthUrl();
	}

	public function saveAccessTokenToDB($code)
	{
		$myYoutube = new MyYoutube();
		if(is_null($code)) {
			return ['status' => 'warning', 'message' => 'Access denied: Invalid credentials'];
		} else {
			if(config('youtube.client_id') && config('youtube.client_secret')){
				try{
					$token = $myYoutube->authenticate($code);

					$myYoutube->saveAccessTokenToDB($token);
				}catch(Exeption $e){
					return ['status' => 'warning', 'message' => 'Oops, Something went wrong, please try again.'];
				}
					return ['status' => 'success', 'message' => 'You are successfully connected!'];
			}
			return ['status' => 'warning', 'message' => 'Oops, Something went wrong, please try again.'];
		
		}
	}

	public function makeVideoFromAudio( $audioFile )
	{
		$audio = "uploads/audio/".$audioFile;
		$fileName = str_random(20). '.mp4';
		$cmd = "ffmpeg -loop 1 -i uploads/voice-stack.jpg -i $audio -c:v libx264 -tune stillimage -c:a aac -strict experimental -b:a 192k -pix_fmt yuv420p -shortest uploads/video/$fileName";
		//$cmd = "ffmpeg -i uploads/video/syoQoB8GS8Qki8GGHoui.mp4 uploads/output.avi";
		exec($cmd . " 2>&1", $output, $return_var);
		$data = $cmd . "\r\n\r\n" . implode("\r\n", $output);
		$video_log = storage_path() . "/" . gmdate('d-m-Y_h:i_A') . ".log";
		$file      = fopen($video_log, 'w');
		fputs($file, $data);
		fclose($file);
		return $fileName;
	}

	public function makeMp4FromWebM( $videoFile )
	{
		$video = "uploads/video/".$videoFile;

		$fileName = str_random(20). '.mp4';
		$cmd = "ffmpeg -i $video -vcodec h264 -acodec aac -strict -2 uploads/video/$fileName";
		//$cmd = "ffmpeg -i uploads/video/syoQoB8GS8Qki8GGHoui.mp4 uploads/output.avi";
		exec($cmd . " 2>&1", $output, $return_var);
		$data = $cmd . "\r\n\r\n" . implode("\r\n", $output);
		$video_log = storage_path() . "/" . gmdate('d-m-Y_h:i_A') . ".log";
		$file      = fopen($video_log, 'w');
		fputs($file, $data);
		fclose($file);
		return $fileName;
	}

	public function uploadVideoToYoutube( $fileName, $title )
	{
		if(empty($title)) $title='Video';
		$myYoutube = new MyYoutube();
		$params = [
		    'title' => $title,
		    'description' => 'Message',
		    'category_id' => 10
		];

		$id = $myYoutube->upload("video/".$fileName, $params, 'private');
                
                return $id;
                
	}

	public function deleteUserAccessToken( $user_id )
	{
		$myYoutube = new MyYoutube();
		return $myYoutube->deleteAccessTokenFromDB( $user_id );
	}

	public function isConnected( $id )
	{
		return $this->youtube->where('user_id', $id)->get();
	}

	public function exists( $id )
	{
		$myYoutube = new MyYoutube();
		return $myYoutube->exists($id);
	}
}