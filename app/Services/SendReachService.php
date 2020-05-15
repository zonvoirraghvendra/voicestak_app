<?php namespace App\Services;

use App\Contracts\EmailServiceInterface;
use App\Models\EmailService;
use Illuminate\Contracts\Auth\Guard;
use Input;
use Response;
use Auth;
use Exception;

require_once dirname(__FILE__) . '/../../lib/SendReach/sendreach-sdk-v3.0.0/MailWizzApi/Autoloader.php';

\MailWizzApi_Autoloader::register();

class SendReachService implements EmailServiceInterface {

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
	private $serviceName = 'SendReach';

	/**
	 * Connect(save) API Key
	 */
	public function set_service_option( $service, $value )
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
    public function get_service_options($user_id, $service_name)
    {
        return $this->emailService->where('service', $service_name)->where('user_id', $user_id)->lists('value');
    }

	public function connect( $inputs )
	{
        // global $api_vars;
        // $api_vars['user_id'] = $inputs['sendreach_user_id'];
        // $api_vars['key'] = $inputs['sendreach_api_key'];
        // $api_vars['secret'] = $inputs['sendreach_api_secret_key'];
        // // $api_vars['userid'] = $inputs['user_id'];
        
        // $query = 'http://api.sendreach.com/index.php?key='.$api_vars['key'].'&secret='.$api_vars['secret'].'&action=lists_view';
        // $call = file_get_contents($query);
        // $json = json_decode($call);

        // if(isset($json->code) && isset($json->message) && $json->message == 'app does not exist'){
        //     return ['status' => 'warning', 'message' => 'API key is not valid.'];
        // }
        // $this->set_service_option($this->serviceName, [ 'sendreach_api_key' => $api_vars['key'], 'sendreach_api_secret_key' => $api_vars['secret'], 'sendreach_user_id' => $api_vars['user_id'] ]);
        // return ['status' => 'success', 'message' => 'API key saved!'];
        

        $config = new \MailWizzApi_Config(array(
            'apiUrl'        => 'http://dashboard.sendreach.com/api/index.php',
            'publicKey'     => $inputs['sr_public_key'],
            'privateKey'    => $inputs['sr_private_key'],
            
            // components
            'components' => array(
                'cache' => array(
                    'class'     => 'MailWizzApi_Cache_File',
                    'filesPath' => dirname(__FILE__) . '/../MailWizzApi/Cache/data/cache',
                )
            ),
        ));

        // now inject the configuration and we are ready to make api calls
        \MailWizzApi_Base::setConfig($config);

        // start UTC
        date_default_timezone_set('UTC');

        $endpoint = new \MailWizzApi_Endpoint_Lists();

        $response = $endpoint->getLists($pageNumber = 1, $perPage = 10);

        if($response->body['status'] == 'error'){
            return ['status' => 'error', 'message' => 'Access denied: Invalid credentials'];
        }
        $this->set_service_option($this->serviceName, ['sr_public_key' => $inputs['sr_public_key'] , 'sr_private_key' => $inputs['sr_private_key'] ] );
        return ['status' => 'success', 'message' => 'API config data saved!'];
        // try {
            // global $api_vars;
            // $api_vars['key'] = $inputs['sendreach-api-key'];
            // $api_vars['secret'] = $inputs['sendreach-api-secret-key'];
            // $api_vars['userid'] = $this->auth->id();

        //     $sendreach = new Sendreach();

        //     $status = $sendreach->lists_view();
        //     $obj = json_decode($status);

        //     try{
        //         if( $obj->status == 'error' )
        //         {
        //             return ['status' => 'warning', 'message' => 'API key is not valid.'];
        //         }
        //     }
        //     catch (Exception $error) {
        //         $this->set_service_option($this->serviceName, [ 'api_key' => $api_vars['key'], 'api_secret_key' => $api_vars['secret'], 'userid' => $api_vars['userid'] ]);
        //         //EmailServices::set_service_option('sendreach', 'is_connected', 1);
        //         return ['status' => 'success', 'message' => 'API key saved!'];
        //     }

        // } catch (Exception $error) {
        //     return ['status' => 'warning', 'message' => 'API key is not valid.'];
        // }
	}

