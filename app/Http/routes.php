<?php
use Illuminate\Http\Request;
use CallFire\Api\Rest\Request\SendText;
use CallFire\Api\Client;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/testeeemail', function() {
   Postmark\Mail::compose( Config::get( 'mail.postmark_api_key' ) )
        ->from( 'support@voicestak.com', 'Voicestak Support' )
        ->addTo( 'jeandre.magiweb@gmail.com', 'Jeandre' )
        ->subject( "Welcome to Voicestak!" )
        ->messagePlain(
            "VS test"
        )->send(); 
});

# Admin Controller
Route::get('/redis', function()
{
	$redis = \RedisL5::connection();
	var_dump($redis->get('asd'));
	$redis->set('asd', 'asdasd564asdasd');
});
Route::get('exceltest', function(){return view('messages.exportTable');});
Route::get('/export-messages', 'MessagesController@exportCSV' );
// Route::get('/phpinfo', function() {
//   phpinfo(); 
// });

Route::controllers([
	'auth' 		=> 'Auth\AuthController',
	'password' 	=> 'Auth\PasswordController',
	'su'  		=> 'AdminController',
	'account'	=> 'AccountController',
	'paykickstart' => 'PaykickstartController'
]);

Route::get('/', function()
{
	return redirect('widgets');
});

Route::get('/tabs', function()
{
	return view('ankapEjer.ankapEj1');
});

Route::get('/heghine', function()
{
	return view('ankapEjer.ankapEj2');
});


//Route::get('messages/delete-incomplete-messages', 'MessagesController@deleteIncompleteMessages');
Route::controller('users', 'UserController');
Route::get('/unread-messages-count' , 'MessagesController@getUnreadMessagesCount');
Route::get('messages/mark-message-as-archived/{message_id}', 'MessagesController@markMessageAsArchived');

Route::post('messages/mark-message-as-read', 'MessagesController@markMessageAsRead');

Route::post('messages/update-message/{id}', 'MessagesController@updateMessage');

Route::post('messages/initialize', 'MessagesController@createMessage');
Route::post('messages/upload-audio-file', 'MessagesController@createMessage');
Route::post('messages/upload-video-file', 'MessagesController@uploadAndEncodeVideo');
Route::get('/video-done/{filename}', function($filename) {
	$status = false;
	if (file_exists('uploads/video/'. $filename)) {
		$status = true;
	}
	return response()->json($status);
});

Route::post('messages/add-tag','MessagesController@addNewTag');

Route::post('messages/add-bytes-in-session', 'MessagesController@addMessageInputsInSession');

Route::post('messages/delete-collection', 'MessagesController@deleteCollection');

Route::post('/add-click' , 'WidgetsController@addClick')->middleware(['cors']);

Route::post('/get-domain' , 'MessagesController@getDomain');

Route::get('messages/delete-audio', 'MessagesController@deleteAudio');

Route::get('messages/delete-video', 'MessagesController@deleteVideo');

Route::put( 'widgets/imageDelete','WidgetsController@imageDelete');

Route::get( 'widgets/get-widgets-by-campaign','WidgetsController@getWidgetsByCampaign');

Route::get( 'widgets/get-email-service-list','WidgetsController@getEmailServiceList');

Route::get( 'campaigns/create','CampaignsController@create');

Route::get( 'campaigns/{campaign_id}','CampaignsController@getCampaign');

Route::resource('campaigns','CampaignsController');

Route::resource('widgets','WidgetsController');

Route::post('settings/get-response-api-connect','SettingsController@getResponseApiConnect');

Route::post('settings/connect-aweber-api','SettingsController@connectAweberApi');

Route::get('settings/connect-aweber-api-callback','SettingsController@connectAweberApiCallback');

Route::resource('settings','SettingsController', ['except' => ['show']]);

Route::get('settings/get-response-api-list','SettingsController@getResponseList');

Route::get('settings/get-aweber-api-list','SettingsController@aweberList');

Route::get('settings/get-active-campaign-api-list','SettingsController@activeCampaignList');

