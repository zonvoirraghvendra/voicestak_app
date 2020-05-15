<?php namespace Lib\Interspire;

use Exception;
// Absolute path to library
if (!defined('INTERSPIRE_EM_API_DIR')) {
    define('INTERSPIRE_EM_API_DIR', dirname(__FILE__) . DIRECTORY_SEPARATOR);
}

// Register autoloader
spl_autoload_register('Lib\Interspire\interspire_em_api_autoload');

/**
 * @property InterspireEMApi_Service_Authentication $authentication
 * @property InterspireEMApi_Service_Folders $folders
 * @property InterspireEMApi_Service_Lists $lists
 * @property InterspireEMApi_Service_Subscribers $subscribers
 * @property InterspireEMApi_Service_User $user
 */
class InterspireEMApi
{
    private $_serviceInstances = array();

    private $_apiPath   = '';
    private $_username  = '';
    private $_usertoken = '';

    public function __construct($apiPath, $username, $usertoken)
    {
        $this->_apiPath = $apiPath;
        $this->_username  = $username;
        $this->_usertoken = $usertoken;
    }

    public function __get($serviceName)
    {
        if (!array_key_exists($serviceName, $this->_serviceInstances)) {
            if (($serviceClass = $this->_serviceExists($serviceName)) === FALSE) {
                throw new Exception("Service {$serviceName} does not exist");
            }

            $this->_serviceInstances[$serviceName] = new $serviceClass($this);
        }

        return $this->_serviceInstances[$serviceName];
    }

    private function _serviceExists($serviceName)
    {
        $serviceClass = 'InterspireEMApi_Service_'.ucfirst($serviceName);
        return (class_exists($serviceClass) ? $serviceClass : FALSE);
    }

    public function getApiPath()
    {
        return $this->_apiPath;
    }

    public function getUsername()
    {
        return $this->_username;
    }

    public function getUsertoken()
    {
        return $this->_usertoken;
    }
}

function interspire_em_api_autoload($class)
{
    if (strpos($class, 'InterspireEMApi_') !== FALSE) {
        $_class = explode('_', $class);
        array_shift($_class);

        $filename = INTERSPIRE_EM_API_DIR.implode('/', $_class).'.php';
        if (file_exists($filename)) {
            include_once($filename);
            return TRUE;
        }
        else {
            return FALSE;
        }
    }
}