    /**
     * Fetch sendreach lists
     */
    public function getList()
    {
        global $api_vars;
        $conf = $this->get_service_options($this->auth->id(), $this->serviceName);
        $conf = json_decode($conf[0]);
        $api_vars['public'] = $conf->sr_public_key;
        $api_vars['private'] = $conf->sr_private_key;
        // $api_vars['userid'] = $this->auth->id();


        /*$cache_key = 'sendreach_lists|user_id:' . Auth::user()->id;
        if (Cache::has($cache_key)) {
            return Cache::get($cache_key);
        }*/


        $config = new \MailWizzApi_Config(array(
            'apiUrl'        => 'http://dashboard.sendreach.com/api/index.php',
            'publicKey'     => $api_vars['public'],
            'privateKey'    => $api_vars['private'],
            
            // components
            'components' => array(
                'cache' => array(
                    'class'     => 'MailWizzApi_Cache_File',
                    'filesPath' => dirname(__FILE__) . '/../MailWizzApi/Cache/data/cache',
                )
            ),
        ));

        // now inject the configuration and we are ready to make api calls
        \MailWizzApi_Base::setConfig($config);

        // start UTC
        date_default_timezone_set('UTC');

        $endpoint = new \MailWizzApi_Endpoint_Lists();

        $response = $endpoint->getLists($pageNumber = 1, $perPage = 100);

        foreach ($response->body['data']['records'] as $value) {
            $lists[$value['general']['list_uid']] = $value['general']['name'];
        }

        // $query = 'http://api.sendreach.com/index.php?key='.$api_vars['key'].'&secret='.$api_vars['secret'].'&action=lists_view';
        // $call = file_get_contents($query);
        // $json = json_decode($call);
        // $lists = array();
        // foreach($json as $list){
        //     $lists[$list->id] = $list->list_name;
        // }
        /*Cache::put($cache_key, $lists, 5);*/

        return $lists;
    }

    /**
     * SendReach Add contact to list
     */
    public function add_contact($user_id, $list_id, $contact_data)
    {
        try{
            global $api_vars;
            $conf = $this->get_service_options($this->auth->id(), $this->serviceName);
            $conf = json_decode($conf[0]);
            $api_vars['public'] = $conf->sr_public_key;
            $api_vars['private'] = $conf->sr_private_key;


            $config = new \MailWizzApi_Config(array(
                'apiUrl'        => 'http://dashboard.sendreach.com/api/index.php',
                'publicKey'     => $api_vars['public'],
                'privateKey'    => $api_vars['private'],
                
                // components
                'components' => array(
                    'cache' => array(
                        'class'     => 'MailWizzApi_Cache_File',
                        'filesPath' => dirname(__FILE__) . '/../MailWizzApi/Cache/data/cache',
                    )
                ),
            ));

            // now inject the configuration and we are ready to make api calls
            \MailWizzApi_Base::setConfig($config);

            // start UTC
            date_default_timezone_set('UTC');

            $endpoint = new \MailWizzApi_Endpoint_ListSubscribers();

            $response = $endpoint->create($list_id, array(
                'EMAIL'    => $contact_data['email'], // the confirmation email will be sent!!! Use valid email address
                'FNAME'    => $contact_data['name']
            ));

            // $query = 'http://api.sendreach.com/index.php?key='.$api_vars['key'].'&secret='.$api_vars['secret'].'&action=subscriber_add&user_id='.$api_vars['user_id'].'&list_id='.$list_id.'&first_name='.$contact_data['name'].'&email='.$contact_data['email'].'&client_ip='.$ip;
            // $call = file_get_contents($query);
            if($response->body['status'] == 'success')
                return ['status' => 'success', 'message' => 'You are successfully subscribed!!!'];
            return ['status' => 'warning', 'message' => 'You already subscribed!!!'];
        } catch(Exception $e) {
            return ['status' => 'error', 'message' => 'Please connect to SendReach service!'];
        }
        
    }

}