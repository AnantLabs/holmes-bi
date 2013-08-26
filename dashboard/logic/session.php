<?php

class session extends ormlib {
    var $id;
    var $session_id;
    var $user_id;
    var $duration_time;
    
    public function __construct() {
        parent::__construct("session", "id");
    }
    
    public static function create_session($username, $password) {
        $username = str_replace("['\"]", "", $username);
        $password = str_replace("['\"]", "", $password);
        $user = new user();
        $keys = array("username","password");
        $values = array($username, md5($password));
        $user1 = $user->get_with_parameter($keys, $values);
        if($user1!=null) {
            $session = new session();
            $session->session_id = uniqid();
            $session->user_id = $user1->id;
            $d1 = new DateTime();
            $d1->add(new DateInterval("PT30S"));
            $session->duration_time = $d1->format("Y-m-d H:i:s");
            $session->insert();
            return $session;
        }
        return NULL;
    }
    
    public static function get_session($session_id) {
        $session_id = str_replace("['\"]", "", $session_id);
        $sess = new session();
        return $sess->get_with_parameter(array("session_id"), array($session_id));
    }
    
    public function is_valid() {
        $datetime1 = new DateTime($this->duration_time);
        $datetime2 = new DateTime();
        $interval = date_diff($datetime1, $datetime2);
        if($interval->format('%y') >= 0 && $interval->format('%y') <= 30) {
            return true;
        }
        else {
            return false;
        }
    }
    
    public function update_time($object) {
        $d1 = new DateTime();
        $d1->add(new DateInterval("PT30S"));
        $this->duration_time = $d1->format("Y-m-d H:i:s");
        $this->update();
    }
    
}

?>