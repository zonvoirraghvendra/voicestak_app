<?php
class InterspireEMApi_Service_User extends InterspireEMApi_Service_Abstract
{
    protected $_requestMethodMap = array(
        'getLists' => 'GetLists',
    );

    public function getLists()
    {
        $details = array();

        return $this->makeRequest($details);
    }
}