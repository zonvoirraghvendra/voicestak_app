<div style="display: none;" class="display_div d2">
    <div id="popup15" class="lightbox" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
        <section class="popup popup-five popup9">
            <h2 class="border" @if(isset($widget)) style="background-color: {!! $widget->widget_main_headline_bg_color !!} ; border-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_main_headline_color !!}" @endif>
                @if(isset($widget) && isset($widget->widget_video_headline) && $widget->widget_video_headline != '')
                         {!! $widget->widget_video_headline !!}
                         @else
                         Send Us a Video Message
                         @endif
        </h2>
            @if(strpos(strtolower($_SERVER["HTTP_USER_AGENT"]),strtolower("FIREFOX")) || strpos(strtolower($_SERVER["HTTP_USER_AGENT"]),strtolower("CHROME")) || strpos(strtolower($_SERVER["HTTP_USER_AGENT"]),strtolower("Presto")))
                <div id="recording-box"><video id="video" autoplay muted style="width: 400px !important; height: 270px !important;"></video></div>
                <div class="row">
                    <a href="javascript:void(0);" id="capture" class="btn-record">
                    @if(isset($widget) && isset($widget->seven1) && $widget->seven1 != '')
                         {!! $widget->seven1 !!}
                         @else
                    Record
                    @endif
                </a>
                    <a href="javascript:void(0);" class="video-stop btn-record" id="video-stop" style="margin-left: 10px; display: none;" data-comp="@if((isset($widget->first_name_field_active) && $widget->first_name_field_active == '1') || (isset($widget->email_field_active) && $widget->email_field_active == '1') || (isset($widget->phone_field_active) && $widget->phone_field_active == '1')) 0 @else 1 @endif"><span></span>Stop</a>
                </div>
            @else
                <div id="recording-box"></div>
                <div class="row">
                    <a href="javascript:void(0);" id="capture" class="btn-record" style="display:none;">
                    @if(isset($widget) && isset($widget->seven1) && $widget->seven1 != '')
                         {!! $widget->seven1 !!}
                         @else
                    Record
                    @endif
                </a>
                    <a href="javascript:void(0);" class="video-stop btn-record" id="video-stop" style="margin-left: 10px; display:none;" data-comp="@if((isset($widget->first_name_field_active) && $widget->first_name_field_active == '1') || (isset($widget->email_field_active) && $widget->email_field_active == '1') || (isset($widget->phone_field_active) && $widget->phone_field_active == '1')) 0 @else 1 @endif"><span></span>Stop</a>
                </div>
            @endif
            @if(isset($widget->remove_powered_by) && $widget->remove_powered_by == 0)
                <div id="powered-by">
                    <strong class="powered-by" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Powered by <a href="http://voicestak.com" target="_blank" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif>VoiceStak</a></strong>
                </div>
            @endif
        </section>
    </div>
</div>