<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Report Element
 */
class report_element extends ormlib {
    
    const REPORT_ELEMENT_TYPE_TABLE = 1;
    const REPORT_ELEMENT_TYPE_MAP = 2;
    const REPORT_ELEMENT_TYPE_PIECHART = 3;
    const REPORT_ELEMENT_TYPE_BARCHART = 4;
    const REPORT_ELEMENT_TYPE_LINECHART = 5;
    
    var $id;
    var $type = 0;
    var $name = "";
    var $report_id = 0;
    var $index = 0;
    
    function __construct() {
        parent::__construct("report_element", "id");
    }
    
    function get_list($keys = array(), $values = array()) {
        return parent::get_list($keys, $values, "`index` desc");
    }
    
}

?>