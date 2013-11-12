<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Group class for privileg handling
 */
class group extends ormlib {
    var $id = 0;
    var $name = "";
    function __construct() {
        parent::__construct("group", "id");
    }
    
    public static function get_list_with_session($session_id) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                return ormlib::get_list_from_instance(new group());
            }
        }
        return null;
    }
    
    public static function check_and_save($session_id, $group_id, $group_name) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                if($group_name != "") {
                    group::save($group_id, $group_name);
                    return array("response" => "OK");
                }
                else {
                    return array("response" => "error", "message" => "name is empty");
                }
            }
        }
        return array("response" => "error", "message" => "no privileg");
    }
    
    private static function save($group_id, $group_name) {
        if($group_id*1===-1) {
            $group = new group();
            $group->name = $group_name;
            $group->insert();

        }
        else {
            $group = new group();
            $group->id = $group_id;
            $group->name = $group_name;
            $group->update();
        }
    }
    
    public static function check_and_remove($session_id, $group_id) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                if($group_id*1 > 2) {
                    ormlib::remove_from_instance(new group(), "`id` = $group_id");
                    ormlib::remove_from_instance(new user_group(), "`group_id` = $group_id");
                    return array("response" => "OK");
                }
                else {
                    return array("response" => "error", "message" => "group_id is wrong");
                }
            }
        }
        return array("response" => "error", "message" => "no privileg");
    }
    
}

?>