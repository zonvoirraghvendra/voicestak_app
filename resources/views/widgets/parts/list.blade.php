<!-- PLEASE MAKE THIS CODE DYNAMIC TO SHOW THE CAMPAIGN NAME ON <h5> -->

<div class="vt-horizontal-title">
    <h5 class="new">
        All Campaigns
    </h5>
</div>

@if(!$widgets->isEmpty())
	@foreach($widgets as $widget)
		@include('widgets.parts.list-item')
	@endforeach
@else
	@include('layouts.alerts.no-result')
@endif