<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

define("FIELD_TYPE_TEXT", 1);
define("FIELD_TYPE_NUMBER", 2);
define("FIELD_TYPE_LOCATION", 3);
define("FIELD_TYPE_CURRENCY", 4);
define("FIELD_TYPE_SELECTION", 5);

/**
 * Cube field definition
 */

class metadata_field {
    var $id = 0;
    var $metadatatableid = 0;
    var $name = "";
}

?>