<?php namespace App\Services;

use App\Contracts\CampaignServiceInterface;
use App\Models\Campaign;
use Illuminate\Contracts\Auth\Guard;

class CampaignService implements CampaignServiceInterface {

	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , Campaign $campaign )
	{
		$this->auth 	= $auth;
		$this->campaign = $campaign;
	}

	/**
	 *	Return collection
	 *
	 * 	@return Collection
	 */
	public function collection( $id )
	{
		if($id) {
			$campaign = $this->getCampaignByID($id);
			return ['campaigns' => $this->getAllCampaigns(), 'campaignByID' => $campaign, 'campaign_id' => $id];
		} else {
			return ['campaigns' => $this->getAllCampaigns(), 'campaignByID' => 0];
		}
	}

	/**
	 * Get a collection of the resource.
	 *
	 * @return Collection
	 */
	public function getAllCampaigns()
	{
		if( $this->auth->user()->role == "user" ){
			return $this->campaign->where( 'user_id' , $this->auth->id() )->orderBy( 'created_at' , 'DESC' )->get();
		}else{
			$assigned = $this->auth->user()->assigned_campaigns;
			$assigned = json_decode($assigned);
			return $this->campaign->whereIn( 'id' , $assigned )->get() ;

		}
	}

	/**
	 * Get a array of the resource for select input.
	 *
	 * @return array
	 */
	public function getCampaignsList()
	{
		if( $this->auth->user()->role == "user" ){
			return $this->campaign->where( 'user_id' , $this->auth->id() )->orderBy( 'created_at' , 'DESC' )->lists('name' , 'id');
		}else{
			$assigned = json_decode($this->auth->user()->assigned_campaigns);
			return $this->campaign->whereIn( 'id' , $assigned )->orderBy( 'created_at' , 'DESC' )->lists('name' , 'id');
		}
	}

	/**
	 * Get the specified resource.
	 *
	 * @param  int  $id
	 * @return Campaign object or NULL
	 */
	public function getCampaignByID( $id )
	{
		if(null !== $this->auth->user()){
			if( $this->auth->user()->role == "user" ){
				return $this->campaign->where( 'user_id' , $this->auth->id() )->find( $id );
			}else{
				$arr = [];
				$user = $this->auth->user();
				$campaignsAvailable = json_decode($this->auth->user()->assigned_campaigns);
				foreach ($campaignsAvailable as $key => $value) {
					if( $value == $id ){
						return $this->campaign->find( $id );
					}
				}
				
			}
		} else {
			return $this->campaign->find( $id );
		}
	}
	
	/**
	 * Manage data for a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return array
	 */
	private function createCampaignInputs( $inputs )
	{
		$inputs['user_id'] = $this->auth->id();
		return $inputs;
	}
	
	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  array  $inputs
	 * @return Campaign object or NULL
	 */
	public function createCampaign( $inputs )
	{
		return $this->campaign->create( $this->createCampaignInputs( $inputs ) );
	}
	
	/**
	 * Manage data for update the specified resource in storage.
	 *
	 * @param  array  $inputs
	 * @return array
	 */
	private function updateCampaignInputs( $inputs )
	{
		$inputs['user_id'] = $this->auth->id();
		return $inputs;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int    $id
	 * @param  array  $inputs
	 * @return Boolean
	 */
	public function updateCampaign( $id , $inputs )
	{
		return $this->getCampaignByID( $id )->update( $this->updateCampaignInputs( $inputs ) );
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Boolean
	 */
	public function destroyCampaign( $id )
	{
		return $this->getCampaignByID( $id )->delete();
	}
}