<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

class user extends ormlib {
    var $id = 0;
    var $username = "";
    var $password = "";
    
    public function __construct() {
        parent::__construct("user", "id");
    }
    
}
?>