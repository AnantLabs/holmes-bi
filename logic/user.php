<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

class user extends ormlib {
    var $id = 0;
    var $username = "";
    var $password = "";
    
    public function __construct() {
        parent::__construct("user", "id");
    }
    
    public function has_group($group_name) {
        global $dbconnection;
        $query = "select * from `user_group`, `group` where user_group.group_id = group.id and group.name like \"".$group_name."\" and user_group.user_id = \"".$this->id."\""; 
        $result = $dbconnection->do_query_meta_response($query);
        $has_group = false;
        while($myrow = mysql_fetch_array($result)) {
            $has_group = true;
        }
        return $has_group;
    }
    
    public static function get_list_with_session($session_id) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                return ormlib::get_list_from_instance(new user());
            }
        }
        return null;
    }
    
    public static function check_and_save($session_id, $user_id, $username, $password) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                if($username != "" && $password != "") {
                    user::save($user_id, $username, $password);
                    return array("response" => "OK");
                }
                else {
                    return array("response" => "error", "message" => "name or password is empty");
                }
            }
        }
        return array("response" => "error", "message" => "no privileg");
    }
    
    private static function save($user_id, $username, $password) {
        if($user_id*1===-1) {
            $user = new user();
            $user->username = $username;
            $user->password = md5($password);
            $user->insert();

        }
        else {
            $user = new user();
            $user->id = $user_id;
            $user->username = $username;
            $user->password = md5($password);
            $user->update();
        }
    }
    
    public static function check_and_remove($session_id, $user_id) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user->has_group(session::GROUP_METADATA) === true) {
                if($user_id*1 > 1) {
                    ormlib::remove_from_instance(new user(), "`id` = $user_id");
                    ormlib::remove_from_instance(new user_group(), "`user_id` = $user_id");
                    return array("response" => "OK");
                }
                else {
                    return array("response" => "error", "message" => "user_id is wrong");
                }
            }
        }
        return array("response" => "error", "message" => "no privileg");
    }
    
    
    
}
?>