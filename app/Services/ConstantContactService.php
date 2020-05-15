<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use Lib\Ctct\ConstantContact;
use Illuminate\Contracts\Auth\Guard;
use Lib\Ctct\Exceptions\CtctException;
use Lib\Ctct\Components\Contacts\Contact;

class ConstantContactService implements EmailServiceInterface {

	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , EmailService $emailService )
	{
		
		$this->auth 		= $auth;
		$this->emailService = $emailService;
	}

	/**
	 * Get service name
	 *
	 * @var string
	 * @access private
	 */
	private $serviceName = 'ConstantContact';

	/**
	 * Connect(save) API Key
	 */
	public function set_service_option($service, $value)
	{

		//$services          = new EmailService;

		$this->emailService->user_id = $this->auth->id();

		$this->emailService->service = $service;

		$this->emailService->value   = json_encode($value);

		$this->emailService->active  = 1;

		$this->emailService->save();
	}

	/**
	 * Get service options
	 */
	public function get_service_options( $user_id , $service_name)
    {
        return $this->emailService->where('service', $service_name)->where('user_id', $user_id )->lists('value');
    }

	/**
	 * Connect to active campaign.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
    public function connect( $inputs )
	{
		$inputs['const_api_key'];
		$inputs['const_access_token'];

		$cc = new ConstantContact( $inputs['const_api_key'] );
		// attempt to fetch lists in the account, catching any exceptions and printing the errors to screen
		try {
		    $lists = $cc->getLists( $inputs['const_access_token'] );

		    $this->set_service_option($this->serviceName, ['const_api_key' => $inputs['const_api_key'], 'const_access_token' => $inputs['const_access_token'] ] );

		    return ['status' => 'success', 'message' => 'API config data saved!'];
		} catch (CtctException $ex) {
	        return ['status' => 'warning', 'message' => 'Invalid Api key and/or Token'];
		}
	}

    /**
	 * Get constantContact Lists.
	 *
	 * @return array
	 */
	public function getList()
    {
        try {
            $conf = self::get_service_options( \Auth::id() , $this->serviceName);
            $conf = json_decode($conf[0]);
            $cc = new ConstantContact( $conf->const_api_key );
            $list_data = $cc->getLists( $conf->const_access_token );
            $lists = [];
            //dd($list_data);
            foreach ($list_data as $item) {
            	$lists[$item->id] = $item->name;
            }
            
            return $lists;
        } catch (CtctException $e) {
            return $e->getMessage();
        }
    }

    /**
	 * Add contact
	 *
	 * @return array
	 */
    public function add_contact( $user_id , $list_id, $contact_data )
    {
        try {
            $conf = self::get_service_options( $user_id, $this->serviceName);
            $conf = json_decode($conf[0]);
            $cc = new ConstantContact( $conf->const_api_key );

            $response = $cc->getContactByEmail( $conf->const_access_token , $contact_data['email'] );

            if (empty($response->results)) {
                $contact = new Contact();
                $contact->addEmail( $contact_data['email'] );
                $contact->addList( $list_id );
                $contact->first_name = $contact_data['name'] ;
                $cc->addContact( $conf->const_access_token, $contact, true);
                return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
            } else {
            	return ['status' => 'warning', 'message' => 'You already subscribed!!!'];
                // $contact = $response->results[0];
                // $contact->addList( $list_id );
                // $contact->first_name = $contact_data['name'] ;

                // dd( $cc->updateContact( $conf->const_access_token , $contact, true));
            }
        } catch (CtctException $ex) {
        	return ['status' => 'error', 'message' => 'Please connect to ConstantContact service!'];
        }
    }

}