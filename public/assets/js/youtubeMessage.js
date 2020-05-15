if($('.check_domain').val() === 'true') {
	var _Nimbb;

	/* Global variable to hold the guid of the recorded video. */
	var _Guid = "";

	/* Global variables for timer. */
	var _Timer;
	var _Count;

	/* Constant for maximum recording time (in seconds). */
	var MAX_TIME = 300;

	/* Event: Nimbb Player has been initialized and is ready. */
	function Nimbb_initCompleted(idPlayer) {
	  	/* Get a reference to the player since it was successfully created. */
	  	_Nimbb = document[idPlayer];
	}

	/* Event: the player has stopped recording. */
	function Nimbb_recordingStopped(idPlayer) {
	  	/* Tell the player to save video now. */
	  	_Nimbb.saveVideo();
	}

	/* Event: the state of the player changed. */
	function Nimbb_stateChanged(idPlayer, state) {
	  	/*Update button text.*/
	  	updateText();
	}

	/* Event: the video was saved. */
	function Nimbb_videoSaved(idPlayer) {
	  	/* Get video GUID. */
	  	_Guid = _Nimbb.getGuid();

	  	if($('.check_domain').val() === 'true') {
          	$('.display_div').hide();
          	$('.display_div:nth-child(10)').show();
        }

	  	var formData 	= 	new FormData();
        var xhr 		= 	new XMLHttpRequest();

        formData.append('nimbb_id', _Guid);
        xhr.open("POST","/messages/upload-file",true);
        xhr.send(formData);

	  	xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {

            }
        };
	}

	/* Event: the timer count. */
	function Timer_Count() {
	  	/* Decrement total count and check if we have reached the maximum time. */
	  	_Count--;

	  	if( _Count == 0 ) {
	  	  	/* Stop the recording. */
	  	  	stop();
	  	  	return;
	  	}

	  	/* Update button text. */
	  	updateText();

	  	/* Let's continue the timer. */
	  	_Timer = setTimeout("Timer_Count()", 1000);
	}

	/* Called when user clicks the link. */
	function action() {
	  	/* Check player's state and call appropriate action. */
	  	if( _Nimbb.getState() == "recording" ) {
	  	  	stop();
	  	} else {
	  	  	record();
	  	}
	}

	/* Start recording the video. */
	function record() {
	 	/* Make sure the user has allowed access to camera. */
	 	if( !_Nimbb.isCaptureAllowed() ) {
	 	  	alert("You need to allow access to your webcam.");
	 	  	return;
	 	}

	 	/* Make sure the user is not already recording. */
	 	if( _Nimbb.getState() == "recording" ) {
	 	  	alert("You are already recording a video.");
	 	  	return;
	 	}

	 	/* Prepare timer object. */
	 	_Count = MAX_TIME + 1;
	 	Timer_Count();

	 	/* Start recording. */
	 	_Nimbb.recordVideo();
	}

	/* Stop recording the video. */
	function stop() {
		/* Make sure the user is recording. */
		if( _Nimbb.getState() != "recording" ) {
		  	alert("You need to record a video.");
		  	return;
		}

		/* Stop timer. */
		clearTimeout(_Timer);

		/* Stop recording. */
		_Nimbb.stopVideo();
	}

	/* Update text on the link. */
	function updateText() {
	 	var actionButton = document.getElementById("capture");
	 	/* Check player's state. */
	 	if( _Nimbb.getState() == "recording" ) {
	 	  	/* Update link text. */
	 	  	actionButton.innerHTML = "stop (" + _Count + ")";
	 	} else {
	 	  	actionButton.innerHTML = "record";
	 	}
	}
}