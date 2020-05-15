<?php

class InterspireEMApi_Response_Subscribers_AddSubscriberToList extends InterspireEMApi_Response
{
    public $subscriberId = 0;

    protected function _afterDataLoad()
    {
        $data = $this->getData();
        if (!empty($data)) {
            $this->subscriberId = array_pop($data);
        }
    }
}