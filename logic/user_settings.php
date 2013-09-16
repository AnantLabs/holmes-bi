<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * user settings class
 */
class user_settings extends ormlib {
    var $id = 0;
    var $user_id = 0;
    var $key = "";
    var $value = "";
    function __construct() {
        parent::__construct("user_settings", "id");
    }
}

?>