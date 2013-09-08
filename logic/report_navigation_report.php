<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Report Element
 */
class report_navigation_report extends ormlib {
    var $id;
    var $report_navigation_id = 0;
    var $report_id = 0;
    
    function __construct() {
        parent::__construct("report_navigation_report", "id");
    }
    
    
}

?>