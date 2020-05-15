<?php

class InterspireEMApi_Service_Authentication extends InterspireEMApi_Service_Abstract
{
    protected $_requestMethodMap = array(
        'xmlApiTest' => 'xmlapitest',
    );

    public function xmlApiTest()
    {
        $details = array();

        return $this->makeRequest($details);
    }
}