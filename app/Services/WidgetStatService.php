<?php namespace App\Services;

use App\Contracts\WidgetStatServiceInterface;
use App\Models\WidgetStat;
use Illuminate\Contracts\Auth\Guard;

class WidgetStatService implements WidgetStatServiceInterface {
	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , WidgetStat $widgetStat )
	{
		$this->auth 	   = $auth;
		$this->widgetStat  = $widgetStat;
	}

	/**
	 * Manage data for a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return array
	 */
	public function createWidgetStatInputs( $inputs )
	{
		return $inputs;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Widget object or NULL
	 */
	public function createWidgetStat( $inputs )
	{
		return $this->widgetStat->create( $this->createWidgetStatInputs( $inputs ) );
	}

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllStats()
	{
		return $this->widgetStat->where('user_id', $this->auth->id())->orderBy('created_at', 'ASC');
	}

	/**
	 * Get a stats of the specific resource.
	 *
	 * @return Collection
	 */
	public function getWidgetStatsById( $id )
	{
		return $this->widgetStat->where('widget_id', $id)->where('user_id',  $this->auth->id())->orderBy('created_at', 'ASC');
	}

	/**
	 * Get a stats of the specific resource.
	 *
	 * @return Collection
	 */
	public function getWidgetStatsByDate( $date )
	{
		return $this->widgetStat->where('created_at', $date)->where('user_id',  $this->auth->id())->get();
	}
}