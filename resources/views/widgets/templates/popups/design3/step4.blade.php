<div style="display: none; position: relative; overflow-x: hidden" class="display_div d3">
    <script src="/assets/js/jquery.timer.js"></script>
    <script>
        $( document ).ready(function() {
            @if(isset($widget) && $widget->widget_buttons_bg_color != '')
            var NewColor = LightenDarkenColor('{!! $widget->widget_buttons_bg_color !!}', -50);
            $('.btn-play-r span').css({'border': '3px solid '+NewColor});
            $('.btn-send-r span').css({'border': '3px solid '+NewColor});
            @endif
        })
    </script>

    <div id="popup32" class="lightbox popup32" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
    	<section class="popup popup-four">
           <h2 class="voice" @if(isset($widget)) style="background-color: {!! $widget->widget_main_headline_bg_color !!} ; border-color: {!! $widget->widget_main_headline_bg_color !!} ; color: {!! $widget->widget_main_headline_color !!}" @endif>
            @if(isset($widget) && isset($widget->widget_voice_headline) && $widget->widget_voice_headline != '')
            {!! $widget->widget_voice_headline !!}
            @else
            Send Us a Voice Message
            @endif   
        </h2>
        <strong class="title" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
            @if(isset($widget) && isset($widget->three1) && $widget->three1 != '')
            {!! $widget->three1 !!}
            @else
            Speak into your microphone!
            @endif
        </strong>
        <div class="flash_cont">
            <div id="flash-box"></div>
        </div>
        <h3 @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
            @if(isset($widget) && isset($widget->three2) && $widget->three2 != '')
            {!! $widget->three2 !!}
            @else
            Recording: 
            @endif
            <span id="record_length" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif></span></h3>
            <strong class="sub-title" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                @if(isset($widget) && isset($widget->three3) && $widget->three3 != '')
                {!! $widget->three3 !!}
                @else
                Max recording duration: 
                @endif
                <span>@if(isset($is_premium) && $is_premium == 0) 5 @else 10 @endif</span> minutes</strong>
                <div class="slider"><span class="handle" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!}" @endif></span></div>
                <div class="btn-holder-r">
                    <a href="javascript:void(0)" class="play btn-play-r" id="play" @if(isset($widget)) style="color: {!! $widget->widget_buttons_text_color !!} !important; display: none;" @endif><span @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} " @endif></span>
                        @if(isset($widget) && isset($widget->three4) && $widget->three4 != '')
                        {!! $widget->three4 !!}
                        @else
                        Begin Recording
                        @endif
                    </a>
                    <a href="javascript:void(0)" class="pause btn-pause-r hide" id="pause" @if(isset($widget)) style="color: {!! $widget->widget_buttons_text_color !!} !important;" @endif><span @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} " @endif></span>Pause</a>
                    <a href="javascript:void(0)" class="stop btn-stop-r" id="stop" style="display: none;"><span></span>Stop</a>
                </div>
                @if(isset($widget->remove_powered_by) && $widget->remove_powered_by == 0)
                <div id="powered-by">
                    <strong class="powered-by" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Powered by <a href="http://voicestak.com" target="_blank" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif>VoiceStak</a></strong>
                </div>
                @endif
            </section>
        </div>
    </div>