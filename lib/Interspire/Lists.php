<?php
class InterspireEMApi_Service_Lists extends InterspireEMApi_Service_Abstract
{
    protected $_requestMethodMap = array(
        'deleteAllSubscribers' => 'DeleteAllSubscribers',
        'getCustomFields'      => 'GetCustomFields',
        'getLists'             => 'GetLists',
    );

    public function deleteAllSubscribers($listId)
    {
        $details = array(
            'listid' => $listId,
        );

        return $this->makeRequest($details);
    }

    public function getCustomFields($listIds = array())
    {
        $details = array(
            'listids' => $listIds,
        );

        return $this->makeRequest($details);
    }

    public function getLists($listIds = array())
    {
        $details = array(
            'listsArray' => $listIds,
        );

        return $this->makeRequest($details);
    }
}