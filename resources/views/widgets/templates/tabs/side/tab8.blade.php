@if(isset($widget->tab_design_text))
<div class="widget-footer-8-cont widget-side-8-cont">
	<div class="widget-footer-8">
		<div class="arrow">
			<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color_2 !!}" @endif>
				{{json_decode($widget->tab_design_text)[0]}}</div>
			</div>
		</div>
		<div class="left-right-cont">
			<div class="left-part" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
				<div class="image-cont">
					<div class="image"></div>
				</div>
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					{{json_decode($widget->tab_design_text)[0]}}</div>
				</div>
			</div>
			<div class="right-part" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_3 !!}" @endif>
				<div class="triangle-part" @if(isset($widget) && $widget->tab_bg_color !='') style="border-color: {!! $widget->tab_bg_color !!} transparent transparent transparent;" @endif></div>
				<div class="image-cont">
					<div class="image"></div>
				</div>
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					{{json_decode($widget->tab_design_text)[1]}}</div>
				</div>
			</div>
		</div>
	</div>
</div>
@elseif(isset($widget->tab_design_text_one))
<div class="widget-footer-8-cont widget-side-8-cont">
	<div class="widget-footer-8">
		<div class="arrow">
			<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color_2 !!}" @endif>
				{!! $widget->tab_design_text_one !!}
			</div>
		</div>
		<div class="left-right-cont">
			<div class="left-part" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
				<div class="image-cont">
					<div class="image"></div>
				</div>
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					{!! $widget->tab_design_text_three !!}
				</div>
			</div>
			<div class="right-part" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_3 !!}" @endif>
				<div class="triangle-part" @if(isset($widget) && $widget->tab_bg_color !='') style="border-color: {!! $widget->tab_bg_color !!} transparent transparent transparent;" @endif></div>
				<div class="image-cont">
					<div class="image"></div>
				</div>
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					{!! $widget->tab_design_text_two !!}
				</div>
			</div>
		</div>
	</div>
</div>
@else
<div class="widget-footer-8-cont widget-side-8-cont">
	<div class="widget-footer-8">
		<div class="arrow">
			<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color_2 !!}" @endif>
				SEND A
			</div>
		</div>
		<div class="left-right-cont">
			<div class="left-part" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color !!}" @endif>
				<div class="image-cont">
					<div class="image"></div>
				</div>
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					Voice Message
				</div>
			</div>
			<div class="right-part" @if(isset($widget)) style="background-color: {!! $widget->tab_bg_color_3 !!}" @endif>
				<div class="triangle-part" @if(isset($widget) && $widget->tab_bg_color !='') style="border-color: {!! $widget->tab_bg_color !!} transparent transparent transparent;" @endif></div>
				<div class="image-cont">
					<div class="image"></div>
				</div>
				<div class="text" @if(isset($widget)) style="color: {!! $widget->tab_text_color !!}" @endif>
					Video Message
				</div>
			</div>
		</div>
	</div>
</div>
@endif