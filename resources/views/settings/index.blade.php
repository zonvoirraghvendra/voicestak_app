@extends('layouts.layout')

@section('title') Integrations @stop

@section('content')
    <div id='main-content' role='main'>
        <div class='campaigns-page'>
            <div class='vt-page-header'>
                <div class='vt-page-title'>
                    <h3>
                        <i class='glyphicon glyphicon-cog'></i>
                        Integrations
                    </h3>
                </div>
                <div class='vt-page-controller'>
                    <form action="/messages" method="get" id="MessagesSortByCampaign">
                        <select class="form-control campaignSelect widgets-page-select selectpicker" data-live-search='true' @if(count($campaigns)==0) disabled @endif name="campaign_id">
                            <option value="0">All Campaigns</option>
                            @foreach($campaigns as $campaign)
                                <option class="campaign_id" @if(isset($campaign_id) && $campaign_id == $campaign->id) selected @endif value="{{$campaign->id}}">{{$campaign->name}}</option>
                            @endforeach
                        </select>
                    </form>
                    <a class=' btn btn-success' href="{{ url('/campaigns/create') }}" title='Create Campaign'>
                        <span class='glyphicon glyphicon-plus'></span>
                    </a>
                    {{-- @if( Auth::user()->role == "user" )
                        <a class=' btn btn-success' href="{{ url('/campaigns/create') }}" @if(!$youtube_connected) disabled @endif title='Create Campaign'>
                            <span class='glyphicon glyphicon-plus'></span>
                        </a>
                    @endif

                    @foreach(Auth::user()->permissions()->get() as $permission)
                        @if($permission->name == 'create-widget')
                            <a class=' btn btn-success' href="{{ url('/campaigns/create') }}" @if(!$youtube_connected) disabled @endif title='Create Campaign'>
                                <span class='glyphicon glyphicon-plus'></span>
                            </a>
                        @endif
                    @endforeach --}}
                </div>
            </div>
            <div class='vt-page'>
                <div class='vt-default-page'>
                    @include('layouts.alerts.messages')
                    <div class='vt-settings-container'>
                        <h4>
                            Configure YouTube Account
                        </h4>
                        <p>
                            Please connect to your YouTube account in order to allow your site visitors to submit a video message. You will be able to access the videos from the VoiceStak "Inbox"
                        </p>
                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='http://nosorogstudio.com/themes/nosorog/img/play-button.png'>
                                Youtube
                            </a>

                            <div class='buttons'>
                                @if(isset($youtube_connect))
                                    <a class='btn btn-danger' href='{!! url("/youtube/disconnect") !!}' role='button'>Disconnect</a>
                                @else
                                    <a class='btn btn-success' href='youtube/connect'>Connect</a>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class='vt-settings-container'>
                        <h4>
                            Auto Responder Integrations
                            <span style="margin-left:10px" title='You may choose to integrate an autoresponder service to capture customer data by connecting your autoresponder through the Settings area. If your autoresponder is not in our list of integrations you may choose the "RawHTML" method and paste in the code your autoresponder provides.'><i class="glyphicon glyphicon-question-sign" ></i></span>
                        </h4>
                        <p>
                            You can set up pre-configured autoresponder integrations at the global level. These configurations will display in the dropdown box on Step 3 of the Campaign setup. You will be able to choose the list you would like to post to at Step 2 of the Campaign set up as well. Alternatively, you may also add RawHTML code from your autoresponder at the Campaign level.
                        </p>
                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/GetResponse.png'>
                                Get Response
                            </a>
                            <div class='buttons'>
                                @if(isset($emailSettings['GetResponse']))
                                    {!! Form::model($emailSettings['GetResponse'],['url' => 'settings/email-api-disconnect/'.$emailSettings['GetResponse']->id, 'method' => 'DELETE' ]) !!}
                                @else
                                    {!! Form::open(['url' => 'settings/get-response-api-connect', 'method' => 'post' ]) !!}
                                @endif
                                    <div class='input-group'>
                                        {!! Form::text('api_key', null , [ 'class' => 'form-control' , 'placeholder' => 'API Key' , isset($emailSettings['GetResponse'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['GetResponse']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                {!! Form::close() !!}
                            </div>
                        </div>
                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/Aweber.png'>
                                Aweber
                            </a>
                            @if(isset($emailSettings['Aweber']))
                                {!! Form::model($emailSettings['Aweber'],['url' => 'settings/email-api-disconnect/'.$emailSettings['Aweber']->id, 'method' => 'DELETE', 'class' => 'pull-right' ]) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-aweber-api', 'method' => 'post', 'class' => 'pull-right' ]) !!}
                            @endif
                                <div class='buttons '>
                                    <div class="pull-left settings_text">Click the Connect button and you will be asked to login into the account.</div>
                                    <div class="pull-right">
                                        <span class=''>
                                            @if(isset($emailSettings['Aweber']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/Icontact.png'>
                                Icontact
                            </a>
                            @if(isset($emailSettings['Icontact']))
                                {!! Form::model($emailSettings['Icontact'],['url' => 'settings/email-api-disconnect/'.$emailSettings['Icontact']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-icontact-api', 'method' => 'get' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    {!! Form::text('app_id', null , [ 'class' => 'form-control small-input' , 'placeholder' => 'APP id' , isset($emailSettings['Icontact'])?'disabled':'' ]) !!}
                                    {!! Form::text('api_username', null , [ 'class' => 'form-control' , 'placeholder' => 'API Username' , isset($emailSettings['Icontact'])?'disabled':'' ]) !!}

                                    <div class="input-group">
                                        {!! Form::text('api_password', null , [ 'class' => 'form-control' , 'placeholder' => 'API Password' , isset($emailSettings['Icontact'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['Icontact']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/Interspire.png'>
                                Interspire
                            </a>
                            @if(isset($emailSettings['Interspire']))
                                {!! Form::model($emailSettings['Interspire'],['url' => 'settings/email-api-disconnect/'.$emailSettings['Interspire']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-interspire-api', 'method' => 'post' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    {!! Form::text('intr_username', null , [ 'class' => 'form-control small-input' , 'placeholder' => 'User Name' , isset($emailSettings['Interspire'])?'disabled':'' ]) !!}
                                    {!! Form::text('intr_usertoken', null , [ 'class' => 'form-control' , 'placeholder' => 'Token' , isset($emailSettings['Interspire'])?'disabled':'' ]) !!}

                                    <div class="input-group">
                                        {!! Form::text('intr_api_path', null , [ 'class' => 'form-control' , 'placeholder' => 'API Path' , isset($emailSettings['Interspire'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['Interspire']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/MailChimp2.png'>
                                MailChimp
                            </a>
                            <div class='buttons'>
                                @if(isset($emailSettings['MailChimp']))
                                    {!! Form::model($emailSettings['MailChimp'],['url' => 'settings/email-api-disconnect/'.$emailSettings['MailChimp']->id, 'method' => 'DELETE' ]) !!}
                                @else
                                    {!! Form::open(['url' => 'settings/connect-mail-chimp-api', 'method' => 'get' ]) !!}
                                @endif
                                    <div class="input-group">
                                        {!! Form::text('mailchimp_api_key', null , [ 'class' => 'form-control' , 'placeholder' => 'Api Key' , isset($emailSettings['MailChimp'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['MailChimp']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                {!! Form::close() !!}
                            </div>
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/SendReach.png'>
                                SendReach
                            </a>
                            @if(isset($emailSettings['SendReach']))
                                {!! Form::model($emailSettings['SendReach'],['url' => 'settings/email-api-disconnect/'.$emailSettings['SendReach']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-send-reach-api', 'method' => 'get' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    {!! Form::text('sr_public_key', null , [ 'class' => 'form-control' , 'placeholder' => 'Public Key' , isset($emailSettings['SendReach'])?'disabled':'' ]) !!}
                                    <div class="input-group">
                                        {!! Form::text('sr_private_key', null , [ 'class' => 'form-control' , 'placeholder' => 'Private Key' , isset($emailSettings['SendReach'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['SendReach']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/InfusionSoft.png'>
                                InfusionSoft
                            </a>
                            @if(isset($emailSettings['InfusionSoft']))
                                {!! Form::model($emailSettings['InfusionSoft'],['url' => 'settings/email-api-disconnect/'.$emailSettings['InfusionSoft']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-infusion-soft-api', 'method' => 'get' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    <div class="pull-left settings_text">Click the Connect button and you will be asked to login into the account.</div>
                                    <div class="pull-right">
                                        <span class=''>
                                            @if(isset($emailSettings['InfusionSoft']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/ActiveCampaign.png'>
                                ActiveCampaign
                            </a>
                            @if(isset($emailSettings['ActiveCampaign']))
                                {!! Form::model($emailSettings['ActiveCampaign'],['url' => 'settings/email-api-disconnect/'.$emailSettings['ActiveCampaign']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-active-campaign-api', 'method' => 'get' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    {!! Form::text('ac_api_key', null , [ 'class' => 'form-control' , 'placeholder' => 'Api Key' , isset($emailSettings['ActiveCampaign'])?'disabled':'' ]) !!}
                                    <div class="input-group">
                                        {!! Form::text('ac_api_url', null , [ 'class' => 'form-control' , 'placeholder' => 'Api url' , isset($emailSettings['ActiveCampaign'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['ActiveCampaign']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/Ontraport.png'>
                                Ontraport
                            </a>
                            @if(isset($emailSettings['Ontraport']))
                                {!! Form::model($emailSettings['Ontraport'],['url' => 'settings/email-api-disconnect/'.$emailSettings['Ontraport']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-ontraport-api', 'method' => 'post' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    {!! Form::text('ontr_app_id', null , [ 'class' => 'form-control' , 'placeholder' => 'App ID' , isset($emailSettings['Ontraport'])?'disabled':'' ]) !!}
                                    <div class="input-group">
                                        {!! Form::text('ontr_api_key', null , [ 'class' => 'form-control' , 'placeholder' => 'Api key' , isset($emailSettings['Ontraport'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['Ontraport']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/ConstantContact.png'>
                                ConstantContact
                            </a>
                            @if(isset($emailSettings['ConstantContact']))
                                {!! Form::model($emailSettings['ConstantContact'],['url' => 'settings/email-api-disconnect/'.$emailSettings['ConstantContact']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-constant-contact-api', 'method' => 'get' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    {!! Form::text('const_api_key', null , [ 'class' => 'form-control' , 'placeholder' => 'Api key' , isset($emailSettings['ConstantContact'])?'disabled':'' ]) !!}
                                    <div class="input-group">
                                        {!! Form::text('const_access_token', null , [ 'class' => 'form-control' , 'placeholder' => 'Access token' , isset($emailSettings['ConstantContact'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['ConstantContact']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/CampaignMonitor.png'>
                                Campaign Monitor
                            </a>
                            @if(isset($emailSettings['CampaignMonitor']))
                                {!! Form::model($emailSettings['CampaignMonitor'],['url' => 'settings/email-api-disconnect/'.$emailSettings['CampaignMonitor']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-campaign-monitor-api', 'method' => 'get' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    <div class="input-group">
                                        {!! Form::text('cm_api_key', null , [ 'class' => 'form-control' , 'placeholder' => 'Api key' , isset($emailSettings['CampaignMonitor'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($emailSettings['CampaignMonitor']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>
                    </div>

                    <div class='vt-settings-container'>
                        <h4>
                            SMS Integrations
                            <span title="You may choose to integrate an SMS service to later contact the customers via phone or text message. If you enable this feature, by U.S. FCC Law we must ask the user to confirm that you can contact your customer via phone or text message. If your customer does not consent, the message will still be delivered to you, however, you cannot contact them via phone or text message if consent is not given." style="margin-left:10px"><i class="glyphicon glyphicon-question-sign"></i></span>
                        </h4>
                        <p>
                            Configure your SMS integrations to have text messages delivered to your phone when someone submits a VoiceStak Message. A link will be sent to your phone.
                        </p>
                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/Twilio.png'>
                                Twilio
                            </a>
                            @if(isset($smsSettings['Twilio']))
                                {!! Form::model($smsSettings['Twilio'],['url' => 'settings/sms-api-disconnect/'.$smsSettings['Twilio']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-twilio-api', 'method' => 'post' , 'class' => 'pull-right']) !!}
                            @endif
                                <div class='buttons'>
                                    {!! Form::text('account_sid', null , [ 'class' => 'form-control' , 'placeholder' => 'Account SID' , isset($smsSettings['Twilio'])?'disabled':'' ]) !!}
                                    <div class='input-group'>
                                        {!! Form::text('auth_token', null , [ 'class' => 'form-control' , 'placeholder' => 'Auth token' , isset($smsSettings['Twilio'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($smsSettings['Twilio']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>
                        <div class='vt-option-container'>
                            <div>
                                <div class="col-md-4" style="padding-left: 0px !important;">
                                    <a class='logo'>
                                        <img src='/assets/img/CallFire.png'>
                                        CallFire
                                    </a>
                                    <br>
                                    <a style="font-size: 10px;" href="https://www.callfire.com/?a_aid=voicestak" target="_blank">Need an Account</a>
                                </div>
                            </div>
                            @if(isset($smsSettings['CallFire']))
                                {!! Form::model($smsSettings['CallFire'],['url' => 'settings/sms-api-disconnect/'.$smsSettings['CallFire']->id, 'method' => 'DELETE' , 'class' => 'pull-right']) !!}
                            @else
                                {!! Form::open(['url' => 'settings/connect-callFire-api', 'method' => 'post' , 'class' => 'pull-right']) !!}
                            @endif
                            <div class='buttons'>
                                {!! Form::text('app_login', null , [ 'class' => 'form-control' , 'placeholder' => 'App Login' , isset($smsSettings['CallFire'])?'disabled':'' ]) !!}
                                <div class='input-group'>
                                    {!! Form::text('app_password', null , [ 'class' => 'form-control' , 'placeholder' => 'App Password' , isset($smsSettings['CallFire'])?'disabled':'' ]) !!}
                                    <span class='input-group-btn'>
                                        @if(isset($smsSettings['CallFire']))
                                            {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                        @else
                                            {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                        @endif
                                    </span>
                                </div>
                            </div>
                            {!! Form::close() !!}
                        </div>

                        <div class='vt-option-container'>
                            <a class='logo'>
                                <img src='/assets/img/CallRail.png'>
                                CallRail
                            </a>
                            <div class='buttons'>
                                @if(isset($smsSettings['CallRail']))
                                    {!! Form::model($smsSettings['CallRail'],['url' => 'settings/sms-api-disconnect/'.$smsSettings['CallRail']->id, 'method' => 'DELETE' ]) !!}
                                @else
                                    {!! Form::open(['url' => 'settings/connect-callRail-api', 'method' => 'post' ]) !!}
                                @endif
                                    <div class='input-group'>
                                        {!! Form::text('callRail_api_key', null , [ 'class' => 'form-control' , 'placeholder' => 'Api Key' , isset($smsSettings['CallRail'])?'disabled':'' ]) !!}
                                        <span class='input-group-btn'>
                                            @if(isset($smsSettings['CallRail']))
                                                {!! Form::submit('Disconnect', [ 'class' => 'btn btn-danger' ]) !!}
                                            @else
                                                {!! Form::submit('Connect', [ 'class' => 'btn btn-success' ]) !!}
                                            @endif
                                        </span>
                                    </div>
                                {!! Form::close() !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection