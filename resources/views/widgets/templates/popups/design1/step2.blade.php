<div style="display: none;" class="display_div d1 step_2">
    <div id="popup2" class="lightbox" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
    	<section class="popup popup-two">
        	<h2 class="voice" @if(isset($widget)) style="background-color: {!! $widget->widget_main_headline_bg_color !!} ; border-color: {!! $widget->widget_main_headline_bg_color !!} ; color: {!! $widget->widget_main_headline_color !!}" @endif>
             @if(isset($widget) && isset($widget->widget_voice_headline) && $widget->widget_voice_headline != '')
                {!! $widget->widget_voice_headline !!}
                @else
                Send Us a Voice Message
                @endif   
            </h2>
            <h3 @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                @if(isset($widget) && $widget->widget_main_headline != '')
                    {!! $widget->widget_main_headline !!}
                @else
                    We would love to hear from you!<br> Please record your message.
                @endif
            </h3>
        	<strong class="sub-title" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                @if(isset($widget) && isset($widget->two1) && $widget->two1 != '')
                    {!! $widget->two1 !!}
                @else
                    Is Your Microphone On?
                @endif
            </strong>
            <a class="btn-popup audioFlash" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>
                @if(isset($widget) && isset($widget->two2) && $widget->two2 != '')
                    {!! $widget->two2 !!}
                @else
                    Start Recording
                @endif
            </a>
            <ol>
            	<li @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                @if(isset($widget) && isset($widget->two3) && $widget->two3 != '')
                    {!! $widget->two3 !!}
                @else
                    Record
                @endif
                </li>
                <li @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                @if(isset($widget) && isset($widget->two4) && $widget->two4 != '')
                    {!! $widget->two4 !!}
                @else
                    Listen
                @endif
                </li>
                <li @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                @if(isset($widget) && isset($widget->two5) && $widget->two5 != '')
                    {!! $widget->two5 !!}
                @else
                    Send
                @endif
                </li>
            </ol>
            @if(isset($widget->remove_powered_by) && $widget->remove_powered_by == 0)
                <div id="powered-by">
                    <strong class="powered-by" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Powered by <a href="http://voicestak.com" target="_blank" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif>VoiceStak</a></strong>
                </div>
            @endif
        </section>
    </div>
    @if(isset($widget))
        {!! '<style>.popup-two ol li:before { background-color: ' .$widget->widget_buttons_bg_color . ' !important; color: ' .$widget->widget_buttons_text_color . ' !important} </style>' !!}
    @endif
</div>