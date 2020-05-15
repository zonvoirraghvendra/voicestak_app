<div style="display: none;" class="display_div d2">
    <div id="popup13" class="lightbox" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
        <section class="popup popup-two design2">
            <h2 class="border" @if(isset($widget)) style="background-color: {!! $widget->widget_main_headline_bg_color !!} ; border-color: {!! $widget->widget_buttons_bg_color !!} ; color: {!! $widget->widget_main_headline_color !!}" @endif>
                @if(isset($widget) && isset($widget->widget_video_headline) && $widget->widget_video_headline != '')
                {!! $widget->widget_video_headline !!}
                @else
                Send Us a Video Message
                @endif
            </h2>
            <style>

                .main-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .recorder-wrapper {
                    display: flex;
                    flex-direction: column;
                    /*justify-content: center;*/
                    align-items: center;
                    width: 320px;
                }

                .main-wrapper h3 {
                    margin-bottom: 30px;
                }

                .inputfile {
                    width: 0.1px;
                    height: 0.1px;
                    opacity: 0;
                    overflow: hidden;
                    position: absolute;
                    z-index: -1;
                }

                .inputfile + label {
                    font-size: 1.25em;
                    font-weight: 700;
                    color: white;
                    background-color: #a07cb2;
                    display: flex;
                    justify-content: center;
                    cursor: pointer;
                    width: 140px;
                    padding: 20px;
                    border-radius: 5px;
                }

                .inputfile:focus + label,
                .inputfile + label:hover {
                    background-color: #675073;
                }



            </style>

            <div class="main-wrapper">
                <h3>IOS Video Record Demo</h3>

                <div id="vs-start" class="recorder-wrapper" >
                    <input type="file" name="vs-recorder" accept="video/*" capture="user" id="vs-recorder" class="inputfile">
                    <label for="vs-recorder" id="vs-recorder-label">Record video</label>
                </div>

                <div id="vs-busy" class="recorder-wrapper" style="display: none;">
                    <h3 id="uploading-text">Uploading video...</h3>
                </div>

                <div id="vs-done" class="recorder-wrapper" style="display: none;">
                    <video id="player" width="320" controls playsinline ></video>

                    <p>Showing video preview.</p>
                    <p>And will also show "Play", "Next" and "Record" buttons.</p>
                </div>
            </div>





            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script>

//                var token = document.querySelector("meta[name=csrf_token]").getAttribute('content');
//                console.log(token);
var recorder = document.getElementById('vs-recorder');
var player = document.getElementById('player');

var start = document.getElementById('vs-start');
var busy = document.getElementById('vs-busy');
var done = document.getElementById('vs-done');


recorder.addEventListener('change', function(e) {
    var file = e.target.files[0];
                    // Do something with the video file.
//        player.src = URL.createObjectURL(file);

var messageInitialized = false;
setTimeout(function() {
    var formData = new FormData();
    formData.append('initialize_message', 1);
    $("#videospanimg").css("display", "inline-block");

    $.ajax({
        method: "POST",
        url: "/messages/initialize",
        data: formData,
        processData: false,
        contentType: false,
    })
    .complete(function(res) {
        console.log('ajax complete: ', res);
        var response = JSON.parse(res.responseText);
        var id = response.id;
        var fileName = response.file_name;
        messageInitialized = true;

        var videoData = new FormData();
        videoData.append('videofile', file);
//                                    videoData.append('length', message_length); // ?????
videoData.append('fileName', fileName);
videoData.append('saveraw', window.vssaveraw != undefined ? window.vssaveraw : false);
$.ajax({
    method: "POST",
    url: "/messages/upload-video-file",
    data: videoData,
    processData: false,
    contentType: false,
})
.complete(function(res) {
                                                //console.log('file upload complete: ', res);

                                            })
.error(function(err) {
    console.log('ajax error: ', err);
});
})
    .error(function(err) {
        console.log('ajax error: ', err);
    });
}, 3000);

start.style.display = 'none';
busy.style.display = 'block';

var formData = new FormData();
formData.append('vsfile',file);
var config = {
    headers: {
        'content-type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
        'CSRF-Token': '{{ csrf_token() }}',
    }
};

//                    axios.defaults.headers = {
//                        'content-type': 'multipart/form-data',
//                        'X-Requested-With': 'XMLHttpRequest',
//                        'CSRF-Token': token,
//                    };

axios.post('videoupload', formData, config)
.then(function (response) {

    setTimeout(function() {
        busy.style.display = 'none';
        done.style.display = 'block';
        player.src = URL.createObjectURL(file);
    }, 5000);

})
.catch(function (error) {
    console.log(error);
});

});
</script>
</section>
</div>
</div>