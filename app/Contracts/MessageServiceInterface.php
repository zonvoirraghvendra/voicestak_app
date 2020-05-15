<?php namespace App\Contracts;

interface MessageServiceInterface {

	/**
	 *	Return collection
	 *
	 * 	@return Collection
	 */
	public function collection( $status, $campaign_id, $widget_id );

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllMessages();

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Message object or NULL
	 */
	public function getMessageByID( $id );

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $campaign_id
	 * @return Widget object or NULL
	 */
	public function getAllMessagesByCampaignID( $campaign_id );

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $widget_id
	 * @return Widget object or NULL
	 */
	public function getAllMessagesByWidgetID( $widget_id );

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $campaign_id
	 * @return Message object or NULL
	 */
	public function getMessagesByCampaignID( $status, $campaign_id );

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $widget_id
	 * @return Message object or NULL
	 */
	public function getMessagesByWidgetID( $status, $widget_id );

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Message object or NULL
	 */
	public function createMessage( $inputs );

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyCampaignMessages( $id );

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyWidgetMessages( $id );

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyMessage( $id );

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getArchiveMessages();

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getNewMessages();

	/**
	 * Update a specific resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Widget object or NULL
	 */
	public function updateMessages( $id , $inputs );

	/**
	 * Remove the specified resource from storage.
	 *
	 * @return Boolean
	 */
	public function deleteIncompleteMessages();

	/**
	 * Upload Audio To Amazon
	 * 
	 * @param  string $filename
	 * 
	 * @return $filename          
	 */
	public function uploadAudioToAmazon($filename);

	/**
	 * Get Audio From Amazon
	 * 
	 * @param  string $filename
	 * 
	 * @return $file          
	 */
	public function getAudioFromAmazon($filename);

	/**
	 * Delete collection of messages
	 * 
	 * @param  array $ids
	 * 
	 * @return boolean         
	 */
	public function deleteCollection($inputs);

	/**
	 * Put collection of messages in session
	 * 
	 * @param  array $inputs
	 *        
	 */
	public function addMessageInputsInSession($inputs);

}