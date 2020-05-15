<div style="display: none;" class="display_div d3">
    <div id="popup33" class="lightbox" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
        <section class="popup popup-five popup33">
            <h2 class="voice" @if(isset($widget)) style="background-color: {!! $widget->widget_main_headline_bg_color !!} ; border-color: {!! $widget->widget_main_headline_bg_color !!} ; color: {!! $widget->widget_main_headline_color !!}" @endif>
               @if(isset($widget) && isset($widget->widget_voice_headline) && $widget->widget_voice_headline != '')
               {!! $widget->widget_voice_headline !!}
               @else
               Send Us a Voice Message
               @endif
           </h2>
           <strong class="title" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
            @if(isset($widget) && isset($widget->four1) && $widget->four1 != '')
            {!! $widget->four1 !!}
            @else
            Press “Play” to listen to your recording Press “Re-record” to record a new message Press “Send” to send your voice message
            @endif
        </strong>
        <h3 @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif><span id="spanimg" style="display: none; margin-left: 10px;"><b @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Processing </b><img id="loader-img" alt="" src="/assets/img/loader.gif" width="20" height="20" align="center" /></span><b id="playing" style="display: none;">Playing <span id="message_length" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif></span></b></h3>

        <script>
            window.console      =   window.console || function(t) {};
            window.open         =   function(){ console.log("window.open is disabled."); };
            window.print        =   function(){ console.log("window.print is disabled."); };
        </script>

        <audio id="music" preload="true">
        </audio>
        <div id="audioplayer" class="progress">
            <div id="timeline" class="progress-bar" @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} !important;" @endif>
                <div id="playhead" class="handle"></div>
            </div>
        </div>

        <div class="btn-holder-r hidden_div" style="display: none !important;">
            <a id="pButton" class="btn-play btn-play-r" onclick="play()" @if(isset($widget)) style="color: {!! $widget->widget_buttons_text_color !!} !important;" @endif><span @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} " @endif></span> Play</a>
            <a href="javascript:void(0)" class="btn-stop-r" id="re-record" @if(isset($widget)) style="color: {!! $widget->widget_buttons_text_color !!} !important;" @endif><span></span> Re-record</a>
            @if((isset($widget->first_name_field_active) && $widget->first_name_field_active == '1') || (isset($widget->email_field_active) && $widget->email_field_active == '1') || (isset($widget->phone_field_active) && $widget->phone_field_active == '1'))
            <a class="btn-send-r" @if(isset($widget)) style="color: {!! $widget->widget_buttons_text_color !!} !important;" @endif><span @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} " @endif></span> Next</a>
            @else
            <form method="post" enctype="multipart/form-data">
                <input type="hidden" name="token" class="token">
                <input type="hidden" name="file_type" value="audio">
                <input type="hidden" name="duration" class="duration">
                <input type="hidden" name="is_complete" value="1">
                <input type="hidden" name="id" class="voice_id">

                <input type="hidden" name="browser_and_version" id="voice_browser_and_version">
                <input type="hidden" name="os_and_version" id="voice_os_and_version">
                <input type="hidden" name="screen_size" id="voice_screen_size">
                <input type="hidden" name="mobile" id="voice_mobile">                          

                <a class="btn-send-r send_voice_message" @if(isset($widget)) style="color: {!! $widget->widget_buttons_text_color !!} !important;" @endif><span @if(isset($widget)) style="background-color: {!! $widget->widget_buttons_bg_color !!} " @endif></span> Send</a>
            </form>
            @endif
        </div>

        <script>
            var music               =   document.getElementById('music');
            var duration;
            var pButton             =   document.getElementById('pButton');
            var playhead            =   document.getElementById('playhead');
            var timeline            =   document.getElementById('timeline');
            var timelineWidth       =   timeline.offsetWidth - playhead.offsetWidth;
            var message_length      =   localStorage.message_length;

            music.addEventListener('timeupdate', timeUpdate, false);

            timeline.addEventListener('click', function (event) {
                moveplayhead(event);
                music.currentTime = duration * clickPercent(event);
            }, false);

            function clickPercent(e) {
                var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
                return (e.pageX - timeline.offsetLeft) / timelineWidth;
            }

            playhead.addEventListener('mousedown', mouseDown, false);
            window.addEventListener('mouseup', mouseUp, false);
            var onplayhead = false;

            function mouseDown() {
                onplayhead = true;
                window.addEventListener('mousemove', moveplayhead, true);
                music.removeEventListener('timeupdate', timeUpdate, false);
            }

            function mouseUp(e) {
                if (onplayhead == true) {
                    moveplayhead(e);
                    window.removeEventListener('mousemove', moveplayhead, true);
                    music.currentTime = duration * clickPercent(e);
                    music.addEventListener('timeupdate', timeUpdate, false);
                }
                onplayhead = false;
            }

            function moveplayhead(e) {
                var newMargLeft         =   e.pageX - timeline.offsetLeft;
                var timelineWidth       =   timeline.offsetWidth - playhead.offsetWidth;

                if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
                    playhead.style.marginLeft = newMargLeft + 'px';
                }

                if (newMargLeft < 0) {
                    playhead.style.marginLeft = '0px';
                }

                if (newMargLeft > timelineWidth) {
                    playhead.style.marginLeft = timelineWidth + 'px';
                }
            }

            function timeUpdate() {
                var sec_num     =   parseInt(Math.floor(music.currentTime), 10);
                var hours       =   Math.floor(sec_num / 3600);
                var minutes     =   Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds     =   sec_num - (hours * 3600) - (minutes * 60);

                if (hours   < 10) {hours   = "0"+hours;}
                if (minutes < 10) {minutes = minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}

                var time    = minutes+':'+seconds;

                $('#message_length').html(time);

                var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
                var playPercent = timelineWidth * (music.currentTime / duration);
                playhead.style.marginLeft = playPercent + 'px';

                if (music.currentTime == duration) {
                    pButton.className = '';
                    pButton.className = 'btn-play-r';
                    playhead.style.marginLeft = '0px';
                }
            }

            function play() {
                if (music.paused) {
                    music.play();
                    pButton.className = '';
                    pButton.className = 'btn-pause-r';
                } else {
                    music.pause();
                    pButton.className = '';
                    pButton.className = 'btn-play-r';
                }
            }

            music.addEventListener('canplaythrough', function () {
                duration = music.duration;
            }, false);
        </script>

        @if(isset($widget->remove_powered_by) && $widget->remove_powered_by == 0)
        <div id="powered-by">
            <strong class="powered-by" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>Powered by <a href="http://voicestak.com" target="_blank" @if(isset($widget)) style="color: {!! $widget->widget_buttons_bg_color !!}" @endif>VoiceStak</a></strong>
        </div>
        @endif
    </section>
