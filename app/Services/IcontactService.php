<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use Lib\Icontact\Icontact;
use App\Models\EmailService;
use Illuminate\Contracts\Auth\Guard;
use Exception;
class IcontactService implements EmailServiceInterface {
	/**
	 * Create a new service instance.
	 *
	 * @return void
	 */
	public function __construct( Guard $auth , EmailService $emailService ,Icontact $icontact)
	{
		//require (base_path().'/lib/Icontact/Icontact.php');
		$this->auth 		= $auth;
		$this->emailService = $emailService;
		$this->icontact     = $icontact;
	}
	/**
	 * Get service name
	 *
	 * @var string
	 * @access private
	 */
	private $serviceName = 'Icontact';


	/**
	 * Get inputs to set email service connection.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	private function setIcontactConnectionInputs( $inputs )
	{
		$emailServiceData['user_id'] = $this->auth->id();
		$emailServiceData['service'] = $this->serviceName;
		$emailServiceData['value']   = json_encode([ 'app_id' => $inputs['app_id'] ,'api_password' => $inputs['api_password'] , 'api_username' => $inputs['api_username'] ]);
		$emailServiceData['active']  = 1;
		return $emailServiceData;
	}

    /**
     * Get service options
     */
    public function get_service_options( $user_id , $service_name ) 
    {
        return $this->emailService->where('service', $service_name)->where('user_id', $user_id )->lists('value');
    }

	/**
	 * Connect to email service.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
	public function connect( $inputs )
	{
		try {
			// dd($this->auth)
            $api_id = $inputs['app_id'];
            $api_password = $inputs['api_password'];
            $api_username = $inputs['api_username'];
            if(null != $this->emailService->where('service','iContact')->where('user_id',$this->auth->id())->first())
            {
            	return [ 'status' => 'warning' , 'message' => 'You already connected to this api.' ];
            }
            $a= $this->icontact->getInstance()->setConfig(array(
                'appId'       =>$api_id,
                'apiPassword' =>$api_password,
                'apiUsername' =>$api_username
            ));
            $oiContact = $this->icontact->getInstance();            
            // EmailServices::set_service_option('icontact', 'api_id', $api_id);
            // EmailServices::set_service_option('icontact', 'api_password', Crypt::encrypt($api_password));
            // EmailServices::set_service_option('icontact', 'api_username', $api_username);
            //EmailServices::set_service_option('icontact', 'is_connected', 1);
             $result = [ 'status' => 'success' , 'message' => 'API settings saved' ];
        } catch (Exception $error) {
            return [ 'status' => 'success' , 'message' => 'API settings is not valid' ];
        }

        try{
        	$result = $oiContact->getLists();
        	if(isset($result['status']) && $result['status']=='error' )
        	{
        		return  [ 'status' => 'error' , 'message' => $result['message'] ];
        	}
            else if(isset($result[0]->listId))
            {
	            if($this->emailService->create( $this->setIcontactConnectionInputs( $inputs ) ))
	            {
					$result = [ 'status' => 'success' , 'message' => 'You has been successfully connected.' ];
	            }
            } 
        }catch(Exception $e){
        	return  [ 'status' => 'warning' , 'message' => 'API settings is not valid' ];
        }

        return $result;
	}

	/**
	 * get list
	 *
	 * @return array
	 */
	public function getList()
    {
        if($icontact = $this->emailService->where('service',$this->serviceName)->where('user_id' , \Auth::id())->first()) {
            $value = json_decode($icontact->value);
            $api_id = $value->app_id;
            $api_password = $value->api_password;
            $api_username = $value->api_username;
        }

        // $cache_key = 'icontact_lists|user_id:' . $this->auth->id();
        // if (Cache::has($cache_key)) {
        //     return Cache::get($cache_key);
        // }
        $a= $this->icontact->getInstance()->setConfig(array(
                'appId'       =>$api_id,
                'apiPassword' =>$api_password,
                'apiUsername' =>$api_username
            ));

        // iContact::getInstance()->setConfig(array(
        //     'appId'       => $api_id,
        //     'apiPassword' => Crypt::decrypt($api_password),
        //     'apiUsername' => $api_username
        // ));
        // $oiContact = iContact::getInstance();
        $oiContact = $this->icontact->getInstance();  

        $data = $oiContact->getLists();
        $lists = [];

        foreach ($data as $list) {
            $lists[$list->listId] = $list->name;
        }
        return $lists;
    }

    /**
     * IContact Add contact to list
     */
    public function add_contact( $user_id , $list_id, $contact_data)
    {
        try {
            $conf = $this->get_service_options( $user_id , $this->serviceName);
            $conf = json_decode($conf[0]);
            $api_id = $conf->app_id;
            $api_password = $conf->api_password;
            $api_username = $conf->api_username;
            
            $this->icontact->getInstance()->setConfig(array(
                'appId'       => $api_id,
                'apiPassword' => $api_password,
                'apiUsername' => $api_username
            ));
            $oiContact = $this->icontact->getInstance();
            $contact = $oiContact->addContact($contact_data['email'], 'normal', null, $contact_data['name']);
            if($oiContact->subscribeContactToList($contact->contactId, $list_id, 'normal'))
                return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
            else
                return ['status' => 'warning', 'message' => 'You already subscribed!!!'];
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
}