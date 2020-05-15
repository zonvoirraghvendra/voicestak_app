@if($campaignByID != '0')
	@include('campaigns.parts.list-item' , [ 'campaign_id' => $campaignByID->id ])
@else
	@foreach($campaigns as $campaign_id => $campaign)
		@include('campaigns.parts.list-item' , [ 'campaign_id' => $campaign->id ])
	@endforeach
@endif