</div>

<script>
    $( document ).ready(function() {
        $('.voice_id').val(localStorage.id);
        $('#re-record').on('click', function() {
            $.get('/messages/delete-audio?name='+localStorage.fileName);
        })

        $('.send_voice_message').on('click', function() {
            $('.token').val(localStorage.token);
            $('.duration').val(localStorage.message_length);


            console.log('sending browser data s5');
            $('#voice_os_and_version').val( window.jscd.os + ' ' + window.jscd.osVersion );
            $('#voice_screen_size').val( window.jscd.screen );
            $('#voice_browser_and_version').val( window.jscd.browser + ' ' + window.jscd.browserVersion );
            $('#voice_mobile').val( window.jscd.mobile );                  

            $(this).closest('form').attr('action', '/messages/update-message/'+localStorage.id);
            /*$(this).closest('form').submit();*/

            var dataStr = $(this).closest('form').serialize();
            $.post( $(this).closest('form').attr('action') , dataStr, function(res){
                let result = JSON.parse(res);
                console.log(result);
                if(result && result.redirect_url != undefined && result.redirect_url != null && result.redirect_url != '')
                    window.top.location.href = result.redirect_url;
                else
                    console.log('NO Thank You URL found');
            });
            $('body').append('<center style="margin-top: 40% !important;"><span id="sendLoader"><img src="/assets/img/send-loader.gif"></span></center>');
        })
    });
</script>
</div>