<div style="display: none;" class="display_div d2" id="ar_form">
        @if( (isset($widget) && isset($widget->phone_field_active) && $widget->phone_field_active == 1) || (isset($widget) && isset($widget->email_field_active) && $widget->email_field_active == 1) ||(isset($widget) && !empty($widget->rawhtml_form_action)) || (isset($widget) && !empty($widget->email_provider) && !empty($widget->email_provider_value)) )
            @if( !(isset($widget) && !empty($widget->rawhtml_form_action) ) && !( isset($widget) && !empty($widget->email_provider) && !empty($widget->email_provider_value) ) )
                <form method="post" class="video_form video_form_phone" id="video_form" enctype="multipart/form-data">
            @elseif( isset($widget) && !empty($widget->email_provider) && !empty($widget->email_provider_value) )
                <form action="{!! url('settings/create-subscriber',[$widget->user_id, $widget->email_provider, $widget->email_provider_value]) !!}" method="post" class="video_form" >
            @else
                <form action="{!! url('settings/create-row-subscriber') !!}" method="post" class="video_form raw_video_form" enctype="multipart/form-data">
                @if(!empty($widget->rawhtml_form_hidden_inputs))
                    @foreach (json_decode($widget->rawhtml_form_hidden_inputs) as $name  => $value)
                        <input type="hidden" name="{!! $name !!}" value="{!! $value !!}" >
                    @endforeach
                @endif
            @endif
        @else
            <form method="post">
        @endif

        <div id="popup17" class="lightbox video_subscribe_popup" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
            <section class="popup popup-six popup-video popup17">
                <h2 class="border" @if(isset($widget)) style="background-color: {!! $widget->widget_main_headline_bg_color !!} ; border-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_main_headline_color !!}" @endif>
             @if(isset($widget) && isset($widget->widget_video_headline) && $widget->widget_video_headline != '')
                {!! $widget->widget_video_headline !!}
                @else
                Send Us a Video Message
                @endif
            </h2>
                <strong class="sub-title" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                    @if(isset($widget) && isset($widget->five1) && $widget->five1 != '')
                                {!! $widget->five1 !!}
                                @else
                    Enter your information below to ensure<br> we receive your message
                    @endif
                </strong>
                <div class="popup-frame">
                    <fieldset>
                        <div class="input-field">
                            <input type="hidden" name="file_type" value="video">
                            <input type="hidden" name="file_name" id="video_file_name">
                            <input type="hidden" name="duration" id="video_duration">
                            <input type="hidden" name="token" class="video_token" id="video_token">
                            <input type="hidden" name="is_complete" value="1">
                            <input type="hidden" name="id" class="id"> 
                            @include('widgets.templates.popups.form.form_inputs')
                        </div>
                        <p @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                            @if(isset($widget) && isset($widget->five2) && $widget->five2 != '')
                                        {!! $widget->five2 !!}
                                        @else
                                        By sending this message, I give permission to view, reply to,<br> download and share my message
                                        @endif
                        </p>
                        <div class="btn-holder">
                            @if((isset($widget) && isset($widget->phone_field_active) && $widget->phone_field_active == 0) && ( (isset($widget) && !empty($widget->rawhtml_form_action)) || (isset($widget) && !empty($widget->email_provider) && !empty($widget->email_provider_value)) ))
                                <button type="submit" class="btn-send" id="validate_inputs_video"><span @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>
                            @if(isset($widget) && isset($widget->five3) && $widget->five3 != '')
                                          {!! $widget->five3 !!}
                                          @else  
                                          Send
                                          @endif
                            </span></button>
                            @elseif((isset($widget) && isset($widget->phone_field_active) && $widget->phone_field_active == 1) && (isset($widget->country_code) && $widget->country_code == "US"))
                                <button type="button" class="btn-send dsgn2s11 video-send-phone" id="validate_inputs_video"><span @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>
                                    @if(isset($widget) && isset($widget->five3) && $widget->five3 != '')
                                          {!! $widget->five3 !!}
                                          @else  
                                          Send
                                          @endif
                                </span></button>
                            @else
                                <a href="javascript:void(0)" class="btn-send dsgn2s11 send_video_message" id="send-video" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>
                                    @if(isset($widget) && isset($widget->five3) && $widget->five3 != '')
                                          {!! $widget->five3 !!}
                                          @else  
                                          Send
                                          @endif
                                </a>
                            @endif
                            <button class="restart_btn" type="button"><span>
                                @if(isset($widget) && isset($widget->five4) && $widget->five4 != '')
                                          {!! $widget->five4 !!}
                                          @else  
                                          Send
                                          @endif
                            </span></button>
                        </div>
                    </fieldset>

                    @if(isset($widget) && $widget->privacy_policy_url != '')
                        <br/>
                        <strong class="privacy-policy"><a href="{{ $widget->privacy_policy_url }}" target="_blank" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Privacy Policy</a></strong>
                    @endif
                </div>
                @if(isset($widget->remove_powered_by) && $widget->remove_powered_by == 0)
                    <div id="powered-by">
                        <strong class="powered-by" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Powered by <a href="http://voicestak.com" target="_blank" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif>VoiceStak</a></strong>
                    </div>
                @endif
            </section>
        </div>

        <div class="consent_page @if((isset($widget->phone_field_active) && $widget->phone_field_active == 0) || (isset($widget->country_code) && $widget->country_code != 'US')) hide @endif" style="display: none">
            <h4><center>Consent For Autodialed & Pre-Recorded Phone Calls & Text Messages</center></h4>
            <div class="btn-holder btn-holder-consent">
                <ul style="list-style-type:square">
                    <li>
                        <p>By clicking on the I CONSENT button below, I give my consent to receive autodialed and/or pre-recorded phone calls and text messages for telemarketing calls only to the telephone number that I wrote in previous step.</p>
                    </li>
                    <li>
                        <p>
                            I understand that my consent does not obligate me to purchase any property, product, or service.
                        </p>
                    </li>
                    <li>
                        <p>
                            I understand that I may revoke my consent at any time by sending a request to @if(isset($widget->helpdesk_email)) {{$widget->helpdesk_email}} @endif.
                        </p>
                    </li>
                    <li>
                        <p>
                            By clicking on the CONSENT button below, I also give my consent for the unrestricted use of any testimonial I may provide in my messages.
                        </p>
                    </li>
                    <li>
                        <p>
                            I intend for my consent to be construed as a consent given “in writing” under the federal E-SIGN ACT.
                        </p>
                    </li>
                </ul>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="consent" id="consentCheckbox">I Consent
                    </label>
                </div>
                <button type="submit" id="finish_video" @if(isset($widget)) style="background: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif><span>Finish</span></button>
            </div>
        </div>
    </form>

    <script>
        (function($) {
            $( document ).ready(function() {
                $('.restart_btn').on('click', function() {
                    if($('.check_domain').val() === 'true') {
                        $.get('/messages/delete-video?name='+localStorage.fileName);
                    }
                })

                $('.video-send-phone').click(function() {
                    $('.video_form_phone').prop('action', '/messages/update-message/'+localStorage.id);
                });

                $('#validate_inputs_video').on("click", function(e) {
                    e.preventDefault();
                     $('.video_token').val(localStorage.token);
                     $('#video_file_name').val(localStorage.fileName);
                    $('.id').val(localStorage.id);
                     var dataStr = $(this).closest('form').serialize();
                        $.post( $(this).closest('form').attr('action') , dataStr, function(res){
                            let result = JSON.parse(res);
                            console.log(result);
                            if(result && result.redirect_url != undefined && result.redirect_url != null && result.redirect_url != '')
                                window.top.location.href = result.redirect_url;
                            else
                                console.log('NO Thank You URL found');
                        });
                });

                if ($('.video-send-phone').length === 0) {
                    $('#validate_inputs_video').on("click", function() {
                        $('body').append('<center style="margin-top: 40% !important;"><span id="sendLoader"><img src="/assets/img/send-loader.gif"></span></center>');
                    });
                }  else {
                    $('#finish_video').on("click", function() {
                        $('.consent_page').hide();
                        $('body').append('<center style="margin-top: 40% !important;"><span id="sendLoader"><img src="/assets/img/send-loader.gif"></span></center>');
                    });
                }

                    $('.send_video_message').on('click', function() {
   
                        if($('#video_data_form').is(":visible")){
                            
                            $('.id').val(localStorage.id);
                            $('#os_and_version').val( window.jscd.os + ' ' + window.jscd.osVersion );
                            $('#screen_size').val( window.jscd.screen );
                            $('#browser_and_version').val( window.jscd.browser + ' ' + window.jscd.browserVersion );
                            $('#mobile').val( window.jscd.mobile ); 
                            $('.video_token').val(localStorage.token);
                            $('.video_duration').val(localStorage.message_length);                                

                            $('#video_data_form').attr('action', '/messages/update-message/'+localStorage.id);

                        } else {
                            $('.id').val(localStorage.id);
                            $('#os_and_version').val( window.jscd.os + ' ' + window.jscd.osVersion );
                            $('#screen_size').val( window.jscd.screen );
                            $('#browser_and_version').val( window.jscd.browser + ' ' + window.jscd.browserVersion );
                            $('#mobile').val( window.jscd.mobile );
                            $('.video_token').val(localStorage.token);
                            $('.video_duration').val(localStorage.message_length);

                            $('#video_form').attr('action', '/messages/update-message/'+localStorage.id);
                        }
                         

                var dataStr = $(this).closest('form').serialize();
                        $.post( $(this).closest('form').attr('action') , dataStr, function(res){
                            let result = JSON.parse(res);
                            console.log(result);
                            if(result && result.redirect_url != undefined && result.redirect_url != null && result.redirect_url != '')
                                window.top.location.href = result.redirect_url;
                            else
                                console.log('NO Thank You URL found');
                        });

                        if($('.video_form').length !=0){

                            if($('#ar_form').is(":visible")){
                                $('#ar_form').hide();
                                console.log('d2 s11 L148');
                                $('.display_div').hide();
                                console.log('d2 s11 L150');
                                $('.thankyou-page').show();   
                                console.log('d2 s11 L152');
                            } else {
                               $('.display_div').hide();
                               console.log('d2 s11 L155');
                               $('#ar_form').show(); 
                               console.log('d2 s11 L157');
                            }

                        } else {
                            
                            jQuery('.display_div').hide();
                            jQuery('.thankyou-page').show();
                            console.log('d2 s11 L164');
                            
                        }

                    });  
            });
        })(jQuery)
    </script>
</div>
