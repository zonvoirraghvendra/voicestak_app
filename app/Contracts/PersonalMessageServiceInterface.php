<?php namespace App\Contracts;

interface PersonalMessageServiceInterface {

	public function sendSMS( $inputs );

	public function getAllPersonalMessages();

	public function destroyPersonalMessage($id);

	public function getPersonalMessagesByCampaignID( $campaign_id );

	public function collection( $campaign_id );

}