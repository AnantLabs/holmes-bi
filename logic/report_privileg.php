<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

class report_privileg extends ormlib {
    
    const PRIVILEG_ID_ACCESS = 1;
    
    var $id = 0;
    var $report_id = "";
    var $group_id = "";
    var $privileg_id = 0;
    
    public function __construct() {
        parent::__construct("report_privileg", "id");
    }
    
}

?>