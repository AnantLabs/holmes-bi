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
}

?>