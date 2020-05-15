$( document ).ready(function() {

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
    var storage = "/uploads/audio/";
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

        xhr.open("POST","/messages/upload-file");
        
        $("#spanimg").css("display", "inline-block");

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert("Error Was Occured.");
            } else {
                $("#spanimg").css("display", "none");
                $('#playing').show();
                $('.hidden_div').show();
                
                localStorage.message_length = message_length;
                localStorage.fileName = JSON.parse(xhr.responseText).file_name;
                localStorage.id = JSON.parse(xhr.responseText).id;
                localStorage.file = storage + JSON.parse(xhr.responseText).file_name;
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
})