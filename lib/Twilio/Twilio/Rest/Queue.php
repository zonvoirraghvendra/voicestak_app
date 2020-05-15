<?php namespace Lib\Twilio;

class Services_Twilio_Rest_Queue
    extends Services_Twilio_InstanceResource {

    protected function init($client, $uri) {
        $this->setupSubresources('members');
    }
}

