<?php namespace App\Contracts;

interface YoutubeServiceInterface {

	/**
	 * Connect to youtube account
	 *
	 * @return message
	 */
	public function connect( $inputs );

	/**
	 * Save access token to database.
	 *
	 * @return message
	 */
	public function saveAccessTokenToDB( $code );

	/**
	 * Upload video to youtube
	 *
	 * @return status
	 */
	public function uploadVideoToYoutube( $fileName, $title );

	/**
	 * Check is user connected to youtube
	 *
	 * @return boolean
	 */
	public function isConnected( $id );

	/**
	 * Make video file from audio
	 *
	 * @return $fileName
	 */
	public function makeVideoFromAudio( $audioFile );

	/**
	 * Make mp4 video file from webM
	 *
	 * @return $fileName
	 */
	public function makeMp4FromWebM( $videoFile );

	public function exists( $id );
}