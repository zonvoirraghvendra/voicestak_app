<?php namespace App\Services;
use App\Contracts\MessageServiceInterface;
use Api\AmazonApi;
use App\Models\Message;
use App\Models\Widget;
use App\Models\Campaign;
use Illuminate\Contracts\Auth\Guard;
use File;
use App\User;
use Session;
use App\Repositories\WhiteLabelRepository;
use Auth;
use Config, Postmark;
use Mail;

class MessageService implements MessageServiceInterface {

	public  $wl_default_welcome_msg;
	public  $wl_default_audio_msg;
	public  $wl_default_video_msg;     
	
	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , Message $message, Campaign $campaign , AmazonApi $amazonApi, User $user , Widget $widget, WhiteLabelRepository $whitelabelrepo  )
	{
		$this->auth 	 = $auth;
		$this->message   = $message;
		$this->widget    = $widget;
		$this->campaign  = $campaign;
		$this->amazonApi = $amazonApi;
		$this->user 	 = $user;
		$this->whitelabelrepo 	 = $whitelabelrepo;

		$this->wl_default_welcome_msg = '<p>Dear {username},</p>
		<p>You have successfully registered as one of our {companyName} members.</p>
		<p>Please keep this information safe as it contains your username and password.</p>
		<p>Your Membership Info:</p>
		<p>Login URL: <a href="{cNameUrl}">{cNameUrl}</a></p>
		<p>Username: {useremail}</p>
		<p>password: {password}</p>
		<p>If you have any questions or concerns, please submit a support ticket at {supportEmail}</p>
		<p>To your online success!</p>
		<p>The {companyName} Team</p>';

		$this->wl_default_audio_msg = '<h3>You have a new {companyName} audio message from the {campaignName} campaign >> {widgetName} widget.</h3>
		<p>Message details:</h2><h4>Name: {userName}</p>
		<p>Email: {userEmail}</p>
		<p>Phone: {userPhone}<p>
		<p>IP: {userIP}</p>
		<p>To see your message you can <a href="https://{cNameUrl}/messages">click here</a> to go to your account.</h4>
		<p>Alternatively you can listen to the message here: <a href="{fileurl}">Audio Message</a></h4>
		<p>Cheers, {companyName} Support</p>';

		$this->wl_default_video_msg = '<h3>You have a new {companyName} video message from the {campaignName} campaign >> {widgetName} widget.</h3>
		<p>Message details:</h2><h4>Name: {userName}</p>
		<p>Email: {userEmail}</p>
		<p>Phone: {userPhone}<p>
		<p>IP: {userIP}</p>
		<p>To see your message you can <a href="https://{cNameUrl}/messages">click here</a> to go to your account.</h4>
		<p>Alternatively you can listen to the message here: <a href="{fileurl}">Audio Message</a></h4>
		<p>Cheers, {companyName} Support</p>';      

		$this->wl_default_audio_email_subject = 'You Have A New Audio Message!';  

		$this->wl_default_video_email_subject = 'You Have A New Video Message!'; 

		$this->wl_default_welcome_msg_subject = 'Welcome To {companyName}';

	}

	/**
	 *	Return collection
	 *
	 * 	@return Collection
	 */
	public function collection( $status = 0, $campaign_id, $widget_id )
	{
		if($widget_id) {
			$messages = $this->getMessagesByWidgetID($status, $widget_id);
			return $messages;
		} else {
			$messages = $this->getMessagesByCampaignID($status, $campaign_id);
			return $messages;
		}

	}

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllMessages($status = 0)
	{
		if($this->auth->user()->role == "user" )
			// return $this->message->where(['user_id' => $this->auth->id(), 'is_archived' => $status])->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->paginate( \Config::get('voicestack.message_pagination') );
			return $this->message->where(['user_id' => $this->auth->id(), 'is_archived' => $status])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		else{
			$assigned_campaigns = json_decode($this->auth->user()->assigned_campaigns);
			$messages = $this->message->userWithAssignedCampaignMessages( $assigned_campaigns );
			// $assigned_messages = $this->message->whereIn('campaign_id', $assigned_campaigns)->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->get();
			// foreach ($assigned_messages as $key => $value) {
			// 	$messages[$key] = $value;
			// }
			
			// return $messages->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->paginate( \Config::get('voicestack.message_pagination') );
			return $messages->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		}

	}

	public function getUnreadMessagesCount(  )
	{
		if($this->auth->user()){
			if( $this->auth->user()->role == "user" ){
				return $this->auth->user()->unreadmessages();
			}else{
				$assigned_campaigns = json_decode($this->auth->user()->assigned_campaigns);
				return $this->message->userWithAssignedCampaignMessagesCount( $assigned_campaigns );
			}
		}
	}

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllMessagesForExport($status = 0)
	{
		// return $this->message->where(['user_id' => $this->auth->id(), 'is_archived' => $status])->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->get();
		return $this->message->where(['user_id' => $this->auth->id(), 'is_archived' => $status])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->get();
	}
	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getArchiveMessages()
	{
		// $archive_messages = $this->message->where(['user_id' => $this->auth->id(), 'is_archived' => 1])->orderBy( 'is_archived', 'ASC' )->orderBy( 'created_at' , 'DESC' )->paginate( \Config::get('voicestack.message_pagination') );
		$archive_messages = $this->message->where(['user_id' => $this->auth->id(), 'is_archived' => 1])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_archived', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		return $archive_messages;
	}

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getNewMessages()
	{
		// $new_messages = $this->message->where(['user_id' => $this->auth->id(), 'is_readed' => 0 , 'is_archived' => 0])->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->paginate( \Config::get('voicestack.message_pagination') );
		$new_messages = $this->message->where(['user_id' => $this->auth->id(), 'is_readed' => 0 , 'is_archived' => 0])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		return $new_messages;
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Widget object or NULL
	 */
	public function getMessageByID( $id )
	{
		return $this->message->find( $id );
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $campaign_id
	 * @return Widget object or NULL
	 */
	public function getAllMessagesByCampaignID( $campaign_id )
	{
		if( $this->auth->user()->role == "user" ){
			// return $this->message->where(['user_id' => $this->auth->id(), 'campaign_id' => $campaign_id])->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->get();
			return $this->message->where(['user_id' => $this->auth->id(), 'campaign_id' => $campaign_id])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->get();
		}else{
			// return $this->message->where( 'campaign_id' , $campaign_id )->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->get();
			return $this->message->where( 'campaign_id' , $campaign_id )->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->get();
			if( in_array( $campaign_id, json_decode($this->auth->user()->assigned_campaigns) ) ){
				// return $this->message->where( 'campaign_id' , $campaign_id )->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->get();
				return $this->message->where( 'campaign_id' , $campaign_id )->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->get();
			}
		}
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $widget_id
	 * @return Widget object or NULL
	 */
	public function getAllMessagesByWidgetID( $widget_id )
	{
		if( $this->auth->user()->role == "user"  ){
			// return $this->message->where(['user_id' => $this->auth->id(), 'widget_id' => $widget_id])->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->get();
			return $this->message->where(['user_id' => $this->auth->id(), 'widget_id' => $widget_id])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->get();
		}
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $campaign_id
	 * @return Widget object or NULL
	 */
	public function getMessagesByCampaignID( $status, $campaign_id )
	{
		if( $this->auth->user()->role == "user" ){
			// return $this->message->where(['user_id' => $this->auth->id(), 'campaign_id' => $campaign_id, 'is_readed' => $status])->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->paginate( \Config::get('voicestack.message_pagination') );
			return $this->message->where(['user_id' => $this->auth->id(), 'campaign_id' => $campaign_id, 'is_archived' => $status])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		}else{
			if( in_array( $campaign_id, json_decode($this->auth->user()->assigned_campaigns) ) ){
				// return $this->message->where( [ 'campaign_id' => $campaign_id , 'is_readed' => $status ])->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->paginate( \Config::get('voicestack.message_pagination') );
				return $this->message->where( [ 'campaign_id' => $campaign_id , 'is_readed' => $status ])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_archived', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
			}
		}
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $widget_id
	 * @return Widget object or NULL
	 */
	public function getMessagesByWidgetID( $status, $widget_id )
	{
		if( $this->auth->user()->role == "user" ){
			// return $this->message->where(['user_id' => $this->auth->id(), 'widget_id' => $widget_id, 'is_readed' => $status])->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->paginate( \Config::get('voicestack.message_pagination') );
			return $this->message->where(['user_id' => $this->auth->id(), 'widget_id' => $widget_id, 'is_archived' => $status])->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		}else{
			if( in_array( $this->widget->find( $widget_id )->campaign_id , json_decode($this->auth->user()->assigned_campaigns) ) ){
				// return $this->message->where( [ 'widget_id' => $widget_id , 'is_readed' => $status ] )->orderBy( 'is_readed', 'ASC' )->orderBy( 'created_at' , 'DESC' )->paginate( \Config::get('voicestack.message_pagination') );
				return $this->message->where( [ 'widget_id' => $widget_id , 'is_archived' => $status ] )->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
			}
		}
	}

	/**
	 *	@param int status, string name,email
	 *
	 * 	@return Collection
	 */
	public function getMesagesByNameAndEmail( $status = 0, $name, $email )
	{
		if( $this->auth->user()->role == "user" ){
			return $this->message->where( ['user_id' => $this->auth->id() , 'name' => $name , 'email' => $email , 'is_archived' => $status ] )->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		}else{

		}
	}

	/**
	 *	@param int status, string name,email
	 *
	 * 	@return Collection
	 */
	public function getMesagesByName( $status = 0, $name )
	{
		if( $this->auth->user()->role == "user" ){
			return $this->message->where( ['user_id' => $this->auth->id() , 'name' => $name , 'is_archived' => $status ] )->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		}else{
			
		}
	}

	/**
	 *	@param int status, string name,email
	 *
	 * 	@return Collection
	 */
	public function getMesagesByEmail( $status = 0, $email )
	{
		if( $this->auth->user()->role == "user" ){
			return $this->message->where( ['user_id' => $this->auth->id() , 'email' => $email , 'is_archived' => $status ] )->orderBy( 'created_at' , 'DESC' )->orderBy( 'is_readed', 'ASC' )->paginate( \Config::get('voicestack.message_pagination') );
		}else{
			
		}
	}

	public function saveVideoFile( $inputs )
	{
		if(isset($inputs['audiofile'])){
			$videofile = $inputs['videofile'];
			$audiofile = $inputs['audiofile'];
			$aviFileName = str_random(20). '.avi';
			$fileName = str_random(20). '.mp4';
			$cmd = "ffmpeg -i $videofile -i $audiofile -c copy -map 0:0 -map 1:0 uploads/video/".$aviFileName;
			exec($cmd . " 2>&1", $output, $return_var);
			$data = $cmd . "\r\n\r\n" . implode("\r\n", $output);
			$video_log = storage_path() . "/" . gmdate('d-m-Y_h:i_A') . ".log";
			$file      = fopen($video_log, 'w');
			fputs($file, $data);
			fclose($file);
			$cmd = "ffmpeg -i uploads/video/".$aviFileName." uploads/video/".$fileName;
			//$cmd = "ffmpeg -i uploads/video/syoQoB8GS8Qki8GGHoui.mp4 uploads/output.avi";
			exec($cmd . " 2>&1", $output, $return_var);
			$data = $cmd . "\r\n\r\n" . implode("\r\n", $output);
			$video_log = storage_path() . "/" . gmdate('d-m-Y_h:i_A') . ".log";
			$file      = fopen($video_log, 'w');
			fputs($file, $data);
			fclose($file);
			File::delete("uploads/video/".$aviFileName);
			
			return $fileName;
		}

	}

	public function addMessageInputsInSession( $inputs )
	{
		//var_dump($inputs['bytes']);exit;
		$exist_session_tokens = [];
		if(isset($inputs['bytes'])){
			$inputs_array = explode(",", urldecode($inputs['bytes']));
			$this->redis->set($inputs['session_token'], json_encode($inputs_array));
			// var_dump(Session::has($inputs['session_token']),Session::get($inputs['session_token']));
			if ( null !== $this->redis->get($inputs['token']) ) {

				$exist_session_tokens = json_decode($this->redis->get($inputs['token']));
			}
			//exit();
			$exist_session_tokens = array_merge( $exist_session_tokens , [ $inputs['session_token'] ] );
			$this->redis->set($inputs['token'], null);
			$this->redis->set($inputs['token'], json_encode($exist_session_tokens));
		}
		// var_dump( Session::has($inputs['token']), count(json_decode( $inputs['bytes'] )), isset($inputs['bytes']), $inputs['token'] );
	}
	/**
	 * Manage data for a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return array
	 */
	private function createMessageInputs($inputs)
	{
		if (isset($inputs['file_name']) && isset($inputs['file_type'])) {
			return ['file_name' => $inputs['file_name'], 'file_type' => $inputs['file_type']];
		}

		if (isset($inputs['file'])) {
			sleep(5);
			$file = $inputs['file'];
			$fileName = str_random(20). '.wav';
			$file->move('uploads/audio' , $fileName);
			return ['file_name' => $fileName, 'file_type' => 'audio'];
		}

		if (isset($inputs['initialize_message']) && $inputs['initialize_message'] == 1) {
			sleep(5);
			$fileName = str_random(20). '.mp4';
			return ['file_name' => $fileName, 'file_type' => 'video'];
		}

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Widget object or NULL
	 */
	public function createMessage( $inputs )
	{
		return $this->message->create( $this->createMessageInputs( $inputs ) );
	}

	/**
	 * Update a specific resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Widget object or NULL
	 */
	public function updateMessageInputs( $inputs )
	{

		if(isset($inputs['phone'])){
			if(isset($inputs['consent']) && $inputs['consent'] == 'on')
			{
				$inputs['consent'] = 1;
			} else{
				$inputs['consent'] = 0;
			}
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
		
		$inputs['user_ip'] = $ip;
		$inputs['is_complete'] = 1;
		return $inputs;
	}

	/**
	 * Update a specific resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Widget object or NULL
	 */
	public function updateMessages( $id , $inputs )
	{
		$message = $this->getMessageByID( $id );

		if (empty($inputs['file_name'])) {
			$inputs['file_name'] = $message->file_name;
		}

		$user_id = $inputs['user_id'];

		$user_timezone = $this->user->find( $user_id )->timezone;
		$timezone = substr($user_timezone, 8, 3);

		$message_time = date('Y-m-d G:i:s' , strtotime( $timezone . "hour"));
		$inputs['created_at'] = $message_time;

		return $this->getMessageByID( $id )->update( $this->updateMessageInputs( $inputs ) );
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyCampaignMessages( $id )
	{
		return $this->message->where('campaign_id', $id)->delete();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyWidgetMessages( $id )
	{
		return $this->message->where('widget_id', $id)->delete();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyMessage( $id )
	{
		$message = $this->getMessageByID( $id );
		//dd($message->file_type, $message->file_name);
		
		File::delete("uploads/".$message->file_type."/".$message->file_name);

		return $message->delete();
	}

	/**
	 * Manage data for update the specified resource in storage.
	 *
	 * @return array
	 */
	private function markMessageAsReadInputs()
	{
		return ['is_readed' => 1];
	}

 	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int    $id
	 * @return Boolean
	 */
 	public function markMessageAsRead( $id ) 
 	{
 		return $this->getMessageByID( $id )->update( $this->markMessageAsReadInputs() );
 	}

	/**
	 * Manage data for update the specified resource in storage.
	 *
	 * @return array
	 */
	private function markMessageAsArchivedInputs()
	{
		return ['is_archived' => 1];
	}

 	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int    $id
	 * @return Boolean
	 */
 	public function markMessageAsArchived( $id ) 
 	{
 		return $this->getMessageByID( $id )->update( $this->markMessageAsArchivedInputs() );
 	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @return Boolean
	 */
	public function deleteIncompleteMessages()
	{
		$current_date = time('Y-m-d i:h:s');
		$messages = $this->message->where('is_complete', 0)->where('created_at', '=', 'updated_at')->get();
		$message_ids = [];
		if(!$messages->isEmpty()){
			foreach($messages as $message){
				$updated_at = $message->updated_at;
				$to_time = strtotime($current_date);
				$from_time = strtotime($updated_at);
				$difference =  round(abs($to_time - $from_time) / 60,2);
				if($difference > 60){
					File::delete("uploads/".$message->file_type."/".$message->file_name);
					$this->message->find($message->id)->delete();
				}
			}
			return true;
		}
		return false;
	}

	public function sendEmailWithSandLane( $email = null , $fileurl , $message )
	{

                // dd($fileurl, $message);
		$widget   = $this->widget->where('id', $message->widget_id)->first();
		$campaign = $this->campaign->where('id', $message->campaign_id)->first();

		$user = User::where('id', $message->user_id)->first();

		if($user && $user->is_enterprise == 1) {
			$whitelabeloptions = $this->whitelabelrepo->findBy('user_id', $user->id);
		} elseif( ($user && $user->enterprise_id) ) {
			$whitelabeloptions = $this->whitelabelrepo->findBy('user_id', $user->enterprise_id);
		}  else {
			$whitelabeloptions = null;
		}  

		if( $whitelabeloptions && $whitelabeloptions->configure_email_templates ) { 

			if( $message->file_type == 'audio' ){
				$content = $whitelabeloptions->wl_audio_email;
				$subject = isset($whitelabeloptions->wl_audio_email_subject) ? $whitelabeloptions->wl_audio_email_subject : $this->wl_default_audio_email_subject;
			}elseif ( $message->file_type == 'video' ){
				$content = $whitelabeloptions->wl_video_email;
				$subject = isset($whitelabeloptions->wl_video_email_subject) ? $whitelabeloptions->wl_video_email_subject : $this->wl_default_video_email_subject;
			}

			$mail    = Config::get( "mail" );
			Config::set( "mail.driver", "smtp" );

			$content = str_replace("{campaignName}", $campaign->name, $content);
			$content = str_replace("{widgetName}", $widget->widget_name, $content);
			$content = str_replace("{companyName}", $whitelabeloptions->company_name, $content);
			$content = str_replace("{cNameUrl}", $whitelabeloptions->cname_url, $content);
			$content = str_replace("{userName}",$message->name, $content);  
			$content = str_replace("{userEmail}", $message->email, $content);  
			$content = str_replace("{userPhone}", $message->phone, $content); 
			$content = str_replace("{userIP}", $message->user_ip, $content); 
			$content = str_replace("{fileurl}", $fileurl, $content); 

			Config::set( "mail.host", $whitelabeloptions->smtp_host );
			Config::set( "mail.port", $whitelabeloptions->smtp_port );
			Config::set( "mail.username", $whitelabeloptions->smtp_username );
			Config::set( "mail.password", $whitelabeloptions->smtp_password );
			Config::set( "mail.encryption", $whitelabeloptions->smtp_protocol );

			Mail::send( "emails.emailtemplates.blank", [ "contents" => $content ], function ( $message ) use ($subject, $user, $whitelabeloptions){
				$message->subject( $subject )
				->from( $whitelabeloptions->smtp_from_email, $whitelabeloptions->smtp_from_name )
				->addTo( $user->email );
			} );                       

			return;

		} else {

			$subject = 'You Have a New VoiceStak Message!';
			if( $message->file_type == 'audio' ){
				$content = '<h3>You have a new VoiceStak audio message from the '.$campaign->name.' campaign >> '.$widget->widget_name.' widget.</h3><h2>Message details:</h2><h4>Name: '.$message->name.'</h4><h4>Email: '.$message->email.'</h4><h4>Phone: '.$message->phone.'</h4><h4>IP: '.$message->user_ip.'</h4><h4>To see your message you can <a href="https://app.voicestak.com/messages">click here</a> to go to your account.</h4><h4>Alternatively you can listen the message here: <a href="'.$fileurl.'">Audio Message</a></h4><h4>Cheers,</h4><h4>VoiceStak Support</h4>';	
			}elseif( $message->file_type == 'video' ){
				$content = '<h3>You have a new VoiceStak video message from the '.$campaign->name.' campaign >> '.$widget->widget_name.' widget.</h3><h2>Message details:</h2><h4>Name: '.$message->name.'</h4><h4>Email: '.$message->email.'</h4><h4>Phone: '.$message->phone.'</h4><h4>IP: '.$message->user_ip.'</h4><h4>To see your message you can <a href="https://app.voicestak.com/messages">click here</a> to go to your account.</h4><h4>Alternatively you can watch the message here: <a href="//youtu.be/'.$fileurl.'">Video Message</a></h4><h4>Cheers,</h4><h4>VoiceStak Support</h4>';
			}else{
				$content = '<h3>You have a new VoiceStak message </h3><h4><a href="https://app.voicestak.com/messages">Log in To Voice-Stack to view it</a></h4><h4>Cheers,</h4><h4>VoiceStak Support</h4>';
			}                    

		}

		// $url = \Config::get('voicestack.sendlane_domain');
		// $api = \Config::get('voicestack.sendlane_api');
		// $hash = \Config::get('voicestack.sendlane_hash');
		// foreach ($email as $currentemail ) {
		// 	$ch = curl_init($url."/api/v1/send-mail?api=".$api."&hash=".$hash."&sender_name=VoiceStack&sender_email=no-reply@voicestak.com&receipent_email=".$currentemail."&subject=".$subject."&content_html=".$content);
		// 	curl_setopt($ch, CURLOPT_HEADER, 0);
		// 	curl_setopt($ch, CURLOPT_POST, 1);
		// 	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		// 	$result = curl_exec($ch);
		// 	curl_close($ch);
		// }
		
		foreach ($email as $currentemail ) {
			if($currentemail){	
				\Log::info(json_encode(['currentemail' => $currentemail]));
				Postmark\Mail::compose( \Config::get( 'mail.postmark_api_key' ) )
				->from( 'support@voicestak.com', 'Voicestak Support' )
				->addTo( $currentemail )
				->subject( $subject )
				->messageHtml($content)->send();
			}
		}
		
	}

	public function uploadAudioToAmazon($filename)
	{
		if($this->amazonApi->store( '/audio/'.$filename , 'uploads/audio/'.$filename )){
			File::delete('uploads/audio/'.$filename);
		}
		return $filename;
	}

	public function getAudioFromAmazon($filename)
	{
		return $this->amazonApi->get( '/audio/'.$filename );
	}

	public function deleteCollection($inputs)
	{
		return $this->message->whereIn('id', $inputs)->delete();
	}


	public function sendWelcomeEmail( $name , $email, $password ) {

		if(Auth::user()->is_enterprise == 1) {

			$whitelabeloptions = $this->whitelabelrepo->findBy('user_id', Auth::user()->id);

		} elseif( (Auth::user()->is_premium == 1) && (Auth::user()->enterprise_id) ) {

			$whitelabeloptions = $this->whitelabelrepo->findBy('user_id', Auth::user()->enterprise_id);

		}

		if( !empty($whitelabeloptions) ) {

			$mail    = Config::get( "mail" );
			Config::set( "mail.driver", "smtp" );

			$content = $whitelabeloptions->wl_welcome_email;
			$content = str_replace("{username}", $name, $content);
			$content = str_replace("{companyName}", $whitelabeloptions->company_name, $content);
			$content = str_replace("{cNameUrl}", $whitelabeloptions->cname_url, $content);
			$content = str_replace("{supportEmail}", $whitelabeloptions->contact_email, $content);            
			$content = str_replace("{useremail}",$email, $content);  
			$content = str_replace("{password}", $password, $content); 

			$subject = $whitelabeloptions->	wl_welcome_email_subject;
			$subject = str_replace("{companyName}", $whitelabeloptions->company_name, $subject);

			Config::set( "mail.host", $whitelabeloptions->smtp_host );
			Config::set( "mail.port", $whitelabeloptions->smtp_port );
			Config::set( "mail.username", $whitelabeloptions->smtp_username );
			Config::set( "mail.password", $whitelabeloptions->smtp_password );
			Config::set( "mail.encryption", $whitelabeloptions->smtp_protocol );

			Mail::send( "emails.emailtemplates.blank", [ "contents" => $content, 'email'=> $email, 'name'=>$name], function ( $message ) use ($name, $email, $subject, $whitelabeloptions){
				$message->subject( $subject )
				->from( $whitelabeloptions->smtp_from_email, $whitelabeloptions->smtp_from_name )
				->addTo( $email, $name );
			} );
			Config::set( "mail", $mail ); 

			return;                

		}

		$status = Postmark\Mail::compose( Config::get( 'mail.postmark_api_key' ) )
		->from( 'support@voicestak.com', 'VoiceStak Support' )
		->addTo( $email, $name )
		->subject( "Welcome to VoiceStak!" )
		->messageHtml(
			"<p>Dear {$name},</p>

			<p>You have successfully registered as one of our VoiceStak members.</p>

			<p>Please keep this information safe as it contains your username and password.</p>

			<p>Your Membership Info:</p>
			<p>Login URL: https://app.voicestak.com/</p>
			<p>email: [{$email}]</p>
			<p>password: [{$password}]</p>

			<p>If you have any questions or concerns, please submit a support ticket at support@voicestak.com</p>

			<p>To your online success!</p>
			<p>The VoiceStak Team</p>"

		)->send();

		return $status;

	}

	public function insertTags($data)
	{
		$tags = array();
		$message = $this->getMessageByID( $data['message_id'] );
		if (!empty($data['tag'])) {
			$tags = $data['tag'];
		}
		return $this->getMessageByID( $data['message_id'] )->update(['tags'=>$tags]);
	}

}