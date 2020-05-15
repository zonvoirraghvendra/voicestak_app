<div style="display: none;" class="display_div d3">
    <div id="popup25" class="lightbox" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
        <section class="popup popup-two popup25">
            <h2 class="video" @if(isset($widget)) style="background-color: {!! $widget->widget_main_headline_bg_color !!} ; border-color: {!! $widget->widget_main_headline_bg_color !!} ; color: {!! $widget->widget_main_headline_color !!}" @endif>
                @if(isset($widget) && isset($widget->widget_video_headline) && $widget->widget_video_headline != '')
                {!! $widget->widget_video_headline !!}
                @else
                Send Us a Video Message
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
             @if(isset($widget) && isset($widget->six1) && $widget->six1 != '')
             {!! $widget->six1 !!}
             @else   
             Is Your Microphone And Webcam On?
             @endif
         </strong>
         @if ($ios)

         <style>
            .inputfile {
                width: 0.1px;
                height: 0.1px;
                opacity: 0;
                overflow: hidden;
                position: absolute;
                z-index: -1;
            }

            .inputfile + label {
                /*font-size: 1.25em;*/
                /*font-weight: 700;*/
                /*display: flex;*/
                /*justify-content: center;*/
                /*cursor: pointer;*/
                /*width: 140px;*/
                /*padding: 20px;*/
                /*border-radius: 5px;*/


                font-family: 'Roboto-Bold';
                color: #ffffff !important;
                text-decoration: none !important;
                padding: 13px 28px;
                display: inline-block !important;
                font-size: 18px;
                line-height: 20px;
                border-radius: 4px;
                text-align: center;
                vertical-align: top;
                display: inline-block;
                text-transform: capitalize;
                text-shadow: 0 1px 0 #424242;
                border-top: 1px solid #E7E7E7;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                transition: all 0.5s ease-in-out;
                -moz-transition: all 0.5s ease-in-out;
                -webkit-transition: all 0.5s ease-in-out;
                background-color: #aa5fff;
                /* margin: -30px 0 0; */
                cursor: pointer;
            }

            .inputfile:focus + label,
            .inputfile + label:hover {
                /*background-color: #675073;*/
            }
        </style>
        <div id="vs-start" class="recorder-wrapper" >
            <input type="file" name="vs-recorder" accept="video/*" capture="user" id="vs-recorder" class="inputfile">
            <label for="vs-recorder" class="btn-popupssaz" id="vs-recorder-label"
            @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_buttons_text_color !!} !important;" @endif
            >
            @if(isset($widget) && isset($widget->six2) && $widget->six2 != '')
            {!! $widget->six2 !!}
            @else
            Start Recording
            @endif
        </label>
    </div>
    @else    
    <a href="javascript:void(0);" class="start-video videoFlash" @if(isset($widget)) style="border-color: {!! $widget->widget_buttons_bg_color !!}" @endif>
        <div class="start-box">
            <img src="/assets/img/img8.png" alt="">
            <strong class="title">
                @if(isset($widget) && isset($widget->six3) && $widget->six3 != '')
                {!! $widget->six3 !!}
                @else
                Start
                @endif
            </strong>
        </div>
        @endif

    </a>
    <ol class="add">
        <li @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
            @if(isset($widget) && isset($widget->six4) && $widget->six4 != '')
            {!! $widget->six4 !!}
            @else
            Record
            @endif
        </li>
        <li @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
            @if(isset($widget) && isset($widget->six5) && $widget->six5 != '')
            {!! $widget->six5 !!}
            @else
            Listen
            @endif
        </li>
        <li @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
            @if(isset($widget) && isset($widget->six6) && $widget->six6 != '')
            {!! $widget->six6 !!}
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
</div>