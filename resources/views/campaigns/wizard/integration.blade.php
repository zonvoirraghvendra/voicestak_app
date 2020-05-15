@extends('layouts.layout')

@section('title') Campaign Form Builder &amp; Integration @stop

@section('styles')
    <link href="/assets/css/bootstrap-toggle.css" rel="stylesheet">
@endsection

@section('content')
    <div id='main-content' role='main'>
        <div class='campaigns-page'>
            <div class='vt-page-header'>
                <div class='vt-page-title'>
                    <h3>
                        <i class='glyphicon glyphicon-th-large'></i>
                        CAMPAIGN WIZARD
                    </h3>
                </div>
            </div>
            <div class='vt-steps-container'>
                <div class='container campaign-wizard'>
                    <div class='step-progress-container'>
                        <div class='step-navs'>
                            <div class='back-button'>
                                @if(Request::is('campaigns*'))
                                    <a href="{{ url('/campaigns/'.$campaign->id.'/wizard-appearance/'.$widget->id) }}" type="button" class="form-control btn btn-primary">
                                        <i class='glyphicon glyphicon-arrow-left'></i>
                                        Previous
                                    </a>
                                @endif
                                @if(Request::is('widgets*'))
                                    <a href="{{ url('/widgets/'.$campaign->id.'/wizard-appearance/'.$widget->id) }}" type="button" class="form-control btn btn-primary">
                                        <i class='glyphicon glyphicon-arrow-left'></i>
                                        Previous
                                    </a>
                                @endif
                            </div>
                            <div class='next-button'>
                                <a class='next form-control btn btn-primary'>
                                    <i class='glyphicon glyphicon-arrow-right'></i>
                                    Next
                                </a>
                                <script type="text/javascript">
                                    jQuery('.next').click(function() {
                                        var mail_inputs = [];
                                        var mails = $('.mail_fields .mail_inputs').children('input');

                                        for( var mail in mails ){
                                            if( mails[mail] && mails[mail].value && mails[mail].value != ""){
                                                if( !isValidEmailAddress( mails[mail].value ) ) { $(mails[mail]).css('border','1px solid red');$(mails[mail]).focus();return false; }
                                                mail_inputs.push(mails[mail].value);
                                            }
                                            else{
                                                continue;
                                            }
                                        }

                                        $('#sendlane_emails').val( mail_inputs );

                                        function isValidEmailAddress(emailAddress) {
                                            var pattern = new RegExp(/^\S+@\S+\.\S+$/);
                                            return pattern.test(emailAddress);
                                        };

                                        jQuery('form#integration').submit();

                                        return false;
                                    })
                                </script>
                            </div>
                        </div>

                        @if(Request::is('campaigns*'))
                            @include('campaigns.wizard.progress-bars.4-steps', ['percent' => 75])
                        @endif

                        @if(Request::is('widgets*'))
                            @include('campaigns.wizard.progress-bars.3-steps', ['percent' => 66])
                        @endif
                    </div>

                    <div style="overflow: hidden">
                        <br>
                        @include('layouts.alerts.messages')
                    </div>

                    <div class='step-page fields-integration'>
                        <div class='row'>
                            <div class='col-md-5 col-sm-12 col-xs-12 col-md-push-7'>
                                <div class="live_preview">
                                    <div class="row">
                                        @if(isset($widget) && $widget->custom_button_code == '' )
                                            <div class="tab-preview col-md-12 col-sm-6 col-xs-6">
                                                <h5><strong>Tab Preview</strong></h5>
                                                <div class="tab-iframe-cont">
                                                   @if(isset($widget) && $widget->tab_design != '' && $widget->type == 'side-lock' )
                                                        <iframe id="ifrm" style="height: 475px; visibility: visible" class="tabs-iframe" src="/widgets/side-widget-preview/{!! $widget->tab_design !!}?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                                    @elseif(isset($widget) && $widget->tab_design != '' && $widget->type == 'footer-lock' )
                                                        <iframe id="ifrm" style="height: 155px; visibility: visible" class="tabs-iframe" src="/widgets/footer-widget-preview/{!! $widget->tab_design !!}?widget={!! urlencode(json_encode($widget)) !!}" onload="setIframeHeight(this.id)"></iframe>
                                                    @endif
                                                </div>
                                            </div>
                                        @endif
                                        <div class="widget-preview col-md-12 col-sm-6 col-xs-6">
                                            <h5><strong>Widget Preview</strong></h5>
                                            @if(isset($widget) && $widget->widget_design !='' && isset($widgetcustoms))
                                                <iframe id="widget-preview" style="height: 475px; visibility: visible;" class="widgets-iframe" onload="removeScripts(this.id)" src="/widgets/{!! $widget->widget_design !!}/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}&widgetcustoms={!! urlencode(json_encode($widgetcustoms)) !!}"></iframe>
                                            @elseif(isset($widget) && $widget->widget_design !='' && !isset($widgetcustoms))
                                                <iframe id="widget-preview" style="height: 475px; visibility: visible;" class="widgets-iframe" onload="removeScripts(this.id)" src="/widgets/{!! $widget->widget_design !!}/popup-widget-preview/1?widget={!! urlencode(json_encode($widget)) !!}"></iframe>
                                            @else
                                                <iframe id="widget-preview" onload="removeScripts(this.id)" class="widgets-iframe" style="height: 475px; visibility: hidden" src=""></iframe>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>

                            @if(Request::is('campaigns*'))
                                {!! Form::model($widget, ['url' => 'campaigns/'.$campaign->id.'/wizard-integration/'.$widget->id , 'method' => 'post' , 'class' => 'col-md-7 col-sm-12 col-xs-12 col-md-pull-5' , 'id' => 'integration' ]) !!}
                            @endif
                            @if(Request::is('widgets*'))
                                {!! Form::model($widget, ['url' => 'widgets/'.$campaign->id.'/wizard-integration/'.$widget->id , 'method' => 'post' , 'class' => 'col-md-7 col-sm-12 col-xs-12 col-md-pull-5' , 'id' => 'integration' ]) !!}
                            @endif
                                <div class='option-row'>
                                    <div class='option-row-title'>
                                        <label>6. Integration</label>
                                        {!! Form::hidden('provider_type', null, ['id' => 'provider_type']) !!}
                                    </div>
                                    <div class='alert alert-info mt0'>
                                        <p>
                                             You may choose to integrate an autoresponder service to capture customer data by connecting your autoresponder through the Settings ( link to settings area) area. If your autoresponder is not in our list of integrations you may choose the "RawHTML" method and paste in the code your autoresponder provides.
                                        <span class="raw_html_integration_notice">NB: Please note that if you choose this option, use it at your own risk.</span>
                                        </p>
                                        
                                    </div>
                                    <div class='select-type option-row-content select-type-integration'>
                                        <div class='btn-group btn-group-justified'>
                                            <div class='btn-group'>
                                                <button class='btn btn-nav autoresponder_provider @if($widget->provider_type == "autoresponder") active @endif' type='button'>
                                                    <span class='glyphicon glyphicon-envelope'></span>
                                                    <p>Email Integration</p>
                                                </button>
                                            </div>
                                            <div class='btn-group'>
                                                <button class='btn btn-nav raw_html_provider @if($widget->provider_type == "raw-html") active @endif' type='button'>
                                                    <span class='glyphicon glyphicon-edit'></span>
                                                    <p>Raw HTML</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {{-- AUTORESPONDER  --}}
                                    <div class="autoresponder_block" @if($widget->provider_type != "autoresponder") style="display: none;" @endif>
                                        <label class="option-row-title">Choose your email provider</label>
                                        <div class="option-row-content">
                                            <div class="vt-option-setting-container">
                                                <a class="title">
                                                    Choose Provider
                                                </a>
                                                <div class="buttons">
                                                    @if(isset($emailServices))
                                                        {!! Form::select('email_provider', ['' => 'Choose Provider']+$emailServices, null, ['class' => 'form-control choose-provider autoresponder-dropdow']) !!}
                                                    @else
                                                        <div>There are no connected email providers</div>
                                                    @endif
                                                </div>
                                                <hr>
                                                <a class="title">
                                                    Choose List
                                                </a>
                                                <div class="buttons">
                                                    @if(isset($email_provider_values))

                                                        {!! Form::select('email_provider_value', ['' => 'Choose List']+$email_provider_values, null, ['class' => 'form-control choose-list']) !!}
                                                    @else
                                                        {!! Form::select('email_provider_value', ['' => 'Choose List'], null, ['class' => 'form-control choose-list']) !!}
                                                    @endif
                                                </div>
                                                <span id="spanimg" style="display: none; margin-left: 10px;"><img id="loader-img" alt="" src="/assets/img/ajax-loader.gif" width="20" height="20" align="center" /></span>
                                            </div>
                                        </div>
                                    </div>
                                    {{-- END AUTORESPONDER --}}

                                    {{-- RAW HTML --}}
                                    <div class="section-content raw_html_block" @if($widget->provider_type != "raw-html") style="display: none;" @endif >
                                        <div class="panel-body-content ">
                                            <div class="form-group">
                                                <label for="raw_html_textarea" class="option-row-title">Paste Raw HTML code here</label>
                                                <div class="option-row-content no-padding-bottom">
                                                    {!! Form::textarea('raw_html_code', $widget_rowhtml, [ 'class' => 'form-control', 'id' => 'raw_html_textarea', 'rows' => '7']) !!}
                                                    {!! Form::hidden('rawhtml_form_action', null, ['id' => 'rawhtml_form_action'])!!}
                                                    {!! Form::hidden('rawhtml_form_hidden_inputs', null, ['id' => 'rawhtml_form_hidden_inputs'])!!}
                                                    <input type="button" value="Run Raw HTML" class="btn btn-primary" id="rawhtmlbtn" style="margin-top:15px">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {{-- END RAW HTML --}}
                                </div>

                                <div class='option-row form-builder'>
                                    <div class='option-row-title'>
                                        <label>7. Form Builder
                                            <span title='You may choose to enable any of the 3 fields below and make them required or not. If you do not enable any of the fields, the form step on the widget will be bypassed.'><i class="glyphicon glyphicon-question-sign"></i></span>
                                        </label>
                                    </div>
                                    <div class='option-row-content'>
                                        <div class='section-title'>
                                            <div class='col-md-2 col-sm-2 col-xs-2'></div>
                                            <div class='col-md-10 col-sm-10 col-xs-10'>
                                                <div class='row'>
                                                    <div class='col-md-5 col-sm-5 col-xs-5'>
                                                        <p>
                                                            <strong>Enter Placeholder(s)</strong>
                                                        </p>
                                                    </div>
                                                    <div class='col-md-4 col-sm-4 col-xs-4 map-fields' style="display: none">
                                                        <p>
                                                            <strong>Map Fields</strong>
                                                        </p>
                                                    </div>
                                                    <div class='col-md-2 col-sm-2 col-xs-2 required-section'>
                                                        <p>
                                                            <strong>Required</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <section class='form-builder-option'>
                                                <div class='form-group col-md-2 col-sm-2 col-xs-2'>
                                                    {!! Form::checkbox('first_name_field_active' , 1 , null , ['data-toggle' => 'toggle', 'data-size' => 'small', 'class' => 'first_name_field_active', 'id' => 'first_name_field_active'] ) !!}
                                                </div>
                                                <div class='col-md-10 col-sm-10 col-xs-10'>
                                                    <div class='row'>
                                                        <div class='form-group col-md-5 col-sm-5 col-xs-5'>
                                                            {!! Form::text('first_name_field_key' , null, [ 'class' => 'form-control', 'placeholder' => 'Full Name', ($widget->first_name_field_active)?'enabled':'disabled', 'id' => 'first_name_field_key']) !!}
                                                        </div>
                                                        <div class='form-group col-md-4 col-sm-4 col-xs-4 map-fields' style="display: none">
                                                            {!! Form::select('first_name_field_value', ['' => 'Choose List',  $widget->first_name_field_value => $widget->first_name_field_value], null, ['class' => 'form-control', 'id' => 'first_name_field_value']) !!}
                                                        </div>
                                                        <div class='checkbox col-md-2 col-sm-2 col-xs-2'>
                                                            {!! Form::checkbox('first_name_field_required', 1, false,['data-toggle' => 'toggle', 'data-size' => 'small']) !!}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <section class='form-builder-option'>
                                                <div class='form-group col-md-2 col-sm-2 col-xs-2 hide'>
                                                    {!! Form::checkbox('email_field_active' , 1 , null , [ 'data-toggle' => 'toggle', 'data-size' => 'small', 'class' => 'email_field_active'] ) !!}
                                                </div>
                                                <div class='col-md-10 col-sm-10 col-xs-10 pull-right'>
                                                    <div class='row'>
                                                        <div class='form-group col-md-5 col-sm-5 col-xs-5'>
                                                            {!! Form::text('email_field_key' , null, [ 'class' => 'form-control', 'placeholder' => 'Email Address', ($widget->first_name_field_active)?'enabled':'disabled', 'id' => 'email_field_key']) !!}
                                                        </div>
                                                        <div class='form-group col-md-4 col-sm-4 col-xs-4 map-fields' style="display: none">
                                                            {!! Form::select('email_field_value', ['' => 'Choose List', $widget->email_field_value => $widget->email_field_value], null, ['class' => 'form-control', 'id' => 'email_field_value']) !!}
                                                        </div>
                                                        <div class='checkbox checkbox col-md-2 col-sm-2 col-xs-2'>
                                                            {!! Form::checkbox('email_field_required', 1, false, ['data-toggle' => 'toggle', 'data-size' => 'small']) !!}
                                                        </div>
                                                    </div><br>
                                                </div>
                                            </section>

                                            <section class='form-builder-option'>
                                                <div class='form-group col-md-2 col-sm-2 col-xs-2'>
                                                    {!! Form::checkbox('phone_field_active' , 1 , true , ['data-toggle' => 'toggle', 'data-size' => 'small', 'class' => 'phone_field_active', 'id' => 'phone_field_active'] ) !!}
                                                </div>
                                                <div class='col-md-10 col-sm-10 col-xs-10'>
                                                    <div class='row'>
                                                        <div class='form-group col-md-5 col-sm-5 col-xs-5'>
                                                            {!! Form::text('phone_field_key' , null, [ 'class' => 'form-control', 'placeholder' => 'Phone Number', ($widget->phone_field_active)?'enabled':'disabled', 'id' => 'phone_field_key']) !!}
                                                        </div>
                                                        <div class='form-group col-md-4 col-sm-4 col-xs-4 map-fields' style="display: none">
                                                            {!! Form::select('phone_field_value', ['' => 'Choose List', $widget->phone_field_value => $widget->phone_field_value], null, ['class' => 'form-control', 'id' => 'phone_field_value']) !!}
                                                        </div>
                                                        <div class='checkbox col-md-2 col-sm-2 col-xs-2'>
                                                            {!! Form::checkbox('phone_field_required', 1, false, ['data-toggle' => 'toggle', 'data-size' => 'small']) !!}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section class='form-builder-option'>
                                               <div class='form-group col-md-2 col-sm-2 col-xs-2 hide'>
                                                    {!! Form::checkbox('url_field_active' , 1 , null , [ 'data-toggle' => 'toggle', 'data-size' => 'small', 'class' => 'email_field_active'] ) !!}
                                                </div>
                                                <div class='col-md-10 col-sm-10 col-xs-10 pull-right'>
                                                    <div class='row'>
                                                        <div class='form-group col-md-5 col-sm-5 col-xs-5'>
                                                            {!! Form::text('url_field_key' , null, [ 'class' => 'form-control', 'placeholder' => 'Thank your page url',  'id' => 'url_field_key']) !!}
                                                        </div>
                                                        <div class='form-group col-md-4 col-sm-4 col-xs-4 map-fields' style="display: none">
                                                            {!! Form::select('url_field_value', ['' => 'Choose List', $widget->url_field_value => $widget->url_field_value], null, ['class' => 'form-control', 'id' => 'url_field_value']) !!}
                                                        </div>
                                                        <div class='checkbox col-md-2 col-sm-2 col-xs-2'>
                                                            {!! Form::checkbox('url_field_required', 1, false, ['data-toggle' => 'toggle', 'data-size' => 'small']) !!}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>


                                        </div>
                                    </div>
                                </div>

                                <div class='option-row'>
                                    <div class='option-row-title'>
                                        <label>8. Other Settings</label>
                                    </div>
                                    <div class='option-row-content'>
                                        <div class='setting-tab-scheme-cont'>
                                            <div class='vt-option-setting-container'>
                                                <a class='title'>
                                                    Choose SMS Platform
                                                </a>
                                                <div class='buttons'>
                                                    {!! Form::checkbox('sms_notification' , 1 , true , ['class' => 'notification', 'data-toggle' => 'toggle', 'data-size' => 'small', 'data-off' => 'No', 'data-on' => 'Yes'] ) !!}
                                                </div>
                                                <hr>
                                                <a class='title hideSMS'>
                                                    SMS Integration
                                                </a>
                                                <div class='buttons hideSMS'>
                                                    {!! Form::select('sms_provider', (count($smsServices) == 1)?$smsServices:['' => 'Select Provider']+$smsServices, null, ['class' => 'form-control sms_service']) !!}
                                                </div>
                                                <hr>
                                                <a class='title hideSMS'>
                                                    Phone number
                                                </a>
                                                <span class="hideSMS" title="Enter the phone number provided by your SMS service.">
                                                    <i class="glyphicon glyphicon-question-sign" ></i>
                                                </span>
                                                <div class='phone_number hideSMS'>
                                                    {!! Form::text('sender_phone', null, ['class' => 'form-control sender_phone']) !!}
                                                </div>
                                            </div>
                                            <div class='vt-option-setting-container'>
                                                <a class='title'>
                                                    Notification Email
                                                </a>
                                                <span title="You may receive an email to the address provided each time a message is submitted to you.">
                                                    <i class="glyphicon glyphicon-question-sign" ></i>
                                                </span>
                                                <div class='buttons'>
                                                    {!! Form::checkbox('send_email', 1, false, [ 'class' => 'send_email', 'id' => 'send_email', 'data-toggle' => 'toggle', 'data-size' => 'small', 'data-off' => 'No', 'data-on' => 'Yes'] ) !!}
                                                </div>
                                                <hr class="mail_hr">
                                                <div class="mail_fields">
                                                        @if(isset($widget->sendlane_emails) && $widget->sendlane_emails != "")
                                                            <div class='col-md-8 mail_inputs'>
                                                                {!! Form::text( 'mail_field', json_decode($widget->sendlane_emails)[0], ['required','class' => 'form-control email_input', 'placeholder' => 'Enter Your Email']) !!}
                                                            </div>
                                                            @for ($i = 1; $i < count(json_decode($widget->sendlane_emails)); $i++)
                                                                <div class='col-md-8 mail_inputs'>
                                                                    {!! Form::text( 'mail_field', json_decode($widget->sendlane_emails)[$i], ['required', 'style' => 'width:87%;float:left', 'class' => 'form-control email_input', 'placeholder' => 'Enter Your Email', 'onkeyup' => 'valid( this )']) !!}
                                                                    <span id='delete_field' style='float:right' onclick='delete_field(this)' class='btn btn-default'><i class='glyphicon glyphicon-minus'></i></span>
                                                                </div>
                                                            @endfor

                                                        @else
                                                            <div class='col-md-8 mail_inputs'>
                                                                {!! Form::text( 'mail_field', null, ['class' => 'form-control ', 'placeholder' => 'Enter Your Email']) !!}
                                                            </div>
                                                        @endif
                                                        <span id="add_field_for_email" @if(isset($widget) && $widget->send_email)style="display:inline-block;" @else style="display:none" @endif class="btn btn-default"><i class="glyphicon glyphicon-plus"></i></span>

                                                    <input type="hidden" id="sendlane_emails" name="sendlane_emails">
                                                </div>
                                            </div>
                                            <div class='vt-option-setting-container'>
                                                <a class='title'>
                                                    Support Email Address
                                                </a>
                                                <span title="You must enter a support email address for your users to contact if they choose to be removed from recieving text/phone messages from you. If you have a HelpDesk associated with this email, it will create a HelpDesk ticket for you">
                                                    <i class="glyphicon glyphicon-question-sign" ></i>
                                                </span>
                                                <div class='buttons'>
                                                    {!! Form::checkbox('create_ticket' , 1 , true , [ 'data-toggle' => 'toggle', 'class' => 'create_ticket', 'data-size' => 'small', 'data-off' => 'No', 'data-on' => 'Yes'] ) !!}
                                                </div>
                                                <div @if(!$widget->create_ticket) style="display:none" @endif class="helpdesk">
                                                    <hr>
                                                    <a class='title'>
                                                        Helpdesk Integration
                                                    </a>
                                                    <div class='buttons'>
                                                        {!! Form::email( 'helpdesk_email', null, [ 'id' => 'helpdesk_email' ,'class' => 'form-control other-settings-input helpdesk_email', 'placeholder' => 'Enter Support Desk Email Address...']) !!}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        var count=0;

        $("#add_field_for_email").click(function() {
            count = $(".mail_fields .mail_inputs").length;
            $(".mail_fields").append("<div class='col-md-8 mail_inputs'><input type='email' style='width:87%;float:left' onkeyup='valid( this )' required placeholder='Enter Your Email' class='form-control other-settings-input'> <span id='delete_field' style='float:right' onclick='delete_field(this)' class='btn btn-default'><i class='glyphicon glyphicon-minus'></i></span></div>")
        })

        var delete_field = function ( element ) {
            $(element).parent().children('.form-control').val('');
            $(element).parent().hide();

        }

        var valid = function( element ) {
            if( !isValidEmailAddress( element.value ) ) {
                $(element).addClass('not-valid-email');element.focus();
            }
            else{
                $(element).removeClass('not-valid-email');
            }
        }

        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(/^\S+@\S+\.\S+$/);
            return pattern.test(emailAddress);
        };
    </script>
@endsection