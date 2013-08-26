<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

class report_element_grouping extends ormlib {
    var $id = 0;
    var $report_elementid = 0;
    var $metadatafieldid = 0;
    var $order = 0;
    
    public function __construct() {
        parent::__construct("report_element_grouping", "id");
    }
}

?>
