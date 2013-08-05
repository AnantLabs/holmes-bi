<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

define($FIELD_TYPE_TEXT, 1);
define($FIELD_TYPE_NUMBER, 1);
define($FIELD_TYPE_LOCATION, 1);
define($FIELD_TYPE_CURRENCY, 1);
define($FIELD_TYPE_SELECTION, 1);

/**
 * Cube field definition
 */

class metadata_field {
    var $id = 0;
    var $metadataid = 0;
    var $name = "";
}

?>