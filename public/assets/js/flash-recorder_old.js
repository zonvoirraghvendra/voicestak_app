var storage = "/uploads/video/";
console.log('storage: ' + storage);
var flashvars = {
	quality : 20,
	mode: "cam"
};
console.log('flashvars: ' + flashvars);
function makeToken(length)
{
	if (!length) {
		length = 32;
	}
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
var token = makeToken(32);
console.log('token: ' + token);
//return false;
var params = {
	menu: "false",
	scale: "noScale",
	allowFullscreen: "true",
	allowScriptAccess: "always",
	bgcolor: "",
	wmode: "direct" // can cause issues with FP settings & webcam
};
console.log('params: ' + params);
var attributes = {
	id:"flashrecorder"
};
console.log('attributes: ' + attributes);
console.log(swfobject);




swfobject.embedSWF(
	"/assets/flash_recorder/bin/flashrecorder(2).swf", 
	"recording-box", "400", "300", "10.0.0", 
	"/assets/flash_recorder/bin/expressInstall.swf", 
	flashvars, params, attributes);
console.log(swfobject);        

// BRIDGE STUFF
// logs from Flash
function log() {
	var log = Function.prototype.bind.call(console.log, console);
	log.apply(console, arguments);
}
var audio_complete = false;
var images_complete = false;
var audio_bytes = [];
var bytes = [];
var temp_bytes = [];
var j = 1;
var c = 1;
var count = 0;
var audio_count = 0;
var audio_temp_bytes = [];
function swf_events(event, data){
	switch(event){
	
		case 'cam_ok':
			$('#capture').show();
		break;
		
		case 'cam_muted':
		
		break;
		
		case 'cam_not_found':
		
		break;
		
		case 'video_frame_data':
			temp_bytes.push(data.bytes);
			if ( j%20 === 0 ) {
				// console.log("Images parts");
				// console.log(temp_bytes);
				bytes.push( encodeURIComponent(temp_bytes) );
				temp_bytes.length = 0;
			}
			j++;
		break;
		
		case 'sound_recording_progress':
			audio_temp_bytes.push(data);
			if( c%5 === 0 ) {
				// console.log("Audio parts");
				// console.log(audio_temp_bytes);
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

var timeout;
var swfObject = document.getElementById("flashrecorder");
if(swfObject == null) {
    console.log('yes')
} else {
    console.log('no');
}

$('#capture').on('click', function(){
    
	var swfObject = document.getElementById("flashrecorder");
	$('#video-stop').show();
	$('#capture').hide();
	swfObject.capture();

	if($('.is_premium').val() == false){
        timeout = setTimeout(sendImages, 300000);
    } else {
        timeout = setTimeout(sendImages, 600000);
    }
})
$('#video-stop').on('click', function(){
	var swfObject = document.getElementById("flashrecorder");
	swfObject.stop();
	clearTimeout(timeout);
	$("#videospanimg").show();
	if($('.check_domain').val() === 'true') {
	    $('.display_div').hide();
	    $('.display_div:nth-child(10)').show();
	}
	document.getElementById('capture').style.display = 'inline-block';
	sendAudio();
	sendImages();
})
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

$('#re-record-video').on('click', function() {
	token = makeToken(32);
	audio_complete = false;
	images_complete = false;
	audio_bytes = [];
	bytes = [];
	temp_bytes = [];
	j = 1;
	c = 1;
	count = 0;
	audio_count = 0;
	audio_temp_bytes = [];
})

function sendImages()
{
	$.ajax({
		type    : 'POST',
		url     : '//app.voicestak.com:4444/images',
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache  : false,
		data    : {bytes: bytes[count], token : token},
		success : function(data){

			if(count < bytes.length) {
				count++;
				sendImages();
			} else {
				var final_value = encodeURIComponent(temp_bytes);
				// console.log("Images final part");
				// console.log(temp_bytes);
				$.post("//app.voicestak.com:4444/images-complete", {token:token, bytes:final_value, finish: true}, function(response){
					makeVideo();
				})
			}
		}
	})
}

function sendAudio() {
	$.ajax({
		type    : 'POST',
		url     : '//app.voicestak.com:4444/audio',
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache  : false,
		data    : {audio_bytes: audio_bytes[audio_count], token : token},
		success : function(data){

			if(audio_count < audio_bytes.length) {
				audio_count++;
				sendAudio();
			} else {
				var audio_final_value = encodeURIComponent(audio_temp_bytes);
				// console.log("Audio final part");
				// console.log(audio_final_value);
				$.post("//app.voicestak.com:4444/audio-complete", {token:token, audio_bytes:audio_final_value, finish: true}, function(response){
					audio_complete = true;
				})
			}
		}
	})
	
}

function makeVideo(){
	$.ajax({
		type    : 'POST',
		url     : '//app.voicestak.com:4444/ffmpeg',
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		cache  : false,
		data    : {token : token},
		success: function(data) {
			$.post('/messages/upload-file', {file_name: data.file_name, file_type: data.file_type}, function(res){
				
		        audio_temp_bytes.length = 0;
		        $("#videospanimg").css("display", "none");
		        $('.btn-holder').show();
		        localStorage.fileName = res.file_name;
		        localStorage.file     = storage + res.file_name;
		        localStorage.id       = res.id;
		        $('#video_watch').attr('src', localStorage.file);
		        
		        document.getElementById("video_file_name").value = localStorage.fileName;
		        document.getElementById('video_token').value     = localStorage.token;
		        token = makeToken(32);
		        audio_bytes = [];
		        bytes = [];
		        temp_bytes = [];
		        j = 1;
		        count = 0;
			})
		}
	})
}




