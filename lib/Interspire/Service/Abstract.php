<?php

abstract class InterspireEMApi_Service_Abstract
{
    /** @var InterspireEMApi  */
    protected $_client;
    protected $_requestMethodMap = array();

    public function __construct($client)
    {
        $this->_client = $client;
    }

    public function makeRequest($details = array())
    {
        $caller = $this->_getCaller();

        $xmlArray = array(
            'xmlrequest' => array(
                'username' => $this->_client->getUsername(),
                'usertoken' => $this->_client->getUsertoken(),
                'requesttype' => strtolower(substr($caller['class'], strrpos($caller['class'], '_')+1)),
                'requestmethod' => $this->_requestMethodMap[$caller['function']],
                'details' => $details,
            )
        );

        $xmlString = $this->_arrayToXmlString($xmlArray);

        $curlHandle = curl_init($this->_client->getApiPath());
        curl_setopt_array($curlHandle, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => $xmlString,
        ));

        if (($responseClass = $this->_responseExists($caller)) !== FALSE) {
            return new $responseClass($curlHandle);
        }
        else {
            return new InterspireEMApi_Response($curlHandle);
        }
    }

    private function _arrayToXmlString($array)
    {
        if (is_array($array)) {
            // one new line for array "indentation"
            $str = "\n";

            foreach ($array as $key => $value) {
                // handling of multiple elements with same key (key suffixed with Array)
                if (strrpos($key, 'Array') > 0 && strrpos($key, 'Array') == strlen($key) - 5) {
                    $itemKey = substr($key, 0, strrpos($key, 'Array'));
                    foreach ($value as $item) {
                        $str .= sprintf("<%1\$s>%2\$s</%1\$s>\n", $itemKey, $this->_arrayToXmlString($item));
                    }
                }
                // basic elements
                else {
                    // every element will be on new line
                    $str .= sprintf("<%1\$s>%2\$s</%1\$s>\n", $key, $this->_arrayToXmlString($value));
                }
            }

            return $str;
        }
        else {
            return sprintf('<![CDATA[%s]]>', $array);
        }
    }

    private function _getCaller()
    {
        $backtrace = debug_backtrace(FALSE);
        return $backtrace[2];
    }

    private function _responseExists($caller)
    {
        $responseClass = str_replace('InterspireEMApi_Service_', 'InterspireEMApi_Response_', $caller['class']);
        $responseClassFunction = $responseClass.'_'.ucfirst($caller['function']);

        if (class_exists($responseClassFunction)) {
            return $responseClassFunction;
        }
        elseif (class_exists($responseClass)) {
            return $responseClass;
        }
        else {
            return FALSE;
        }
    }
}