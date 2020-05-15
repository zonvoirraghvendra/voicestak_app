<?php namespace App\Contracts;

interface WidgetServiceInterface {


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int 		$id
	 * @param  bool    $flag
	 * @param  array  $inputs
	 * 
	 */
	public function addRemovePoweredBy($id, $flag, $inputs);
	/**
	 * get email service list
	 *
	 * @param  string  $serviceName
	 * @return list
	 */
	public function getEmailServiceList($serviceName);

	/**
	 * check is widget completely filled
	 *
	 * @param  int  $id
	 * @return boolean
	 */
	public function isWidgetCompletelyFilled($id);

	/**
	 * 
	 * Adding image in storage
	 * 
	 * @param [type] $image [description]
	 */
	public function addImage( $image );

	/**
	 * 
	 * Delete image from storage
	 * 
	 * @param [type] $image [description]
	 */
	public function deleteImage( $id , $image );

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllWidgets();

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getWidgetsByCampaignID($id);

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Widget object or NULL
	 */
	public function getWidgetByID( $id );

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Widget object or NULL
	 */
	public function createWidget( $inputs );

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int    $id
	 * @param  array  $inputs
	 * @return Boolean
	 */
	public function updateWidget( $id , $inputs );

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyWidget( $id );

	/**
	 * Remove the specified resources from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyCapmaignWidgets( $id );
}