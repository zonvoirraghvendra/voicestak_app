<script>
	$( document ).ready(function() {
		@if(isset($widget) && $widget->tab_bg_color != '')
		var NewColor = LightenDarkenColor('{!! $widget->tab_bg_color !!}', -50);
		$('.widget-side-2').css({'box-shadow': 'inset 0 -10px 15px '+NewColor});
		@endif
	})
</script>


@if(isset($widget->tab_design_text))
<div class="widget-footer-2 widget-side-2 rotate" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
	<div class="main-text-cont">
		<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif> {{json_decode($widget->tab_design_text)[0]}}</div>
		<div class="image-cont1" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
			<div class="image"></div>
		</div>
		<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif> {{json_decode($widget->tab_design_text)[1]}}</div>
		<div class="image-cont2" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
			<div class="image"></div>
		</div>
		<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>{{json_decode($widget->tab_design_text)[2]}}</div>
	</div>
</div> 
@elseif(isset($widget->tab_design_text_one))
<div class="widget-footer-2 widget-side-2 rotate" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
	<div class="main-text-cont">
		<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif> {!! $widget->tab_design_text_one !!}</div>
			<div class="image-cont1" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
				<div class="image"></div>
			</div>
			<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>{!! $widget->tab_design_text_two !!}</div>
			<div class="image-cont2" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
				<div class="image"></div>
			</div>
			<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>{!! $widget->tab_design_text_three !!}</div>
		</div>
	</div>
	@else 
	<div class="widget-footer-2 widget-side-2 rotate" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
		<div class="main-text-cont">
			<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>Send a</div>
			<div class="image-cont1" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
				<div class="image"></div>
			</div>
			<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>Video Or</div>
			<div class="image-cont2" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
				<div class="image"></div>
			</div>
			<div class="main-text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>Voice Message</div>
		</div>
	</div> 
	@endif

