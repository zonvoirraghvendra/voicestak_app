<?php

/**
 * @property array $item
 */
class InterspireEMApi_Response_Subscribers_DeleteSubscriber extends InterspireEMApi_Response
{
    public $result = FALSE;

    protected function _afterDataLoad()
    {
        if ($this->item[0] === '1') {
            $this->result = TRUE;
        }
        else {
            $this->result = FALSE;
        }
    }
}