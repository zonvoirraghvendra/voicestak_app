<div style="display: none;" class="display_div d1 step_10">
    <div id="popup10" class="lightbox" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
        <section class="popup popup-five popup10">
            <h2 class="video add" @if(isset($widget)) style="background-color: {!! $widget->widget_main_headline_bg_color !!} ; border-color: {!! $widget->widget_main_headline_bg_color !!} ; color: {!! $widget->widget_main_headline_color !!}" @endif>
                @if(isset($widget) && isset($widget->widget_video_headline) && $widget->widget_video_headline != '')
                {!! $widget->widget_video_headline !!}
                @else
                Send Us a Video Message
                @endif
            </h2>
            <div>
                <h4 id="done-processing-heading">
                    @if(isset($widget) && isset($widget->seven1) && $widget->seven1 != '')
                    {!! $widget->seven1 !!}
                    @else
                Your video is processing, it may take up to 60 seconds to load preview</h4>
                @endif
            </div>
            <div>
                <span id="videospanimg" style="display: none; margin-left: 10px;"><img id="loader-img" alt="" src="/assets/img/loader.gif" width="20" height="20" align="center" /></span>
            </div>
            @if($ios)

            @elseif(strpos(strtolower($_SERVER["HTTP_USER_AGENT"]),strtolower("FIREFOX")) || strpos(strtolower($_SERVER["HTTP_USER_AGENT"]),strtolower("CHROME")) || strpos(strtolower($_SERVER["HTTP_USER_AGENT"]),strtolower("Presto")))
            <div class="recording-box"><video id="video_watch" playsinline style="width: 400px !important; height: 300px !important;"></video></div>
            @else
            <div class="recording-box"><video type="video/mp4" id="video_watch" playsinline style="width: 400px !important; height: 270px !important;" preload="auto">
            </video></div>
            @endif
            <div class="btn-holder" style="display: none !important;">

                @if(!$ios)
                <a href="javascript:void(0)" class="btn-play" id="play_back" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>Play</a>
                <a href="javascript:void(0);" id="video-pause" class="btn-pause" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important; display: none;" @endif>Pause</a>
                <a href="javascript:void(0)" class="btn-stop" id="re-record-video">Re-record</a>
                @endif
                <form method="post" enctype="multipart/form-data" id="video_data_form">
                    <input type="hidden" name="token" class="video_token" id="video_token">
                    <input type="hidden" name="file_type" value="video">
                    <input type="hidden" name="file_name" id="video_file_name">
                    <input type="hidden" name="duration" class="video_duration">
                    <input type="hidden" name="is_complete" value="1">
                    <input type="hidden" name="id" class="id">
                    
                    <input type="hidden" name="browser_and_version" id="browser_and_version">
                    <input type="hidden" name="os_and_version" id="os_and_version">
                    <input type="hidden" name="screen_size" id="screen_size">
                    <input type="hidden" name="mobile" id="mobile">
                    
                    @if((isset($widget->first_name_field_active) && $widget->first_name_field_active == '1') || (isset($widget->email_field_active) && $widget->email_field_active == '1') || (isset($widget->phone_field_active) && $widget->phone_field_active == '1'))
                    <a href="javascript:void(0)" class="btn-send dsgn1as10 video_message_next next" id="send-video" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>Next</a>

                    <script>
                        $('.video_message_next').on('click', function() {
                            $('.display_div').hide();
                            $('#ar_form').show();
                        });
                    </script>
                    @else        
                    <a href="javascript:void(0)" class="btn-send dsgn1bs10 send_video_message" id="send-video" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>Send</a>
                    @endif    
                </form>
            </div>
            @if(isset($widget->remove_powered_by) && $widget->remove_powered_by == 0)
            <div id="powered-by">
             <strong class="powered-by" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Powered by <a href="http://voicestak.com" target="_blank" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif>VoiceStak</a></strong>
         </div>
         @endif
     </section>
 </div>

</div>
