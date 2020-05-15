$(document).ready(function(){

	/* Design 1 */
	$('#start-voice-1').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(2)').show();
		}
	});

	$('#popup2 .btn-popup').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(4)').show();
		}
	});
	
	// $('#popup2 .audioFlash').click(function(){
	// 	if($('.check_domain').val() === 'true') {
	// 		$('.display_div').hide();
	// 		$('.display_div:nth-child(3)').show();
	// 	}
	// });

	$('#popup5 #re-record').click(function(){
		if($('.check_domain').val() === 'true') {
			document.getElementById('record_length').innerHTML = '0:00';
			$("#playing").hide();
			$('#popup4 .btn-stop').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(4)').show();
		}
	});

	$('#popup5 .btn-send').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(6)').show();
		}
	});

	$('#popup6 .restart_btn').click(function(){
		if($('.check_domain').val() === 'true') {
			document.getElementById('record_length').innerHTML = '0:00';
			$("#playing").hide();
			$('#popup4 .btn-stop').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(1)').show();
		}
	});



	$('#start-video-1').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(7)').show();
		}
	});

	$('#popup7 .btn-popup').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(9)').show();
		}
	});

	$('#popup10 #re-record-video').click(function(){
		if($('.check_domain').val() === 'true') {
			var video = document.getElementById('video_watch');
            video.pause();
			$('#play_back').show();
            $('#video-pause').hide();
			$('#popup9 .video-stop').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(9)').show();
		}
	});

	$('#popup10 #send-video').click(function(){
        
	});

	$('#popup11 .restart_btn').click(function(){
		if($('.check_domain').val() === 'true') {
			$('#popup9 .video-stop').hide();
			$('#play_back').show();
			$('#video-pause').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(1)').show();
		}
	});
	/* /// */

	/* Design 2 */
	$('#start-voice-2').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(2)').show();
		}
	});

	$('#popup18 .btn-popup').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(4)').show();
		}
	});

	$('#popup21 #re-record').click(function(){
		if($('.check_domain').val() === 'true') {
			document.getElementById('record_length').innerHTML = '0:00';
			$("#playing").hide();
			$('#popup20 .btn-stop').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(4)').show();
		}
	});

	$('#popup21 .btn-send').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(6)').show();
		}
	});

	$('#popup22 .restart_btn').click(function(){
		if($('.check_domain').val() === 'true') {
			document.getElementById('record_length').innerHTML = '0:00';
			$("#playing").hide();
			$('#popup20 .btn-stop').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(1)').show();
		}
	});





	$('#start-video-2').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(7)').show();
		}
	});

	$('#popup13 .btn-popup').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(9)').show();
		}
	});

	$('#popup16 #re-record-video').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.video-stop').hide();
			var video = document.getElementById('video_watch');
            video.pause();
			$('#play_back').show();
            $('#video-pause').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(9)').show();
		}
	});


	$('#popup17 .restart_btn').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.video-stop').hide();
			$('#play_back').show();
            $('#video-pause').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(1)').show();
		}
	});
	/* /// */


	/* Design 3 */
	$('#start-voice-3').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(2)').show();
		}
	});

	$('#popup30 .start-video').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(4)').show();
		}
	});

	$('#popup33 #re-record').click(function(){
		if($('.check_domain').val() === 'true') {
			document.getElementById('record_length').innerHTML = '0:00';
			$("#playing").hide();
			$('#popup32 .btn-stop-r').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(4)').show();
		}
	});

	$('#popup33 .btn-send-r').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(6)').show();
		}
	});

	$('#popup29 .restart_btn').click(function(){
		if($('.check_domain').val() === 'true') {
			document.getElementById('record_length').innerHTML = '0:00';
			$("#playing").hide();
			$('#popup32 .btn-stop-r').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(1)').show();
		}
	});



	$('#start-video-3').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(7)').show();
		}
	});

	$('#popup25 .start-video').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(9)').show();
		}
	});

	$('#popup28 #re-record-video').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.video-stop').hide();
			var video = document.getElementById('video_watch');
            video.pause();
			$('#play_back').show();
            $('#video-pause').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(9)').show();
		}
	});

	$('#popup28 #send-video').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.display_div').hide();
			$('.display_div:nth-child(11)').show();
		}
	});

	$('#popup34 .restart_btn').click(function(){
		if($('.check_domain').val() === 'true') {
			$('.video-stop').hide();
			$('#play_back').show();
            $('#video-pause').hide();
			$('.display_div').hide();
			$('.display_div:nth-child(1)').show();
		}
	});
	/* /// */


	var href = window.location.href;
	localStorage.token = href.substr(href.lastIndexOf('/') + 1);
})