<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

define("PRIVILEG_ID_ACCESS", 1);

class report_privileg extends ormlib {
    var $id = 0;
    var $report_id = "";
    var $group_id = "";
    var $privileg_id = 0;
    
    public function __construct() {
        parent::__construct("report_privileg", "id");
    }
    
}

?>