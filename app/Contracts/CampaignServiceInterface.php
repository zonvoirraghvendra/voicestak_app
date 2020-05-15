<?php namespace App\Contracts;

interface CampaignServiceInterface {

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllCampaigns();

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Campaign object or NULL
	 */
	public function getCampaignByID( $id );

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Campaign object or NULL
	 */
	public function createCampaign( $inputs );

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int    $id
	 * @param  array  $inputs
	 * @return Boolean
	 */
	public function updateCampaign( $id , $inputs );

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyCampaign( $id );
}