<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

class user_group extends ormlib {
    var $id = 0;
    var $user_id = "";
    var $group_id = "";
    
    function __construct() {
        parent::__construct("user_group", "id");
    }
    
}
?>
