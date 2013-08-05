<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

define("REPORT_ELEMENT_TYPE_TABLE",1);
define("REPORT_ELEMENT_TYPE_MAP",2);
define("REPORT_ELEMENT_TYPE_PIECHART",3);
define("REPORT_ELEMENT_TYPE_BARCHART",4);
define("REPORT_ELEMENT_TYPE_LINECHART",5);

/**
 * TODO
 */
class report_element {
    var $id;
    var $metadataid = 0;
    var $type = 0;
    var $name = "";
    var $attributes = array();
}

?>