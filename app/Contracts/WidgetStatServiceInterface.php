<?php namespace App\Contracts;

interface WidgetStatServiceInterface {
	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Widget object or NULL
	 */
	public function createWidgetStat( $inputs );

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllStats();

	/**
	 * Get a stats of the specific resource.
	 *
	 * @return Collection
	 */
	public function getWidgetStatsById( $id );

	/**
	 * Get a stats of the specific resource.
	 *
	 * @return Collection
	 */
	public function getWidgetStatsByDate( $date );
}