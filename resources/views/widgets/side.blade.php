<link href="/assets/css/style.css" rel="stylesheet">
<script type="text/javascript" src="/assets/js/jquery.min.js"></script>
<script type="text/javascript" src="/assets/js/tabs.js"></script>
<style>body{background: transparent!important;}</style>

<div class="side-widget tabs-container">
	@if(isset($widget_id))
		@if($widget->tab_type=='voice')
			@include('widgets.templates.tabs.side.voice.tab'.$widget_id)
		@elseif ($widget->tab_type=='video')
			@include('widgets.templates.tabs.side.video.tab'.$widget_id)
		@else
			@include('widgets.templates.tabs.side.tab'.$widget_id)
		@endif
	@elseif(isset($widget->tab_design))
		@if($widget->tab_type=='voice')
			@include('widgets.templates.tabs.side.voice.tab'.$widget->tab_design)
		@elseif ($widget->tab_type=='video')
			@include('widgets.templates.tabs.side.video.tab'.$widget->tab_design)
		@else
			@include('widgets.templates.tabs.side.tab'.$widget->tab_design)
		@endif
	@endif
</div>