@if($campaignByID)
    @include('widgets.parts.list', [ 'widgets' => $campaignByID->widgets ])
@else
    @include('widgets.parts.list', [ 'widgets' => $campaign->widgets ])
@endif