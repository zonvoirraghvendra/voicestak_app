<body @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
	<link href="/assets/css/style.css" rel="stylesheet">
	<link href="/assets/css/theme-default.min.css" rel="stylesheet">
	
	<script type="text/javascript" src="/assets/js/jquery.min.js"></script>
	<script type="text/javascript" src="/assets/js/tabs.js"></script>

	<div class="popup-widget">
		@for($i = 1; $i <= 12; $i++)
			@include('widgets.templates.popups.design'.$widget_design.'.step'.$i, ['ios' => $ios])
		@endfor
		@if(isset($is_premium))
			<input type="hidden" class="is_premium" value="{{$is_premium}}">
		@endif
	</div>

	<script type="text/javascript">
		$('#validate_inputs, #validate_inputs_video').on('click', function() {
			var that = $(this);
			if($('.check_domain').val() === 'true') {
		    	if(that.parents('form')[0].checkValidity()) {
		    	    $('.voice_subscribe_popup').hide();
		    	    $('.video_subscribe_popup').hide();

		    	    $('.consent_page').show();
		    	} else {
		    	    $(document.querySelectorAll('.inputs')).each(function(index, el) {
		    	        if(el.validationMessage){
		    	            $(el).attr('placeholder', el.validationMessage);
		    	            $(el).val('');
		    	            $(el).parent('.text-field').css("border-color", "red");
		    	        }
		    	    });
		    	}
		    }
		});

		$('#finish').on('click', function() {
			var checkbox = document.getElementById('consentCheckbox');
			if($('.check_domain').val() === 'true') {
				if( checkbox.checked ) {
	        		$('#consent').val('1');
				} else {
					$('#consent').val('0');
				}
	        }
	    })

	    $('#finish_video').on('click', function() {
			var checkbox = document.getElementById('consentCheckbox');
			if($('.check_domain').val() === 'true') {
				if( checkbox.checked ) {
	        		$('#consent').val('1');
				} else {
					$('#consent').val('0');
				}
	        }
	    })
	</script>
	<input type="hidden" class="check_domain" value="true">
	{{--<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>--}}
	<script>
//	    var remoteAddr = '<?= $_SERVER['REMOTE_ADDR'] ?>';
//
//
//	    window.devpc = remoteAddr === '196.210.21.176';
//	    console.log('remote addr: ', remoteAddr, window.devpc);
	</script>
	<script src="/assets/js/voicestak_record.js"></script>
	<script src="/assets/js/popups.js"></script>
	<script>
		@if (isset($saveraw) && $saveraw == 'true')
			window.vssaveraw = true;
		@endif
	</script>
	<script src="/assets/js/voicestak_combined.js"></script>
	<script src="/assets/js/validator.js"></script>
</body>