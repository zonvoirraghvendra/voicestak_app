<?php
return [
	
	/**
	 * Application Name.
	 */
	'application_name' => 'VoiceStack',
	/**
	 * Client ID.
	 */
	'client_id' => '538613086487-h8d4k3boa2pb8ekbdnqgtu2qq6otpa8v.apps.googleusercontent.com',
	/**
	 * Client Secret.
	 */
	'client_secret' => 'BTUs0cPlxnAz23EoqVKlhTAr',
	/**
	 * Route Base URI. You can use this to prefix all route URI's.
	 * Example: 'admin', would prefix the below routes with 'http://domain.com/admin/'
	 */
	'route_base_uri' => '',
	/**
	 * Redirect URI, this does not include your TLD.
	 * Example: 'callback' would be http://domain.com/callback
	 */
	'redirect_uri' => 'https://app.voicestak.com/youtube/callback',
	/**
	 * The autentication URI in with you will require to first authorize with Google.
	 */
	'authentication_uri' => 'youtube/connect',
	/**
	 * Access Type
	 */
	'access_type' => 'offline',
	/**
	 * Approval Prompt
	 */
	'approval_prompt' => 'force',
	/**
	 * Scopes.
	 */
	'scopes' => [
		'https://www.googleapis.com/auth/youtube',
		'https://www.googleapis.com/auth/youtube.upload',
		'https://www.googleapis.com/auth/youtube.readonly'
	],
	/**
	 * Developer key.
	 */
	'developer_key' => 'AIzaSyC17Ea4h91hqL7pPAeEYBKrggpuUpAF6aM'
];