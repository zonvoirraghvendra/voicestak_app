@if($campaignByID != '0')
	@include('campaigns.parts.grid-item' , [ 'campaign_id' => $campaignByID->id ])
@else
	@foreach($campaigns as $campaign_id => $campaign)
		@include('campaigns.parts.grid-item' , [ 'campaign_id' => $campaign->id ])
	@endforeach
@endif