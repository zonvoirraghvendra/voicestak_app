<?php

class InterspireEMApi_Service_Subscribers extends InterspireEMApi_Service_Abstract
{
    protected $_requestMethodMap = array(
        'addSubscriberToList' => 'AddSubscriberToList',
        'deleteSubscriber'    => 'DeleteSubscriber',
        'getSubscribers'      => 'GetSubscribers',
        'isSubscriberOnList'  => 'IsSubscriberOnList',
    );

    /**
     * Adds a subscriber to a list.
     *
     * @param string $email
     * @param int $listId
     * @param string $format
     * @param bool $confirmed
     * @param array $customFields
     *
     * @return InterspireEMApi_Response_Subscribers_AddSubscriberToList
     */
    public function addSubscriberToList($email, $listId, $format = 'text', $confirmed = FALSE, $customFields = array())
    {
        $details = array(
            'emailaddress' => $email,
            'mailinglist'  => $listId,
            'format'       => $format, // html/h/text/t
            'confirmed'    => $confirmed, // yes/y/1/TRUE
        );

        if (!empty($customFields)) {
            foreach ($customFields as $field) {
                // $field = array('fieldid' => '', 'value' => '');
                $details['customfields']['itemArray'][] = $field;
            }
        }

        return $this->makeRequest($details);
    }

    /**
     * Deletes a subscriber from a list.
     *
     * @param string $email
     * @param int $listId
     * @param int $subscriberId
     *
     * @return InterspireEMApi_Response_Subscribers_DeleteSubscriber
     */
    public function deleteSubscriber($email, $listId = 0, $subscriberId = 0)
    {
        $details = array(
            'emailaddress' => $email,
            'listid'       => $listId,
            'subscriberid' => $subscriberId,
        );

        return $this->makeRequest($details);
    }

    /**
     * Returns a list of subscriber id's based on the information passed in.
     *
     * @param array $searchInfo
     * @param array $sortDetails
     * @param bool $countOnly
     *
     * @return InterspireEMApi_Response
     */
    public function getSubscribers($searchInfo = array(), $sortDetails = array(), $countOnly = FALSE)
    {
        $details = array(
            'searchinfo'  => $searchInfo,
            'sortdetails' => $sortDetails,
            'countonly'   => $countOnly,
        );

        /**
         * 'searchinfo' => array(
         *      'List' => array(),
         *      'Email' => '',
         *      'Format' => h - html / t - text
         *      'Status' => b - bounced / u - unsubscribed / a - subscribed and not bounced
         *      'Confirmed' => 0/1,
         *      'Subscriber' => 0,
         * )
         */

        return $this->makeRequest($details);
    }

    /**
     * Checks if a subscriber is on a list based on email address or subscriber id.
     *
     * @param string $email
     * @param array $listIds
     * @param int $subscriberId
     * @param bool $activeOnly
     * @param bool $notBounced
     * @param bool $returnListId
     *
     * @return InterspireEMApi_Response
     */
    public function isSubscriberOnList($email, $listIds, $subscriberId = 0, $activeOnly = FALSE, $notBounced = FALSE, $returnListId = TRUE)
    {
        $details = array(
            'emailaddress'  => $email,
            'listidsArray'  => $listIds,
            'subscriberid'  => $subscriberId,
            'activeonly'    => $activeOnly,
            'not_bounced'   => $notBounced,
            'return_listid' => $returnListId,
        );

        return $this->makeRequest($details);
    }
}