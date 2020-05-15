<div style="display: none;" class="display_div d3 thankyou-page" @if(isset($widget)) style="background-color: {!! $widget->widget_bg_color !!}" @endif>
	<div class="thank_you_message" @if(isset($widget)) style="color: {!! $widget->widget_text_color !!}" @endif>
		@if(isset($widget) && isset($widget->ty_msg) && $widget->ty_msg != '')
                                        {!! $widget->ty_msg !!}
                                        @else
                                        Your Message has been Sent!
                                        @endif
</div>
</div>
<link rel="stylesheet" type="text/css" href="/assets/css/style.css">