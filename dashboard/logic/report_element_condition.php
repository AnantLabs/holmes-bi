<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

define("REPORT_ELEMENT_CONDITION_TYPE_USERINPUT", 1);
define("REPORT_ELEMENT_CONDITION_TYPE_BACKGROUND", 2);

class report_element_condition {
    var $id = 0;
    var $metadatafieldid = 0;
    var $name = "";
    var $standardvalue = "";
    var $type = 0;
    var $order = 0;
}

?>