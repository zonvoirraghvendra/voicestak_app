<div class="display_div d1 step_12 thankyou-page" @if(isset($show) && $show == 1) style="display: inline-block;" @else style="display: none;" @endif>
	<div class="thankyou"><h2>
		@if(isset($widget) && isset($widget->ty_msg) && $widget->ty_msg != '')
		{!! $widget->ty_msg !!}
		@else
		Your Message has been Sent!
		@endif
	</h2></div>
</div>
<link rel="stylesheet" type="text/css" href="/assets/css/style.css">