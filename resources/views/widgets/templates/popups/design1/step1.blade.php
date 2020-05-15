<div class="display_div d1 step_1">
    <div id="popup1" class="lightbox lightbox.iframe" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
        <section class="popup popup-one">
            <h2 @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
                @if(isset($widget) && $widget->widget_main_headline != '')
                    {!! $widget->widget_main_headline !!}
                @else
                    We want to hear from you!<br> Leave us a voice or video message.
                @endif
            </h2>
            <div class="box-holder">
                <div class="box">
                    <div class="align-left"><img src="/assets/img/img3.png" alt="image description"></div>
                    <div class="text">
                        <strong class="title">
                            @if(isset($widget) && isset($widget->one1) && $widget->one1 != '')
                                {!! $widget->one1 !!}
                            @else
                                Record Your
                            @endif
                        </strong>
                        <h3>
                            @if(isset($widget) && isset($widget->one2) && $widget->one2 != '')
                                {!! $widget->one2 !!}
                            @else
                                Voice Message
                            @endif
                    </h3>
                        <a id="start-voice-1"class="btn-popup" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>
                             @if(isset($widget) && isset($widget->one3) && $widget->one3 != '')
                                {!! $widget->one3 !!}
                            @else
                                Start Recording
                            @endif
                        </a>
                    </div>
                </div>
                <div class="box">
                    <div class="align-left"><img src="/assets/img/img4.png" alt="image description"></div>
                    <div class="text">
                        <strong class="title">
                            @if(isset($widget) && isset($widget->one4) && $widget->one4 != '')
                                {!! $widget->one4 !!}
                            @else
                                Record Your
                            @endif
                        </strong>
                        <h3>
                            @if(isset($widget) && isset($widget->one5) && $widget->one5 != '')
                                {!! $widget->one5 !!}
                            @else
                                Video Message
                            @endif
                        </h3>
                        <a id="start-video-1" class="btn-popup" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif>
                            @if(isset($widget) && isset($widget->one6) && $widget->one6 != '')
                                {!! $widget->one6 !!}
                            @else
                                Start Recording
                            @endif
                        </a>
                    </div>
                </div>
            </div>
            @if(isset($widget->remove_powered_by) && $widget->remove_powered_by == 0)
               <div id="powered-by">
                    <strong class="powered-by" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Powered by <a href="http://voicestak.com" target="_blank" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif>VoiceStak</a></strong>
               </div>
            @endif
        </section>
    </div>
</div>