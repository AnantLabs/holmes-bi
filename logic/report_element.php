<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

define("REPORT_ELEMENT_TYPE_TABLE",1);
define("REPORT_ELEMENT_TYPE_MAP",2);
define("REPORT_ELEMENT_TYPE_PIECHART",3);
define("REPORT_ELEMENT_TYPE_BARCHART",4);
define("REPORT_ELEMENT_TYPE_LINECHART",5);

/**
 * Report Element
 */
class report_element extends ormlib {
    var $id;
    var $type = 0;
    var $name = "";
    var $report_id = 0;
    var $index = 0;
    var $metadata_id = 0;
    
    function __construct() {
        parent::__construct("report_element", "id");
    }
    
    function get_list($keys = array(), $values = array()) {
        return parent::get_list($keys, $values, "`index` desc");
    }
    
}

?>