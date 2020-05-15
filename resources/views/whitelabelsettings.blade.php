@extends('layouts.layout')

@section('title') White Label Options @stop

@section('content')

<link href="/assets/css/bootstrap3-wysihtml5.min.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.3/css/bootstrap-colorpicker.min.css">
<link rel="stylesheet" type="text/css" href="/assets/css/bootstrap-theme.min.css">

<form id="whitelabelform" action="{!!url('/whitelabel/update')!!}" method="POST" role="form" enctype="multipart/form-data">
        <div class="vt-page-header">
            <div class="vt-page-title">
                <h3>
                    <i class="glyphicon glyphicon-user"></i>
                    White Label Settings
                </h3>
            </div>
            
        </div>

        <div class="vt-page">
            <div class="vt-default-page account-page">
                <div class="vt-settings-container">
                    <div class="error-container col-md-12">
                        @include('layouts.alerts.messages')
                    </div>

                    <input type="hidden" name="_method" value="PUT">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">

                    <div class="avatar-upload-container col-md-12">
                        <div class="input">
                            <label for="">Company Logo <small>(recommended size: 150x50)</small></label>
                            <div class="input-group" id="button_input_container">
                                <span class="input-group-btn">
                                    <span class="btn btn-primary btn-file">
                                        Browse&hellip; <input type="file" id="company_logo" name="company_logo" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->company_logo)) ? $white_label_options->company_logo : 'assets/img/voiceStackLogo.png' }}">
                                    </span>
                                </span>
                                <input id="avatarImgName" type="text" class="form-control" readonly>
                                <span style="{{ ((null !== $white_label_options) && (null !== $white_label_options->company_logo)) ? '' : 'display: none' }}" id="removeAvatarImg" class="input-group-addon btn btn-default">x</span>
                            </div>
                        </div>
                        <div class="img-avatar" id="wl-imgLogo">
                          <img id="avatarImg" src="{{ ((null !== $white_label_options) && (null !== $white_label_options->company_logo)) ? $white_label_options->company_logo : 'assets/img/voiceStackLogo.png' }}" class="img-responsive" >
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="">Company Name*</label>
                        <input name="company_name" type="text" class="form-control" id="" placeholder="Enter the company name" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->company_name)) ? $white_label_options->company_name : old('company_name')}}">
                    </div>
                    <div class="form-group">
                        <label for="">Support Link*</label>
                        <p>Format: http://domain.com</p>
                        <input name="support_link" type="text" class="form-control" id="" placeholder="Enter the company support link" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->support_link)) ? $white_label_options->support_link : old('support_link')}}">
                    </div>    
                    <div class="form-group">
                        <label for="">White Label App Domain (CNAME URL)</label>
                        <p>Format: domain.com</p>
                        <input name="cname_url" type="text" class="form-control" id="cname_url" placeholder="Enter the white label url" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->cname_url)) ? $white_label_options->cname_url : old('cname_url')}}">
                    </div>                     
                    <div class="form-group">
                        <label for="">Contact Person*</label>
                        <input name="contact_person" type="text" class="form-control" id="" placeholder="Enter the contact person's name" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->contact_person)) ? $white_label_options->contact_person : old('contact_person')}}">
                    </div>                    
                    <div class="form-group">
                        <label for="">Contact Email*</label>
                        <input name="contact_email" type="text" class="form-control" id="" placeholder="Enter your email" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->contact_email)) ? $white_label_options->contact_email : old('contact_email')}}">
                    </div>
                    
                    
                    <div class="form-group">
                        
                        <label for="">Premium Upgrade URL</label>
                        <input name="premium_upgrade_url" type="text" class="form-control" id="" placeholder="Premium Upgrade URL" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->premium_upgrade_url)) ? $white_label_options->premium_upgrade_url : old('premium_upgrade_url')}}">
                    
                    </div>
                    

                    <div class="form-group">
                        <div class='vt-option-setting-container'>
                            <a class='title'>
                                {!! Form::input('color', ((null !== $white_label_options) && (null !== $white_label_options->top_bar_color)) ? $white_label_options->top_bar_color : old('top_bar_color'), null, array('class' => 'widget-color') ) !!}
                                {!! Form::text('top_bar_color', ((null !== $white_label_options) && (null !== $white_label_options->top_bar_color)) ? $white_label_options->top_bar_color : old('top_bar_color'), array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                Top Bar Color
                            </a>
                            <div class='buttons'>
                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                            </div>
                        </div>                        
                    </div>
                    
                    
                    <div class="form-group">
                        <div class='vt-option-setting-container'>
                            <a class='title'>
                                {!! Form::input('color', ((null !== $white_label_options) && (null !== $white_label_options->header_bar_color)) ? $white_label_options->header_bar_color : old('header_bar_color'), null, array('class' => 'widget-color') ) !!}
                                {!! Form::text('header_bar_color', ((null !== $white_label_options) && (null !== $white_label_options->header_bar_color)) ? $white_label_options->header_bar_color : old('header_bar_color'), array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                Header Bar Color
                            </a>
                            <div class='buttons'>
                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                            </div>
                        </div>                        
                    </div>  
                    
                    
                    <div class="form-group">
                        <div class='vt-option-setting-container'>
                            <a class='title'>
                                {!! Form::input('color', ((null !== $white_label_options) && (null !== $white_label_options->background_color)) ? $white_label_options->background_color : old('background_color'), null, array('class' => 'widget-color') ) !!}
                                {!! Form::text('background_color', ((null !== $white_label_options) && (null !== $white_label_options->background_color)) ? $white_label_options->background_color : old('background_color'), array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                Background Color
                            </a>
                            <div class='buttons'>
                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                            </div>
                        </div>                        
                    </div> 
                    
                    
                    <div class="form-group">
                        <div class='vt-option-setting-container'>
                            <a class='title'>
                                {!! Form::input('color', ((null !== $white_label_options) && (null !== $white_label_options->button_color)) ? $white_label_options->button_color : old('button_color'), null, array('class' => 'widget-color') ) !!}
                                {!! Form::text('button_color', ((null !== $white_label_options) && (null !== $white_label_options->button_color)) ? $white_label_options->button_color : old('button_color'), array('class' => 'form-control color-input widget-color-input hide') ) !!}
                                Button Color
                            </a>
                            <div class='buttons'>
                                <a class='btn btn-primary change_tab_color_btn' role='button'>Change Color</a>
                            </div>
                        </div>                        
                    </div> 
                    
                    <hr>
                    
                    <p><h3>SMTP Settings</h3></p>
                    
                        <div class="form-group">

                            <label for="">Configure SMTP?</label>

                            <select name="configure_smtp" id="smtp_active" class="form-control">
                              <option value="0" {{ ((null !== $white_label_options) && ($white_label_options->configure_smtp == 0)) ? 'selected' : ''}}>No</option>
                              <option value="1" {{ ((null !== $white_label_options) && ($white_label_options->configure_smtp == 1)) ? 'selected' : ''}}>Yes</option>
                            </select> 

                        </div>  
                
                    <div id="smtp_settings" class="collapse">

                        <div class="form-group">
                            <label for="">SMTP Host URL</label>
                            <input name="smtp_host" type="text" class="form-control" id="smtp_host" placeholder="SMTP Host URL" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->smtp_host)) ? $white_label_options->smtp_host : old('smtp_host')}}">
                        </div> 

                        <div class="form-group">
                            <label for="">SMTP Port</label>
                            <input name="smtp_port" type="text" class="form-control" id="smtp_port" placeholder="SMTP Port" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->smtp_port)) ? $white_label_options->smtp_port : old('smtp_port')}}">
                        </div>                     

                        <div class="form-group">

                            <label for="">SMTP Protocol</label>

                            <select name="smtp_protocol" id="smtp_protocol" class="form-control">
                              <option value="">NONE</option>
                              <option value="tls" selected="selected">TLS</option>
                              <option value="ssl">SSL</option>
                            </select> 

                        </div>                        

                        <div class="form-group">
                            <label for="">SMTP Username</label>
                            <input name="smtp_username" type="text" class="form-control" id="smtp_username" placeholder="SMTP Username" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->smtp_username)) ? $white_label_options->smtp_username : old('smtp_username')}}">
                        </div> 

                        <div class="form-group">
                            <label for="">SMTP Password</label>
                            <input name="smtp_password" type="text" class="form-control" id="smtp_password" placeholder="SMTP Password" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->smtp_password)) ? $white_label_options->smtp_password : old('smtp_password')}}">
                        </div>                     


                        <div class="form-group">
                            <label for="">From Name</label>
                            <input name="smtp_from_name" type="text" class="form-control" id="smtp_from_name" placeholder="From Name" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->smtp_from_name)) ? $white_label_options->smtp_from_name : old('smtp_from_name')}}">
                        </div>    

                        <div class="form-group">
                            <label for="">From Email</label>
                            <input name="smtp_from_email" type="text" class="form-control" id="smtp_from_email" placeholder="From Email" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->smtp_from_email)) ? $white_label_options->smtp_from_email : old('smtp_from_email')}}">
                        </div> 

                        <hr>

                        <button type="button" id="test_smtp" class="btn btn-primary">Save & Test SMTP</button>
                    </div>
                
                    <p><h3>Email Settings</h3></p>
                
                    <div class="form-group">

                        <label for="">Re-brand Email Templates?</label>

                        <select name="configure_email_templates" id="configure_email_templates" class="form-control">
                          <option value="0" {{ ((null !== $white_label_options) && ($white_label_options->configure_email_templates == 0)) ? 'selected' : ''}}>No</option>
                          <option value="1" {{ ((null !== $white_label_options) && ($white_label_options->configure_email_templates == 1)) ? 'selected' : ''}}>Yes</option>
                        </select> 

                    </div> 
                
                    <div id='wl_email_templates_settings' class="collapse">
                        
                        <div class="form-group">
                            <label for="">Audio Message Notification Email Subject</label>
                            <input name="wl_audio_email_subject" type="text" class="form-control" id="wl_audio_email_subject" placeholder="You Have A New Audio Message!" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->wl_audio_email_subject)) ? $white_label_options->wl_audio_email_subject: old('wl_audio_email_subject')}} ">
                        </div>                        
                        
                        <div class="form-group">
                          <label for="">Audio Message Notification Email</label>
                          <textarea name="wl_audio_email" class="form-control textarea" rows="16">
                             {{ ((null !== $white_label_options) && (null !== $white_label_options->wl_audio_email)) ? $white_label_options->wl_audio_email: old('wl_audio_email')}} 
                          </textarea>
                        </div>
                        
                        
                        <div class="form-group">
                            <label for="">Video Message Notification Email Subject</label>
                            <input name="wl_video_email_subject" type="text" class="form-control" id="wl_video_email_subject" placeholder="You Have A New Video Message!" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->wl_video_email_subject)) ? $white_label_options->wl_video_email_subject: old('wl_audio_video_subject')}} ">
                        </div>                          
                        
                        <div class="form-group">
                          <label for="">Video Message Notification Email</label>
                          
                          <textarea name="wl_video_email" class="form-control textarea" rows="16">
                              {{ ((null !== $white_label_options) && (null !== $white_label_options->wl_video_email)) ? $white_label_options->wl_video_email: old('wl_video_email')}} 
                          </textarea>
                          
                        </div>
                        
                        <div class="form-group">
                            <label for="">Welcome Message Notification Email Subject</label>
                            <input name="wl_welcome_email_subject" type="text" class="form-control" id="wl_welcome_email_subject" placeholder="Welcome To {companyName}" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->wl_welcome_email_subject)) ? $white_label_options->wl_welcome_email_subject: old('wl_welcome_email_subject')}} ">
                        </div>                         
                        
                        <div class="form-group">
                          <label for="">Welcome Message Notification Email</label>
                          
                          <textarea name="wl_welcome_email" class="form-control textarea" rows="16">
                              {{ ((null !== $white_label_options) && (null !== $white_label_options->wl_welcome_email)) ? $white_label_options->wl_welcome_email: old('wl_welcome_email')}} 
                          </textarea>
                          
                        </div> 
                        
                        <div class="form-group">
                          <label for="">Paykickstart API Key</label>
                            <input name="wl_pk_key" type="text" class="form-control" id="wl_pk_key" placeholder="Paykickstart API Key" value="{{ ((null !== $white_label_options) && (null !== $white_label_options->wl_pk_key)) ? $white_label_options->wl_pk_key: old('wl_pk_key')}} ">
                        </div>                        

                    </div>
                
                    <hr>
                    
                    <button type="submit" class="btn btn-danger">Save Changes</button>
                    <button type="button" class="btn btn-primary" id="reset-button">Reset Default</button>
                    
                </div>
            </div>
        </div>
    </form>
