<script>
	$( document ).ready(function() {
		@if(isset($widget) && $widget->tab_bg_color != '')
			var NewColor = LightenDarkenColor('{!! $widget->tab_bg_color !!}', -50);
			$('.widget-side-3').css({'box-shadow': 'inset 0 -10px 20px '+NewColor});
		@endif
	})
</script>

<div class="widget-footer-3 widget-side-3 rotate" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
	<div class="main-text-cont">
		<div class="image-cont" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
			<div class="image"></div>
		</div>
		<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
			@if(isset($widget->tab_design_text))
			{!! implode(' ',json_decode($widget->tab_design_text)) !!}
		@elseif(isset($widget->tab_design_text_one))
			{!! $widget->tab_design_text_one !!} {!! $widget->tab_design_text_two !!} {!! $widget->tab_design_text_three !!}
		@else Send a Video Message 
		@endif
	</div>
	</div>
</div>