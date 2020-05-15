@if($campaignByID)
    @include('widgets.parts.grid', [ 'widgets' => $campaignByID->widgets ])
@else
    @include('widgets.parts.grid', [ 'widgets' => $campaign->widgets ])
@endif