@if(!$widgets->isEmpty())
	@foreach($widgets as $widget)
		@include('widgets.parts.list-item')
	@endforeach
@else
	@include('layouts.alerts.no-result')
@endif