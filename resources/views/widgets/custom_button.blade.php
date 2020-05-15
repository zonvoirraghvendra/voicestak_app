<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link href="/assets/css/style.css" rel="stylesheet">
<script type="text/javascript" src="/assets/js/jquery.min.js"></script>
<style>body{background: transparent!important;}</style>

<div class="custom-button-container">
	<div class="tabs-container">
		@if(isset($widget))
			{!! $widget->custom_button_code !!}
		@endif
	</div>
</div>