function getParentUrl() {
    var isInIframe = (parent !== window),
        parentUrl = null;

    if (isInIframe) {
        parentUrl = document.referrer;
    }

    return parentUrl;
}

var parent_url = getParentUrl();

var isEdge = false;

var isFirefox = !!navigator.mozGetUserMedia;
var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
var isChrome = !isOpera && !isEdge && !!navigator.webkitGetUserMedia;

var recordingAlreadyStopped = false;

if (parent_url.indexOf('https') > -1) {

    // todo record audio only
    // todo record video and audio


    //Voicemessage.js
    var leftchannel = [];
    var rightchannel = [];
    var recorder = null;
    var recording = false;
    var recordingLength = 0;
    var volume = null;
    var audioInput = null;
    var sampleRate = null;
    var audioContext = null;
    var context = null;
    var outputElement = document.getElementById('output');
    var outputString;
    var audioMessage;
    var audiostorage = "/uploads/audio/";
    var isFirefox = !!navigator.mozGetUserMedia;
    var first = true;

    $('#popup18 .btn-popup,#popup2 .btn-popup,#popup30 .start-video').click(function(){
        if($('.check_domain').val() === 'true') {
            $('#popup20 #play').hide();
            $('#popup4 #play').hide();
            $('#popup32 #play').hide();

            // var mediaConstraints = {
            //     audio: true
            // };

            // if (!navigator.getUserMedia){
            //     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            // }

            // navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

            if (!navigator.getUserMedia)
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            if (navigator.getUserMedia){
                navigator.getUserMedia({audio:true}, success , function(e) {
                    alert('Error capturing audio.');
                });
            } else alert('getUserMedia not supported in this browser.');
        }
    });

    function onMediaSuccess(stream) {
        // if(!isFirefox){

        //     mediaRecorder = new MediaStreamRecorder(stream);
        //     mediaRecorder.mimeType = 'audio/wav';
        //     mediaRecorder.audioChannels = 1;
        //     mediaRecorder.ondataavailable = function (blob) {
        //         audioMessage = blob;
        //     };
        mediaRecorder = new MultiStreamRecorder(stream);
        mediaRecorder.video = video;
        mediaRecorder.ondataavailable = function (blobs) {
            audioMessage = blobs.audio;
            videoMessage = blobs.video;
        };
        // } else {
        //     recordRTC = RecordRTC(stream);
        // }

        $('#popup20 #play').show();
        $('#popup4 #play').show();
        $('#popup32 #play').show();
    }

    function onMediaError(e) {
        alert('Oops!!! You have a problem with Your camera or You don\'t have permissions to use it!!!');
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
    if (typeof $.timer != 'undefined'){
        var timer = $.timer(func, 1000, true);
        timer.stop();
    }
    $(".play").on('click', function(){
        if($('.check_domain').val() === 'true') {
            document.getElementById('play').style.display = 'none';
            document.getElementById('stop').style.display = 'inline-block';

            timer.play();
            recording = true;
            if($('.is_premium').val() == false){
                if(first)
                    setTimeout(getAudio, 300000);
                first = true;
            } else {
                if(first)
                    setTimeout(getAudio, 600000);
                first = true;
            }
        }
    });
// $(".pause").on('click', function(){
//     if($('.check_domain').val() === 'true') {
//         document.getElementById('pause').style.display = 'none';
//         document.getElementById('play').style.display = 'inline-block';
//         timer.pause();
//         /*isPaused = true;*/
//         recording = false;
//     }
// });


    function getAudio(){
        first = false;
        if($('.check_domain').val() === 'true') {
            $('.display_div').hide();
            $('.display_div:nth-child(5)').show();
        }
        // if(!isFirefox)
        //     mediaRecorder.stop();
        // else{
        //     recordRTC.stopRecording(function(videoURL) {
        //         audioMessage = recordRTC.getBlob();
        //     });
        // }
        timer.stop();
        // document.getElementById('pause').style.display = 'none';
        document.getElementById('play').style.display = 'inline-block';
        recording = false;

        var leftBuffer = mergeBuffers ( leftchannel, recordingLength );
        var rightBuffer = mergeBuffers ( rightchannel, recordingLength );
        var interleaved = interleave ( leftBuffer, rightBuffer );

        var buffer = new ArrayBuffer(44 + interleaved.length * 2);
        var view = new DataView(buffer);

        writeUTFBytes(view, 0, 'RIFF');
        view.setUint32(4, 44 + interleaved.length * 2, true);
        writeUTFBytes(view, 8, 'WAVE');
        writeUTFBytes(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 2, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 4, true);
        view.setUint16(32, 4, true);
        view.setUint16(34, 16, true);
        writeUTFBytes(view, 36, 'data');
        view.setUint32(40, interleaved.length * 2, true);

        var lng = interleaved.length;
        var index = 44;
        var volume = 1;
        for (var i = 0; i < lng; i++){
            view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
            index += 2;
        }

        var blob = new Blob ( [ view ], { type : 'audio/wav' } );

        var xhr=new XMLHttpRequest();

        var fd = new FormData();

        fd.append("file",blob);

        xhr.open("POST","/messages/upload-audio-file");

        $("#spanimg").css("display", "inline-block");

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert("An Error Occured.");
            } else {
                $("#spanimg").css("display", "none");
                $('#playing').show();
                $('.hidden_div').show();

                localStorage.message_length = message_length;
                localStorage.fileName = JSON.parse(xhr.responseText).file_name;
                localStorage.id = JSON.parse(xhr.responseText).id;
                localStorage.file = audiostorage + JSON.parse(xhr.responseText).file_name;
                $('#music').prop('src', localStorage.file);
                document.getElementById('message_length').innerHTML = localStorage.message_length;

                document.getElementById("file_name").value = localStorage.fileName;
                document.getElementById("duration").value = localStorage.message_length;
                document.getElementById('token').value = localStorage.token;
                seconds1 = 0;
                seconds2 = 0;
                minutes = 0;
                message_length = '0:00';
                leftchannel.length = rightchannel.length = 0;
                recordingLength = 0;

            }
        }

        xhr.send(fd);
    }

    $(".stop").on('click', function(){
        if($('.check_domain').val() === 'true') {
            getAudio();
        }
    });

    function interleave(leftChannel, rightChannel){
        var length = leftChannel.length + rightChannel.length;
        var result = new Float32Array(length);
        var inputIndex = 0;
        for (var index = 0; index < length; ){
            result[index++] = leftChannel[inputIndex];
            result[index++] = rightChannel[inputIndex];
            inputIndex++;
        }
        return result;
    }

    function mergeBuffers(channelBuffer, recordingLength){
        var result = new Float32Array(recordingLength);
        var offset = 0;
        var lng = channelBuffer.length;
        for (var i = 0; i < lng; i++){
            var buffer = channelBuffer[i];
            result.set(buffer, offset);
            offset += buffer.length;
        }
        return result;
    }

    function writeUTFBytes(view, offset, string){
        var lng = string.length;
        for (var i = 0; i < lng; i++){
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    function success(e){
        audioContext = window.AudioContext || window.webkitAudioContext;
        context = new audioContext();
        sampleRate = context.sampleRate;

        volume = context.createGain();
        audioInput = context.createMediaStreamSource(e);
        audioInput.connect(volume);
        var bufferSize = 2048;
        recorder = context.createScriptProcessor(bufferSize, 2, 2);

        recorder.onaudioprocess = function(e){
            if (!recording) return;
            var left = e.inputBuffer.getChannelData (0);
            var right = e.inputBuffer.getChannelData (1);
            leftchannel.push (new Float32Array (left));
            rightchannel.push (new Float32Array (right));
            recordingLength += bufferSize;
        }
        volume.connect (recorder);
        recorder.connect (context.destination);

        $('#popup20 #play').show();
        $('#popup4 #play').show();
        $('#popup32 #play').show();
    }

    //Videomessage.js
    var videostorage = "/uploads/video/";
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
                video: {
                    mandatory: {
                        // chromeMediaSource: 'screen',
                        //minWidth: 1280,
                        //minHeight: 720,

                        maxWidth: 600,
                        maxHeight: 600,

                        // minFrameRate: 3,
                        // maxFrameRate: 32,

                        //minAspectRatio: 1.77
                    },
                optional: []
            }
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
        recordRTC = RecordRTC(stream, options);

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
        recordingAlreadyStopped = false;
        if($('.check_domain').val() === 'true') {
            document.getElementById('capture').style.display        =   'none';
            document.getElementById('video-stop').style.display     =   'inline-block';
            //if(!isFirefox) {
            //    mediaRecorder.start(6000000);
            //    if($('.is_premium').val() == false) {
            //        setTimeout(getVideo, 300000);
            //    } else {
            //        setTimeout(getVideo, 600000);
            //    }
            //} else {
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
            //}
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
        if (recordingAlreadyStopped === true) {
            console.log('recording already stopped');
            return;
        }

        recordingAlreadyStopped = true;

        if($('.check_domain').val() === 'true') {
            $('.display_div').hide();
            $('.display_div:nth-child(10)').show();
        }

        recordRTC.stopRecording(function(videoURL) {
            videoMessage = recordRTC.getBlob();
        });

        timer.stop();

        document.getElementById('video-pause').style.display    =   'none';
        document.getElementById('video-stop').style.display     =   'none';
        document.getElementById('capture').style.display        =   'inline-block';

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
                localStorage.id = response.id;
                localStorage.fileName = response.file_name;
                messageInitialized = true;
                var videoData = new FormData();
                videoData.append('videofile', videoMessage);
                videoData.append('length', message_length);
                videoData.append('fileName', localStorage.fileName);
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

        var intervalCount = 0;
        var intervalFrequency = 10 * 1000; // in microseconds
        var intervalTimelimit = 30 * 60000; // in microseconds
        var intervalID5 = setInterval(function() {
            if (messageInitialized === false) {
                return;
            }
            intervalCount++;
            console.log('running interval', intervalCount);
            if (intervalCount * intervalFrequency > intervalTimelimit) {
                console.log('cleared interval');
                clearInterval(intervalID5);
            }

            $.ajax({
                method: "GET",
                url: "/video-done/" + localStorage.fileName,
                contentType: false,
            })
            .complete(function(res) {
                console.log('ajax complete: ', res);

                if (JSON.parse(res.responseText) != true) {
                    console.log('not true');
                    return;
                }

                console.log('cleared interval');
                clearInterval(intervalID5);

                console.log('is true');
                $("#videospanimg").css("display", "none");
                $('.btn-holder').show();

                localStorage.message_length =   message_length;
                //localStorage.fileName       =   fileName;
                localStorage.file           =   videostorage + localStorage.fileName;
                // localStorage.id             =   JSON.parse(res.responseText).id;
                console.log('show recording');
                $('#video_watch').prop('src', localStorage.file);

                document.getElementById('message_length').innerHTML =   localStorage.message_length;
                document.getElementById("video_file_name").value    =   localStorage.fileName;
                document.getElementById("video_duration").value     =   localStorage.message_length;
                document.getElementById('video_token').value        =   localStorage.token;

                seconds1        =   0;
                seconds2        =   0;
                minutes         =   0;
                message_length  =   '0:00';
            })
            .error(function(err) {
                console.log('ajax error: ', err);
            });
        }, intervalFrequency);
    }
} else {
    console.log('load flash');
    console.log('http is no longer supported by Voicestak, please use https instead of http');
}



// Credit to Ludwig: http://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
(function (window) {
    {
        var unknown = ' ';

        // screen
        var screenSize = '';
        if (screen.width) {
            var width = (screen.width) ? screen.width : '';
            var height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else  {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));