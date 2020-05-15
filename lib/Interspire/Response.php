<?php

class InterspireEMApi_Response
{
    private $_error = TRUE;
    private $_errorMessage;
    private $_data;

    public function __construct($curlHandle)
    {
        $curlResult = curl_exec($curlHandle);
        if ($curlResult === FALSE) {
            $this->_errorMessage = 'cURL Error: '.curl_error($curlHandle);
        }
        else {
            $xmlResult = simplexml_load_string($curlResult);

            if ($xmlResult->status == 'SUCCESS') {
                $this->_error = FALSE;
                $this->_data = $this->_simpleXmlToObject($xmlResult->data);

                $this->_afterDataLoad();
            }
            else {
                $this->_errorMessage = sprintf('API Error: %s', $xmlResult->errormessage);
            }
        }
    }

    public function __get($name)
    {
        if (isset($this->_data->$name)) {
            return $this->_data->$name;
        }
        else {
            throw new Exception(sprintf('Property %s->%s does not exist', get_class($this), $name));
        }
    }

    public function __set($name, $value)
    {
        if (isset($this->_data->$name)) {
            $this->_data->$name = $value;
            return TRUE;
        }
        else {
            throw new Exception(sprintf('Property %s->%s does not exist', get_class($this), $name));
        }
    }

    protected function _afterDataLoad()
    {
        return TRUE;
    }

    public function getData()
    {
        return $this->_data;
    }

    public function setData($data)
    {
        $this->_data = $data;

        return $this;
    }

    public function isError()
    {
        return $this->_error;
    }

    public function getErrorMessage()
    {
        return $this->_errorMessage;
    }

    public function setErrorMessage($error)
    {
        $this->_errorMessage = $error;
        $this->_error = TRUE;

        return $this;
    }

    private function _simpleXmlToArray($xml)
    {
        return json_decode(json_encode((array)$xml), TRUE);
    }

    private function _simpleXmlToObject($xml)
    {
        return json_decode(json_encode((array)$xml));
    }
}
