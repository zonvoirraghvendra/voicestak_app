<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\WhiteLabels;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Input;
use Session;
use Intervention\Image\ImageManagerStatic as InterventionImage;
use App\Contracts\WhiteLabelServiceInterface;
use Config;
use Response;
use Mail;
use App\Http\Requests\WhiteLabelUpdateRequest;
use App\Http\Requests\SmtpTestRequest;
use App\Repositories\WhiteLabelRepository;
use App\Contracts\MessageServiceInterface;
use App\User; 

class WhiteLabelController extends Controller {
    
    
    	public function __construct()
	{
            $this->middleware('auth');
	}
        
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index( WhiteLabelRepository $whitelabelrepo, MessageServiceInterface $messageService  )
	{
                        
            if( (Auth::user()->parent_id == 0) && (Auth::user()->is_enterprise == 0)) {
                
                return redirect('https://voicestak.com/');
                
            }
            
            $white_label_options = $whitelabelrepo->findBy('user_id', Auth::user()->id);
            
            if( $white_label_options ) {

                $white_label_options->wl_audio_email = isset($white_label_options->wl_audio_email) ? $white_label_options->wl_audio_email : $messageService->wl_default_audio_msg;
                $white_label_options->wl_video_email = isset($white_label_options->wl_video_email) ? $white_label_options->wl_video_email : $messageService->wl_default_video_msg;
                $white_label_options->wl_welcome_email = isset($white_label_options->wl_welcome_email) ? $white_label_options->wl_welcome_email : $messageService->wl_default_welcome_msg;
                $white_label_options->wl_video_email_subject = isset($white_label_options->wl_video_email_subject) ? $white_label_options->wl_video_email_subject : $messageService->wl_default_video_email_subject;
                $white_label_options->wl_audio_email_subject = isset($white_label_options->wl_audio_email_subject) ? $white_label_options->wl_audio_email_subject : $messageService->wl_default_audio_email_subject;
                $white_label_options->wl_welcome_email_subject = isset($white_label_options->wl_welcome_email_subject) ? $white_label_options->wl_welcome_email_subject : $messageService->wl_default_welcome_msg_subject;
                Session::put( 'white_label_options', $white_label_options );
                
            }
                            
            return view('whitelabelsettings', ['white_label_options'=>$white_label_options]);
            
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
	public function update( WhiteLabelUpdateRequest $request, WhiteLabelRepository $whitelabelrepo ) {
            
                $input = $request->all();

                if (Input::file('company_logo')) {
                    $image = Input::file('company_logo');
                    $filename = Auth::user()->id . "-logo." . $image->getClientOriginalExtension();
                    $path = public_path() . '/uploads/' . $filename;
                    InterventionImage::make($image->getRealPath())->save($path);
                    $input['company_logo'] = url('/uploads/' . $filename);

                }             

                $input['user_id'] = Auth::user()->id; 

                $white_label_options = $whitelabelrepo->findBy('user_id', Auth::user()->id);
                
                if($white_label_options) {
                   $white_label_options_updated = $white_label_options->update( $input );
                } else {
                    $white_label_options_updated = WhiteLabels::create( $input );
                }

                if( $white_label_options_updated ) {
                     Session::put( 'white_label_options', $whitelabelrepo->findBy('user_id', Auth::user()->id) );
                     return redirect( '/whitelabel' )->withSuccess('Your Settings Have Been Successfully Saved');
                } else {
                    return redirect( '/whitelabel' )->withInput()->withErrors('Your Settings Were Not Saved; Please Try Again');
                }

	}

        
        public function testSmtp(SmtpTestRequest $request) {
            
                try {

                        $mail    = Config::get( "mail" );
                        Config::set( "mail.driver", "smtp" );

                        $content = "This is a test message! Do not respond.";

                        Config::set( "mail.host", $request->get('smtp_host') );
                        Config::set( "mail.port", $request->get('smtp_port') );
                        Config::set( "mail.username", $request->get('smtp_username') );
                        Config::set( "mail.password", $request->get('smtp_password') );
                        Config::set( "mail.from.name", $request->get('smtp_from_name') );
                        Config::set( "mail.from.address", $request->get('smtp_from_email') );
                        Config::set( "mail.encryption", $request->get('smtp_protocol') );

                        Mail::send( "emails.emailtemplates.blank", [ "contents" => $content ], function ( $message ) {
                                $message
                                        ->subject( "Test Email" )
                                        ->from( Config::get( "mail.from.address" ), Config::get( "mail.from.name") )
                                        ->to( Auth::user()->email );
                        } );
                        Config::set( "mail", $mail );

                        return Response::json( [
                                'success' => true,
                                'message' => 'SMTP Test Successful'
                        ] );
                        
                } catch( \Exception $e ) {
                    
                        return Response::json( [
                                "error"   => true,
                                "message" => $e->getMessage()
                        ] );
                }
        }

        /**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy(Request $request, WhiteLabelServiceInterface $whiteLabelsService)
	{
            
            
	}
       


}
