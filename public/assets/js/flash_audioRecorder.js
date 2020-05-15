var audioStorage = "/uploads/audio/";
var flashvars = {
	quality : 80,
	mode: "mic"
};
var params = {
	menu: "false",
	scale: "noScale",
	allowFullscreen: "true",
	allowScriptAccess: "always",
	bgcolor: "",
	wmode: "transparent"
};
var attributes = {
	id:"flashrecorder"
};
swfobject.embedSWF(
	"/assets/flash_recorder/bin/flashrecorder(4)(4).swf", 
	"flash-box", "250", "150", "10.0.0", 
	"/assets/flash_recorder/bin/expressInstall.swf", 
	flashvars, params, attributes);

function makeToken(length)
{
	if (!length) {
		length = 32;
	}
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log('token made: ' + text);
    return text;
}

var token = makeToken(32);
var audio_bytes = [];
var audio_temp_bytes = [];
var c = 1;
var audio_count = 0;

// BRIDGE STUFF
// logs from Flash
function log() {
	var log = Function.prototype.bind.call(console.log, console);
	log.apply(console, arguments);
}

function swf_events(event, data){
	switch(event){
		case 'mic_ok':	
			$('#play').show();
			$('.flash_cont').css({'height': 0});
			// $('#flashrecorder').css({'visibility' : 'hidden'});
		break;

		case 'mic_muted':
			$('#play').hide();
		break;
		
		case 'cam_not_found':
			
		break;
		
		case 'video_frame_data':

		break;
		
		case 'sound_recording_progress':
			// audio_bytes.push(data);
			audio_temp_bytes.push(data);
			if( c%5 === 0 ) {
				audio_bytes.push(encodeURIComponent(audio_temp_bytes));
				audio_temp_bytes.length = 0;
			}
			c++;
		break;
		
		case 'generation_wave_complete':

		break;
		
		case 'mp3_encode_progress':

		break;
		
		case 'mp3_encode_complete':
	
		break;
	
	}

	return true;
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
var timeout;
$('#play').on('click', function() {
	timer.play();
	var swfObject = document.getElementById("flashrecorder");
	$('#stop').show();
	$('#play').hide();
	swfObject.capture();
	

	if($('.is_premium').val() == false){
        timeout = setTimeout(sendAudio, 300000);
    } else {
        timeout = setTimeout(sendAudio, 600000);
    }
})

$('#stop').on('click', function() {
	clearTimeout(timeout);
	timer.stop();
	var swfObject = document.getElementById("flashrecorder");
	swfObject.stop();
    $("#spanimg").show();
	localStorage.message_length = message_length;
	if($('.check_domain').val() === 'true') {
       $('.display_div').hide();
       $('.display_div:nth-child(5)').show();
    }
    document.getElementById('play').style.display = 'inline-block';
	sendAudio();
})

$('#re-record').on('click', function(){
	token = makeToken(32);
	audio_count = 0;
	c = 1;
	audio_bytes = [];
	audio_temp_bytes = [];
})
// function getFlashAudio() {
	
//  	$.post('/messages/upload-file', {flashAudio: encodeURIComponent(audio_bytes), token: token}, function(response){
//  		audio_bytes.length = 0;
//         $("#spanimg").css("display", "none");
//         $('.btn-holder').show();

//         localStorage.fileName       =   response.file_name;
//         localStorage.file           =   audioStorage + response.file_name;
//         localStorage.id             =   response.id;
        
//         $('#music').prop('src', localStorage.file);
//         document.getElementById('message_length').innerHTML = localStorage.message_length;
//         document.getElementById("file_name").value = localStorage.fileName;
//         document.getElementById("duration").value = localStorage.message_length;
//         document.getElementById('token').value = localStorage.token;

//         seconds1 = 0;
// 	    seconds2 = 0;
// 	    minutes = 0;
// 	    message_length = '0:00';
        
//  	})
//  	if($('.check_domain').val() === 'true') {
//         $('.display_div').hide();
//         $('.display_div:nth-child(5)').show();
//     }

//     document.getElementById('play').style.display = 'inline-block';
// }

function sendAudio() {
	console.log('jr sending audio');
	$.ajax({
		type    	: 'POST',
		url     	: 'https://app.voicestak.com:4444/only-audio',
		contentType : "application/x-www-form-urlencoded;charset=UTF-8",
		cache  		: false,
		data    	: {flashAudio: audio_bytes[audio_count], token : token},
		success 	: function(data){
			if(audio_count < audio_bytes.length) {
				audio_count++;
				sendAudio();
			} else {
				var audio_final_value = encodeURIComponent(audio_temp_bytes);
				$.post("https://app.voicestak.com:4444/only-audio-complete", {token:token, flashAudio:audio_final_value, finish: true}, function(data){
				 	$.post('/messages/upload-file', {file_name: data.file_name, file_type: data.file_type}, function(response){
				 		audio_bytes.length = 0;
				        $("#spanimg").css("display", "none");
				        $('#playing').show();
				        $('.btn-holder').show();
				        $('.btn-holder-r').show();
				        localStorage.fileName = response.file_name;
				        localStorage.file     = audioStorage + response.file_name;
				        localStorage.id       = response.id;
				        
				        $('#music').prop('src', localStorage.file);
				        document.getElementById('message_length').innerHTML = localStorage.message_length;
				        document.getElementById("file_name").value = localStorage.fileName;
				        document.getElementById("duration").value = localStorage.message_length;
				        document.getElementById('token').value = localStorage.token;

				        seconds1 = 0;
					    seconds2 = 0;
					    minutes  = 0;
					    message_length = '0:00';
				        
				 	})
				})
			}
		}
	})
	
}