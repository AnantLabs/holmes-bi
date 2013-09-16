<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Report Element
 */
class report_element_field extends ormlib {
    
    var $id;
    var $report_element_id = 0;
    var $metadata_field_id = 0;
    var $index = "";
    
    function __construct() {
        parent::__construct("report_element_field", "id");
    }
    
    function get_list($keys = array(), $values = array()) {
        return parent::get_list($keys, $values, "`index` desc");
    }
    
}

?>