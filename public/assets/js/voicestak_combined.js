function getParentUrl() {
    var isInIframe = (parent !== window),
        parentUrl = null;

    if (isInIframe) {
        parentUrl = document.referrer;
    }

    return parentUrl;
}

var parent_url = getParentUrl();
navigator.getUserMedia = navigator.mediaDevices.getUserMedia; // navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var recordingAlreadyStopped = false;

if (parent_url != undefined && parent_url.indexOf('https') === -1) {
    console.log('http is no longer supported by Voicestak, please use HTTPS instead of HTTP');
}

if (!navigator.getUserMedia) {
    console.log('browser does not support WebRTC, loading flash');
    var swfobject=function(){
        var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

    $('.videoFlash').on('click' , function() {
        $.each( $('script'), function( key, value ) {
            if($(value).attr('src') == '/assets/js/flash-recorder.js') {
                $(this).remove();
            }

            if($(value).attr('src') == '/assets/js/flash_audioRecorder.js') {
                $(this).remove();
            }
        });

        var script_flash  = document.createElement('script');
        script_flash.type = "text/javascript";
        script_flash.src  = "/assets/js/flash-recorder.js";
        document.getElementsByTagName('body')[0].appendChild(script_flash);
    });

    $('.audioFlash').on('click' , function() {
        $.each( $('script'), function( key, value ) {
            if($(value).attr('src') == '/assets/js/flash-recorder.js') {
                $(this).remove();
            }

            if($(value).attr('src') == '/assets/js/flash_audioRecorder.js') {
                $(this).remove();
            }
        });

        var script_audio  = document.createElement('script');
        script_audio.type = "text/javascript";
        script_audio.src  = "/assets/js/flash_audioRecorder.js";
        document.getElementsByTagName('body')[0].appendChild(script_audio);
    });
} else {
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
    var first = true;

    $('#popup18 .btn-popup,#popup2 .btn-popup,#popup30 .start-video').click(function(){
        if($('.check_domain').val() === 'true') {
            $('#popup20 #play').hide();
            $('#popup4 #play').hide();
            $('#popup32 #play').hide();

            if (!navigator.mediaDevices.getUserMedia) {
                alert('navigator.mediaDevices.getUserMedia is not supported');
            }

            navigator.mediaDevices.getUserMedia({audio: true})
                .then(function(stream) {
                    success(stream);
                })
                .catch(function(err) {
                    console.error(err);
                    alert('Error capturing audio.');
                });
        }
    });

    function onMediaSuccess(stream) {
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
        alert('Oops!!! You have a problem with Your camera or You don\'t have permissions to use it.');
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

            if (!navigator.mediaDevices.getUserMedia) {
                alert('navigator.mediaDevices.getUserMedia is not supported by your device');
                return;
            }

            navigator.mediaDevices.getUserMedia(mediaConstraints)
                .then(function(stream) {
                    onMediaSuccess(stream);
                })
                .catch(function(err) {
                    onMediaError(err);
                });
        }
    });

    function onMediaSuccess(stream) {
        if(stream.getVideoTracks().length == 0) {
            console.log('Error on media success');
            alert('Error Capturing Video. Please check that your webcam is connected.');
            return false;
        }
        video = document.querySelector('video');
        console.log('log stream', stream);
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;

        var options = {};
        recordRTC = RecordRTC(stream, options);

        $('#popup9 #capture').show();
        $('#popup15 #capture').show();
        $('#popup27 #capture').show();
    }

    function onMediaError(e) {
        console.log('error on media error');
        alert('Error Capturing Video. Please check that your webcam is connected.');
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
            timer.play();
        }
    });

    if (document.getElementById('vs-recorder')) {
        var recorder = document.getElementById('vs-recorder');

        recorder.addEventListener('change', function(e) {
            var file = e.target.files[0];
            // Do something with the video file.
//        player.src = URL.createObjectURL(file);

            if($('.check_domain').val() === 'true') {
                $('.display_div').hide();
                $('.display_div:nth-child(10)').show();
            }

            try {
                document.getElementById('video-pause').style.display    =   'none';
                document.getElementById('video-stop').style.display     =   'none';
                document.getElementById('capture').style.display        =   'inline-block';    
            } catch (err) {
                console.log(err);
            }
            

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
                        videoData.append('videofile', file);
                        videoData.append('length', message_length);
                        videoData.append('fileName', localStorage.fileName);
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
                        document.getElementById('done-processing-heading').innerHTML = 'Done processing!';
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


        });
    }


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
    });
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