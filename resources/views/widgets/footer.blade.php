<link href="/assets/css/style.css" rel="stylesheet">
<script type="text/javascript" src="/assets/js/jquery.min.js"></script>
<script type="text/javascript" src="/assets/js/tabs.js"></script>
<style>body{background: transparent!important;}</style>

<div class="footer-widget tabs-container">
	@if(isset($widget_id))
		@include('widgets.templates.tabs.footer.tab'.$widget_id)
	@elseif(isset($widget->tab_design))
		@include('widgets.templates.tabs.footer.tab'.$widget->tab_design)
	@endif
</div>