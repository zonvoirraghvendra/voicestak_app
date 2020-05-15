<?php
class InterspireEMApi_Service_Folders extends InterspireEMApi_Service_Abstract
{
    protected $_requestMethodMap = array(
        'getFolderList' => 'GetFolderList',
    );

    public function getFolderList($folderType = 'list', $userId = 0)
    {
        $details = array(
            'folder_type' => $folderType,
            'user_id' => $userId,
        );

        return $this->makeRequest($details);
    }
}