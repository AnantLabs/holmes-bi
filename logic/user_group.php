<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

class user_group extends ormlib {
    var $id = 0;
    var $user_id = "";
    var $group_id = "";
    
    function __construct() {
        parent::__construct("user_group", "id");
    }
    
    public static function get_list_with_session($session_id) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                return ormlib::get_list_from_instance(new user_group());
            }
        }
        return null;
    }
    
    public static function check_and_save($session_id, $user_id, $group_id) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                if($user_id != "" && $group_id != "" && $user_id*1 > 0 && $group_id*1 > 0) {
                    user_group::save($user_id, $group_id);
                    return array("response" => "OK");
                }
                else {
                    return array("response" => "error", "message" => "user_id or group_id is empty or zero.");
                }
            }
        }
        return array("response" => "error", "message" => "no privileg");
    }
    
    private static function save($user_id, $group_id) {
        $user_group = new user_group();
        $user_group->user_id= $user_id;
        $user_group->group_id= $group_id;
        $user_group->insert();
    }
    
    public static function check_and_remove($session_id, $user_id, $group_id) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                if($user_id != "" && $group_id != "" && $user_id*1 > 0 && $group_id*1 > 0) {
                    ormlib::remove_from_instance(new user_group(), "`user_id` = $user_id and `group_id` = $group_id");
                    return array("response" => "OK");
                }
                else {
                    return array("response" => "error", "message" => "user_id or group_id is empty or zero.");
                }
            }
        }
        return array("response" => "error", "message" => "no privileg");
    }
    
}
?>
