<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

define('PRIVILEG_OPERATOR', 1);
define('PRIVILEG_MANAGER', 2);
define('PRIVILEG_ADMIN', 3);

/**
 * Class for handling privileg (set privileg to group)
 */
class privileg {
    var $id = 0;
    var $privilegid = "";
    var $groupid = 0; 
}

?>