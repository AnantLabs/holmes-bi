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
}
?>