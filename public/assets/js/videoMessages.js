$( document ).ready(function() {
    var storage = "/uploads/video/";
    var mediaRecorder;
    var recordRTC;
    var audioMessage = "";
    var videoMessage = "";
    var video;
    var first = true;
    var isFirefox = !!navigator.mozGetUserMedia;

    $('#popup7 .btn-popup,#popup13 .btn-popup,#popup25 .start-video').click(function() {
        if($('.check_domain').val() === 'true') {
            $('#popup9 #capture').hide();
            $('#popup15 #capture').hide();
            $('#popup27 #capture').hide();

            var mediaConstraints = {
                audio: true,
                video: true
            };

            if (!navigator.getUserMedia) {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            }
            navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
        }
    });

    function onMediaSuccess(stream) {
        if(stream.getVideoTracks().length == 0) {
            alert('Error Capturing Video!!! Please check is camera connected or Have You a permission to use it!!!');
            return false;
        }
        video = document.querySelector('video');
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        video.src = window.URL.createObjectURL(stream);
        var options = {};

        if(!isFirefox) {
            mediaRecorder = new MultiStreamRecorder(stream);
            mediaRecorder.video = video;
            mediaRecorder.audioChannels = 1;
            mediaRecorder.ondataavailable = function (blobs) {
                if(first){
                    audioMessage = blobs.audio;
                    videoMessage = blobs.video;
                    getVideo();
                } else {
                    audioMessage = blobs.audio;
                    videoMessage = blobs.video;
                }
                first = true;
            };
        } else {
            recordRTC = RecordRTC(stream, options);
        }

        $('#popup9 #capture').show();
        $('#popup15 #capture').show();
        $('#popup27 #capture').show();
    }

    function onMediaError(e) {
        alert('Error Capturing Video!!! Please check is camera connected or Have You a permission to use it!!!');
    }

    var isPaused = false;
    var seconds1 = 0;
    var seconds2 = 0;
    var minutes = 0;
    var message_length = '0:00';

    if($('#record_length').length !== 0) {
        document.getElementById("record_length").innerHTML = message_length;
    }

    function func() {
        seconds2++;
        if(seconds2 == 10){
            seconds2 = 0;
            seconds1++;
        }

        if(seconds1 == 6){
            seconds1 = 0;
            minutes++;
        }

        message_length = minutes+":"+seconds1+seconds2;
        document.getElementById("record_length").innerHTML = message_length;
    }

    if (typeof $.timer != 'undefined') {
        var timer = $.timer(func, 1000, true);
        timer.stop();
    }

    $("#capture").on('click', function() {
        if($('.check_domain').val() === 'true') {
            document.getElementById('capture').style.display        =   'none';
            document.getElementById('video-stop').style.display     =   'inline-block';
            if(!isFirefox) {
                mediaRecorder.start(6000000);
                if($('.is_premium').val() == false) {
                    setTimeout(getVideo, 300000);
                } else {
                    setTimeout(getVideo, 600000);
                }
            } else {
                recordRTC.startRecording();
                if($('.is_premium').val() == false) {
                    if(first)
                        setTimeout(getVideo, 300000);
                    first = true;
                } else {
                    if(first)
                        setTimeout(getVideo, 600000);
                    first = true;
                }
            }
            timer.play();
        }
    });

    $("#video-stop").on('click', function() {
        if($('.check_domain').val() === 'true') {
            getVideo();
        }
    });

    $('#play_back').on('click', function() {
        if($('.check_domain').val() === 'true') {
            $('#play_back').hide();
            $('#video-pause').show();
            var video = document.getElementById('video_watch');
            video.play();
        }
    });
    $('#video-pause').on('click', function() {
        if($('.check_domain').val() === 'true') {
            $('#play_back').show();
            $('#video-pause').hide();
            var video = document.getElementById('video_watch');
            video.pause();
        }
    })
    function getVideo() {
        first = false;

        if($('.check_domain').val() === 'true') {
            $('.display_div').hide();
            $('.display_div:nth-child(10)').show();
        }

        if(!isFirefox) {
            mediaRecorder.stop();
        } else {
            recordRTC.stopRecording(function(videoURL) {
                videoMessage = recordRTC.getBlob();
            });
        }

        timer.stop();

        document.getElementById('video-pause').style.display    =   'none';
        document.getElementById('video-stop').style.display     =   'none';
        document.getElementById('capture').style.display        =   'inline-block';

        var fileType = 'video';
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        
        if(!isFirefox) {
            $("#videospanimg").css("display", "inline-block");
            setTimeout(function(){
                formData.append('audiofile', audioMessage);
                formData.append('videofile', videoMessage);
                formData.append('length', message_length);

                xhr.open("POST","/messages/upload-file",true);

                xhr.send(formData);
            }, 5000);
            
        } else {
            $("#videospanimg").css("display", "inline-block");
            // setTimeout(function() {
                formData.append('videofile', videoMessage);
                formData.append('length', message_length);
                xhr.open("POST","/messages/upload-file",true);
                xhr.send(formData);
            // },3000);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                $("#videospanimg").css("display", "none");
                $('.btn-holder').show();

                localStorage.message_length =   message_length;
                localStorage.fileName       =   JSON.parse(xhr.responseText).file_name;
                localStorage.file           =   storage + JSON.parse(xhr.responseText).file_name;
                localStorage.id             =   JSON.parse(xhr.responseText).id;
                $('#video_watch').prop('src', localStorage.file);

                document.getElementById('message_length').innerHTML =   localStorage.message_length;
                document.getElementById("video_file_name").value    =   localStorage.fileName;
                document.getElementById("video_duration").value     =   localStorage.message_length;
                document.getElementById('video_token').value        =   localStorage.token;

                seconds1        =   0;
                seconds2        =   0;
                minutes         =   0;
                message_length  =   '0:00';
            }
        };
    }
})