Route::get('settings/get-constant-contact-api-list','SettingsController@constantContactList');

Route::get('settings/get-interspire-api-list','SettingsController@interspireList');

Route::get('settings/get-icontact-api-list','SettingsController@icontactList');

Route::get('settings/get-mail-chimp-api-list','SettingsController@mailChimpList');

Route::get('settings/get-send-reach-api-list','SettingsController@sendReachList');

Route::get('settings/connect-icontact-api','SettingsController@connectIcontactApi');

Route::post('settings/connect-interspire-api','SettingsController@connectInterspireApi');

Route::get('settings/connect-mail-chimp-api','SettingsController@connectMailChimpApi');

Route::get('settings/connect-send-reach-api','SettingsController@connectSendReachApi');

Route::get('settings/connect-infusion-soft-api','SettingsController@connectInfusionSoftApi');

Route::get('settings/infusion-callback-url','SettingsController@infusionRedirectUrl');

Route::get('settings/connect-campaign-monitor-api','SettingsController@connectCampaignMonitorApi');

Route::get('settings/connect-active-campaign-api','SettingsController@connectActiveCampaignApi');

Route::post('settings/connect-ontraport-api','SettingsController@connectOntraportApi');

Route::get('settings/connect-constant-contact-api','SettingsController@connectConstantContactApi');

Route::post('settings/connect-callFire-api','SettingsController@connectCallFireApi');

Route::post('settings/connect-twilio-api','SettingsController@connectTwilioApi');

Route::post('settings/connect-callRail-api','SettingsController@connectCallRailApi');

Route::delete('settings/email-api-disconnect/{id}','SettingsController@emailApiDisconnect');

Route::delete('settings/sms-api-disconnect/{id}','SettingsController@smsApiDisconnect');

Route::post('settings/create-subscriber/{user_id}/{email_provider}/{email_provider_value}','SettingsController@createSubscriber');

Route::post( 'settings/create-row-subscriber' , 'SettingsController@createSubscriberRow');

Route::get('reports','WidgetStatsController@index');

Route::get('personal-messages','PersonalMessagesController@index');

Route::post('personal-messages/send-message','PersonalMessagesController@sendMessage');

Route::resource('personal-messages','PersonalMessagesController');

Route::get('help','HelpController@index');

Route::post('youtube/connect', 'YoutubeController@connect');
Route::get('youtube/callback', 'YoutubeController@callback');
Route::get('youtube/upload', 'YoutubeController@upload');
Route::get('youtube/disconnect', 'YoutubeController@disconnect');

Route::resource('messages','MessagesController');

Route::controller('messages','MessagesController');

Route::get( 'campaigns/{compaign_id}/editCampaign',             'CampaignsController@editCampaign');
Route::put( 'campaigns/{compaign_id}/updateCampaign',           'CampaignsController@updateCampaign');

Route::get( 'campaigns/{compaign_id}/edit/{widget_id}',             'CampaignsController@getEditWithWidget');
Route::put( 'campaigns/{compaign_id}/update/{widget_id}',           'CampaignsController@putUpdateWithWidget');

Route::get( 'campaigns/{compaign_id}/wizard-appearance',            'CampaignsController@getWizardAppearance');
Route::post('campaigns/{compaign_id}/wizard-appearance',            'CampaignsController@postWizardAppearance');

Route::get( 'campaigns/{compaign_id}/wizard-appearance/{widget_id}','CampaignsController@getWizardWidgetAppearance');
Route::post('campaigns/{compaign_id}/wizard-appearance/{widget_id}','CampaignsController@postWizardWidgetAppearance');

Route::get( 'campaigns/{compaign_id}/wizard-integration/{widget_id}','CampaignsController@getWizardIntegration');
Route::post('campaigns/{compaign_id}/wizard-integration/{widget_id}','CampaignsController@postWizardIntegration');

Route::get( 'campaigns/{compaign_id}/wizard-embed/{widget_id}','CampaignsController@getWizardEmbed');
Route::post('campaigns/{compaign_id}/wizard-embed/{widget_id}','WidgetsController@postWizardEmbed');

