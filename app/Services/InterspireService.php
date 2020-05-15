<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use Lib\Interspire\InterspireEMApi;
use Illuminate\Contracts\Auth\Guard;
use Exception;
class InterspireService implements EmailServiceInterface {

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
	private $serviceName = 'Interspire';

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
	 * Connect to email service.
	 *
	 * @param array $inputs
	 * @return boolean
	 */
    public function connect( $inputs ) {
    	try {

			$apiUsername = $inputs['intr_username'];//'demo';
			$apiUsertoken = $inputs['intr_usertoken'];//'32c51279e0d7788d242ba7e8735af27c7bbe5e7c';
			$apiPath = $inputs['intr_api_path'];//'http://emailmarketer.interspire-demo.com/xml.php';
			//dd($apiPath);

			$api = new InterspireEMApi($apiPath, $apiUsername, $apiUsertoken);
			$response = $api->authentication->xmlApiTest();

			if( $response->isError() ) {

				return ['status' => 'warning', 'message' => 'Access denied: Invalid credentials' ];
			}
			$this->set_service_option($this->serviceName, ['intr_username' => $apiUsername, 'intr_usertoken' =>$apiUsertoken, 'intr_api_path' => $apiPath ] );
			

			return ['status' => 'success', 'message' => 'You has been successfully connected.'];
		} catch (Exception $e) {
			return ['status' => 'warning', 'message' => 'Access denied: Invalid credentials' ];
		}
    }

    /**
	 * Get interspire Lists.
	 *
	 * @return array
	 */
	public function getList()
    {
        try {
            //require_once(app_path().'/lib/Interspire/InterspireEMApi.php');
            $conf = self::get_service_options( \Auth::id() , $this->serviceName);
            $conf = json_decode($conf[0]);
            $api = new InterspireEMApi( $conf->intr_api_path, $conf->intr_username, $conf->intr_usertoken );

            $lists_data = $api->lists->getLists();
            $lists = [];
            foreach ($lists_data->item as $item) {
            	$lists[$item->listid] = $item->name;
            }

            return $lists;
        } catch (Exception $e) {
            return  $e->getMessage() ;
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
            //require_once(app_path().'/lib/Interspire/InterspireEMApi.php');
            $conf = self::get_service_options( $user_id , $this->serviceName);
			$conf = json_decode($conf[0]);
            $api = new InterspireEMApi( $conf->intr_api_path, $conf->intr_username, $conf->intr_usertoken );

            $result = $api->subscribers->addSubscriberToList( $contact_data['email'], $list_id, $format = 'text', $confirmed = FALSE, ['1' => $contact_data['name']] );
            if($result->isError()){
            	return ['status' => 'warning', 'message' => $result->getErrorMessage()];
            }
            return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
        } catch (Exception $e) {
        	return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

}