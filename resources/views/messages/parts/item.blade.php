    <div class="message_cont">
        @if($status == 1)
        <div class="messageCheckboxCont">
            <input type="checkbox" style="float: left;" class="messageCheckbox" onchange="collectIds({{$message->id}}, this, {{$status}})">
        </div>
        @else 
        <div class="messageCircleCont">
            <div class="messageCircle messageCheckbox" style="@if($message->is_readed == 0) background-color: #379ADB; @else background-color: transparent; @endif"></div>
        </div>
        @endif

        <div class='vt-inbox-tab messageCheckboxContVT'>
            <div class='vt-inbox-box-image'>
                <div class='vt-image-main'>
                    <div class="hide">
                        {!! $path = "http://www.gravatar.com/avatar/".md5( strtolower( trim( $message->email ) ) );
                        $d = urlencode(url()."/assets/img/default_avatar.jpg");
                        !!}
                    </div>
                    <img src="{!! $path.'?d='.$d !!}" />
                </div>
            </div>
            <div class='vt-content'>
                <div class='vt-inbox-title'>
                    <div class='vt-user-details'>
                        <label @if($message->name == '') class="hide" @endif>
                            <small>{!! $message->name !!}</small>
                        </label>
                        <label @if($message->email == '') class="hide" @endif>
                            <i class='glyphicon glyphicon-envelope'></i>
                            <small>{!! $message->email !!}</small>
                        </label>
                        <label @if($message->phone == '') class="hide" @endif>
                            <i class='glyphicon glyphicon-phone'></i>
                            <small>{!! $message->phone !!}</small>
                        </label>
                        <label>
                            @if($message->consent == 1)
                            <i class='glyphicon glyphicon-ok glyphicon-ok-color'></i>
                            @elseif($message->consent == 0)
                            <i class='glyphicon glyphicon-remove glyphicon-remove-color'></i>
                            @endif
                            <small>Consent</small>
                        </label>
                        <label>
                            <small>{!! $message->user_ip !!}</small>
                        </label>
                        <label>
                            <small>Browser: {!! $message->browser_and_version !!}</small>
                        </label>  
                        <label>
                            <small>OS: {!! $message->os_and_version !!}</small>
                        </label>                     
                        <label class='message-type'>
                            @if($message->file_type == 'video')
                            <div class="col-md-4">
                                <i class='glyphicon glyphicon-facetime-video'></i>
                            </div>
                            @else
                            <div class="col-md-4">
                                <i class='glyphicon glyphicon-volume-up'></i>
                            </div>
                            @endif
                        </label>
                    </div>
                </div>
                <div class='vt-inbox-stats-container'>
                    <span>
                        Past 30 Days
                    </span>
                    <div class='vt-inbox-stats'>
                        <div class='row'>
                            <div class='col-md-4 stats'>
                                <label>
                                    <i class='glyphicon glyphicon-calendar'></i>
                                    <small>{!! $message->created_at !!}</small>
                                </label>
                            </div>
                            <div class='col-md-4 stats'>
                                <label>
                                    <small>
                                        campaign:
                                        <b>{!! $message->campaign->name !!}</b>
                                    </small>
                                </label>
                            </div>
                            <div class='col-md-4 stats'>
                                <label>
                                    <small>
                                        widget:
                                        <b>{!! !empty($message->widget) ? $message->widget->widget_name : '' !!}</b>
                                    </small>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='vt-inbox-box-controller'>

                    <input type="text" name="taginput" mid="{{$message->id}}" class="tooltiptext tag-input-custom" style="display: none; position: absolute;" data-role="tagsinput">

                    <a href="javascript:void(0);" class="btn btn-warning" onclick="jQuery(this).siblings('.bootstrap-tagsinput:last').toggle();" title="Tag this message">
                        <span class="glyphicon glyphicon-tags"></span>
                    </a>
                    <form action="/messages/{!! $message->id !!}" method="POST">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="_method" value="DELETE">
                        <input type="hidden" name="status" value="{{$status}}">
                        @if($message->is_archived == 0)
                        <a href="/messages/mark-message-as-archived/{!! $message->id !!}" class="btn btn-danger" title="Archive this message">
                            <span class="glyphicon glyphicon-save-file"></span>
                        </a>
                        @else
                        <a class='btn btn-danger' data-target='#removeModal{!! $message->id !!}' data-toggle='modal' href=''>
                            <span class='glyphicon glyphicon-trash'></span>
                        </a>
                        @endif
                        <a href="javascript:void(0);" data-target="#shareModal{!! $message->id !!}" data-toggle='modal' class="btn btn-info" title="Share this message">
                            <span class="glyphicon glyphicon-share"></span>
                        </a>
                        <a title="Download" class='btn btn-primary' @if($message->file_name && $message->file_type == 'audio') href="{!! $message->file_name !!}" download @elseif($message->file_name && $message->file_type == 'video') href="/uploads/video/{!! $message->file_name !!}" download @else href="javascript:;" @endif>
                            <span class="glyphicon glyphicon-save"></span>
                        </a>
                        <div aria-hidden='true' aria-labelledby='myModalLabel' class='modal fade' id='removeModal{!! $message->id !!}' role='dialog' tabindex='-1'>
                            <div class='modal-dialog modal-sm'>
                                <div class='modal-content'>
                                    <div class='modal-body'>
                                        Are you sure?
                                    </div>
                                    <div class='modal-footer'>
                                        <button class='btn btn-default btn-sm' data-dismiss='modal' type='button'>Cancel</button>
                                        <button class='btn btn-danger btn-sm' type='submit'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="shareModal{!! $message->id !!}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Embeded Code</h5>
                            </div>
                            <div class="modal-body" id="embcode{!! $message->id !!}">

                                &lt;iframe width="560" height="315" src="{{env('APP_HOST')}}uploads/video/{!! $message->file_name !!}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen&gt;
                                &lt;/iframe&gt;

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onclick="CopyToClipboard('embcode'+{!! $message->id !!})">Copy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <a id="youtube_player{{$message->id}}" @if($message->is_readed == 0 ) onclick="markMessageAsRead( this, {!! $message->id !!} )" @endif class='btn btn-success' data-toggle="modal" @if(isset($message->youtube_url)) data-target="#playerModal" @else data-target="#playerModal{{$message->id}}" @endif>
                    <span class='glyphicon glyphicon-play'></span>
                    PLAY
                </a>
                @if(isset($message->youtube_url))
                <script type="text/javascript">
                    $(document).ready(function() {
                        var url = "{{$message->youtube_url}}";
                        var videoid = url.match(/(?:\/{2})?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                        if(videoid == null) {
                            $("#youtube_link{{$message->id}}").attr('href', "//youtu.be/{{$message->youtube_url}}");
                        } else {
                            $("#youtube_link{{$message->id}}").attr('href', "//youtu.be/"+videoid[1]);
                        }  
                    })
                </script>
                <a id="youtube_link{{$message->id}}" @if($message->is_readed == 0 ) onclick="markMessageAsRead( {!! $message->id !!} )" @endif class="btn btn-danger" target="_blank">
                    <span class='glyphicon glyphicon-play-circle'></span>
                    Youtube
                </a>
                @endif
                @if($message->file_name && !isset($message->youtube_url))
                <div class="modal fade" id="playerModal{{$message->id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true" >
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div>
                                    @if($message->file_type == "audio")
                                    <audio id="audio{{$message->id}}" type="audio/wav" src="{!! $message->file_name !!}" controls>
                                    </audio>
                                    @elseif($message->file_type == "video")
                                    <video id="video{{$message->id}}" type="video/mp4" src="/uploads/video/{!! $message->file_name !!}" controls style="width: 400px !important; height: 270px !important;">
                                    </video>
                                    @endif
                                </div>
                            </div>
                            <div class="modal-footer">
                                @if($message->file_type == "audio")
                                <button type="button" onclick="document.getElementById('audio{{$message->id}}').pause()" class="btn btn-default btn-sm close" data-dismiss="modal">Close</button>
                                @elseif($message->file_type == "video")
                                <button type="button" onclick="document.getElementById('video{{$message->id}}').pause()" class="btn btn-default btn-sm close" data-dismiss="modal">Close</button>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
                @elseif(isset($message->youtube_url))
                <div class="modal fade" id="playerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true" >
                    <div class="modal-dialog modal-md">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div>
                                    @if($message->file_type == "video")
                                    @if(isset($message->youtube_url))
                                    <div id="player"></div>
                                    <script>
                                        var tag = document.createElement('script');
                                        tag.src = "https://www.youtube.com/iframe_api";
                                        var firstScriptTag = document.getElementsByTagName('script')[0];
                                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                                        var player;
                                        function onYouTubeIframeAPIReady() {
                                            player = new YT.Player('player', {
                                                height: '350',
                                                width: '500',
                                                videoId: "",
                                                events: {
                                                                          // 'onReady': onPlayerReady,
                                                                          // 'onStateChange': onPlayerStateChange
                                                                      }
                                                                  });
                                        }
                                        function stopVideo() {
                                            player.stopVideo();
                                        }
                                    </script>
                                    @endif
                                    @endif
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onclick="stopVideo()" class="btn btn-default btn-sm close" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                @endif
            </form>
        </div>
    </div>
</div>
</div>

<script>
    $(document).ready(function() {
        $('#youtube_player{{$message->id}}').on('click', function() {
            var url = "{{$message->youtube_url}}";
            var videoid = url.match(/(?:\/{2})?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if(videoid == null) {
                $('#player').attr("src","https://www.youtube.com/embed/{{$message->youtube_url}}?enablejsapi=1");
            } else {
                $('#player').attr("src","https://www.youtube.com/embed/"+videoid[1]+"?enablejsapi=1");
            }
        })
    })
    function CopyToClipboard(containerid) {
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        alert("Text has been copied")
    }
}
</script>