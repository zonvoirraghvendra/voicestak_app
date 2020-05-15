@if(!$widgets->isEmpty())
	@foreach($widgets as $widget)
		@include('widgets.parts.grid-item')
	@endforeach
@else
	@include('layouts.alerts.no-result')
@endif