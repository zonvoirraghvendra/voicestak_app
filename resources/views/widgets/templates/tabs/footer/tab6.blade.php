<script>
	$( document ).ready(function() {
		@if(isset($widget) && $widget->tab_bg_color != '')
			var NewColor = LightenDarkenColor('{!! $widget->tab_bg_color !!}', -30);
			$('.widget-footer-6').css({'box-shadow': 'inset 0 -10px 20px '+NewColor});
		@endif
	})
</script>



@if(isset($widget->tab_design_text))
<div class="widget-footer-6-cont widget-footer-6-cont-media">
	<div class="top-part">
		<div class="text" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_3 !!}; color: {!! $widget->tab_text_color_2 !!}" @endif>
			{{json_decode($widget->tab_design_text)[0]}}
		</div>
	</div>
	<div class="widget-footer-6-shadow">
		<div class="widget-footer-6" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
			<div class="left-part">
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					{{json_decode($widget->tab_design_text)[1]}}
				</div>
				<div class="image-cont" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
					<div class="image"></div>
				</div>
			</div>
			<div class="right-part">
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					{{json_decode($widget->tab_design_text)[2]}}
				</div>
				<div class="image-cont" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
					<div class="image"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@elseif(isset($widget->tab_design_text_one))
<div class="widget-footer-6-cont widget-footer-6-cont-media">
	<div class="top-part">
		<div class="text" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_3 !!}; color: {!! $widget->tab_text_color_2 !!}" @endif>
			{!! $widget->tab_design_text_one !!}
		</div>
	</div>
	<div class="widget-footer-6-shadow">
		<div class="widget-footer-6" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
			<div class="left-part">
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					{!! $widget->tab_design_text_two !!}
				</div>
				<div class="image-cont" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
					<div class="image"></div>
				</div>
			</div>
			<div class="right-part">
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					{!! $widget->tab_design_text_three !!}
				</div>
				<div class="image-cont" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
					<div class="image"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@else
<div class="widget-footer-6-cont widget-footer-6-cont-media">
	<div class="top-part">
		<div class="text" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_3 !!}; color: {!! $widget->tab_text_color_2 !!}" @endif>
			SEND A
		</div>
	</div>
	<div class="widget-footer-6-shadow">
		<div class="widget-footer-6" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
			<div class="left-part">
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					Video Message
				</div>
				<div class="image-cont" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
					<div class="image"></div>
				</div>
			</div>
			<div class="right-part">
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					Voice Message
				</div>
				<div class="image-cont" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_2 !!}" @endif>
					<div class="image"></div>
				</div>
			</div>
		</div>
	</div>
</div>
@endif