Route::post('campaigns/change-tab-type','CampaignsController@changeTabType');

Route::group(['prefix' => 'widgets'], function()
{
	Route::get( '{compaign_id}/edit/{widget_id}',             'WidgetsController@getEditWithWidget');
	Route::put( '{compaign_id}/update/{widget_id}',           'WidgetsController@putUpdateWithWidget');

	Route::get( '{compaign_id}/wizard-appearance',            'WidgetsController@getWizardAppearance');
	Route::post('{compaign_id}/wizard-appearance',            'WidgetsController@postWizardAppearance');

	Route::get( '{compaign_id}/wizard-appearance/{widget_id}','WidgetsController@getWizardWidgetAppearance');
	Route::post('{compaign_id}/wizard-appearance/{widget_id}','WidgetsController@postWizardWidgetAppearance');

	Route::get( '{compaign_id}/wizard-integration/{widget_id}','WidgetsController@getWizardIntegration');
	Route::post('{compaign_id}/wizard-integration/{widget_id}','WidgetsController@postWizardIntegration');

	Route::get( '{compaign_id}/wizard-embed/{widget_id}','WidgetsController@getWizardEmbed');
	Route::post('{compaign_id}/wizard-embed/{widget_id}','WidgetsController@postWizardEmbed');

	Route::get( 'side-widget-preview/{widget_id}', 'WidgetsController@getSideWidgetPreview');
	Route::get( 'footer-widget-preview/{widget_id}', 'WidgetsController@getFooterWidgetPreview');

	Route::get( 'popup-widget-preview/{token}', 'WidgetsController@getPopupWidgetPreviewForEmbed');
	Route::get( 'side-widget/{token}', 'WidgetsController@getSideWidgetPreviewForEmbed');
	Route::get( 'footer-widget/{token}', 'WidgetsController@getFooterWidgetPreviewForEmbed');
	Route::get( 'custom-button/{token}', 'WidgetsController@getCustomButtonPreviewForEmbed');

	Route::get( '{widget_design}/popup-widget-preview/{widget_design_step}', 'WidgetsController@getPopupWidgetPreview');
});

Route::group(['prefix' => 'api', 'namespace' => 'Api', 'middleware' => 'api'], function(){
        Route::get('widgets/widgetInfo', 'WidgetsController@widgetInfo');
	Route::post('messages/updateMessage/{id}', 'MessagesController@updateMessage');
	Route::resource('widgets', 'WidgetsController');
	Route::resource('campaigns', 'CampaignsController');
	Route::resource('messages', 'MessagesController');
	Route::post( 'settings/create-row-subscriber' , 'SettingsController@createSubscriberRow');
	Route::post('settings/create-subscriber/{user_id}/{email_provider}/{email_provider_value}','SettingsController@createSubscriber');
});

Route::get('flash-recorder', function() {
	return view('testpage');
});

Route::get('get-user-media', function() {
	return view('gum');
});

Route::resource('whitelabel','WhiteLabelController');

Route::post('whitelabel/testsmtp', 'WhiteLabelController@testSmtp');

Route::group(['prefix' => 'prototyping'], function() {
	Route::get('recording', function() {
		return view('prototyping.ios-native-recording');
	});

	Route::post('videoupload', function() {

		try {
			if ( ! \Request::hasFile('vsfile') )
				return response()->json(['message' => 'No file.'], 500);

//			$file = \Request::file('vsfile');
//			\Storage::disk('local')->put('vsfiles/vsfile.mp4', $file);

//			dd($file);
			$imageName = 'new_vsfile.' .  \Request::file('vsfile')->getClientOriginalExtension();

			\Request::file('vsfile')->move(
				base_path() . '/public/images/catalog/', $imageName
			);

			return response()->json(['message' => 'File upload success.']);

		} catch(\Exception $e) {
			return response()->json(['message' => 'File upload error.', 'error' => $e], 500);
		}
	});
});
