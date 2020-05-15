<?php 

return [
	'message_pagination' => env('MESSAGE_PAGINATION', 10),
	'campaign_pagination' => env('CAMPAIGN_PAGINATION', 3),
	'sendlane_domain' => env('SENDLANE_DOMAIN'),
	'sendlane_api' => env('SENDLANE_API'),
	'sendlane_hash' => env('SENDLANE_HASH'),
	// 'consumer_key' => 'Ak93deBcfbUqwrLBCr18C4cZ',
	// 'consumer_secret' => 'sqCIdRpBtfHY7Zt65fv3nHMn2uzcNNGjaVzqT7a5'
	'aweber' => [
		'consumer_key' => 'Ak93deBcfbUqwrLBCr18C4cZ',
		'consumer_secret' => 'sqCIdRpBtfHY7Zt65fv3nHMn2uzcNNGjaVzqT7a5'
	],
	'infusion' => [
		'api_key' => 'kpfmeeeggsqfmnvxjfmduzzf',
		'api_secret' => 'wx8GAGGFC2'
	]
	
];