@stop


@section('scripts')


<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.3/js/bootstrap-colorpicker.min.js"></script>
<script src="/assets/js/wysihtml5x-toolbar.min.js" type="text/javascript"></script>
<script src="/assets/js/handlebars.runtime.min.js" type="text/javascript"></script>
<script src="/assets/js/bootstrap3-wysihtml5.min.js" type="text/javascript"></script>

    <script type="text/javascript">
        /* --------- avatar scripts --------- */


        $(document).ready( function() {
            
            $('.textarea').wysihtml5();
            
            $(document).on('change', '.btn-file :file', function() {
                var input = $(this),
                    label = input.val().replace(/\\/g, '/').replace(/.*\//, ''),
                    path  = input.val();
                    input.trigger('fileselect', [ label, path ]);
                    readURL(this);
                    $('#removeAvatarImg').show();
            });            
            
                $(function() {
                    $('.wlcolors').colorpicker();
                });
            
            $('.btn-file :file').on('fileselect', function( event, label, path ) {
                var input = $(this).parents('.input-group').find(':text').val( label );
                $('#avatarImg').attr('src', path );
            });

            $('#removeAvatarImg').click(function(event) {
                $('#avatarImg').attr('src', '/assets/img/default_avatar.jpg' );
                $('.btn-file :file').val('');
                $('#avatarImgName').val('');
                $('#removeAvatarImg').hide();
            });
            
 
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('#avatarImg').attr('src', e.target.result);
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }           
            
            $('#reset-button').click(function(event) {
                
                var r = confirm('Are You Sure?');
                
                if(r) {
                
                    $(this).closest('form').find("#button_color, #background_color, #header_bar_color, #top_bar_color, #company_logo").val("");

                    $(this).closest('form').find("#delete").val("1");

                    $( "#whitelabelform" ).submit();    
                    
                } 

            });  
            
            
            $('#test_smtp').on('click', function (e) {
                e.preventDefault();
                var smtpData = {
                    smtp_host: $('input[name=smtp_host]').val(),
                    smtp_port: $('input[name=smtp_port]').val(),
                    smtp_protocol: $('select#smtp_protocol option:selected').val(),
                    smtp_username: $('input[name=smtp_username]').val(),
                    smtp_password: $('input[name=smtp_password]').val(),
                    smtp_from_name: $('input[name=smtp_from_name]').val(),
                    smtp_from_email: $('input[name=smtp_from_email]').val(),
                }
                $.ajax({
                    type: "post",
                    url: "/whitelabel/testsmtp",
                    dataType: 'json',
                    data: smtpData,
                    success: function (data) {
                        
                        alert(data.message);

                    }
                });
            });            
            
            if($( "#smtp_active option:selected" ).val() == 1) {
                
                $( "#smtp_settings" ).addClass( 'show' ); 
                
            }
  
            $( "#smtp_active" ).change(function() {

                $( "#smtp_settings" ).toggleClass( 'show' ); 

            });       
            
            if($( "#configure_email_templates option:selected" ).val() == 1) {
                
                $( "#wl_email_templates_settings" ).addClass( 'show' ); 
                
            }
  
            $( "#configure_email_templates" ).change(function() {

                $( "#wl_email_templates_settings" ).toggleClass( 'show' ); 

            });             
            
            
        });
        

    </script>
@stop