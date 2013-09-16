<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Cube field definition
 */
class metadata_field extends ormlib {
    
    const METADATA_FIELD_TYPE_TEXT = 1;
    const METADATA_FIELD_TYPE_NUMBER = 2;
    const METADATA_FIELD_TYPE_LOCATION = 3;
    const METADATA_FIELD_TYPE_CURRENCY = 4;
    const METADATA_FIELD_TYPE_SELECTION = 5;
    const METADATA_FIELD_TYPE_DATE = 6;
    const METADATA_FIELD_TYPE_DATE_TIME = 7;
    
    var $id = 0;
    var $metadata_table_id = 0;
    var $name = "";
    var $name_in_table = "";
    var $type = "";
    var $metadata_field_id_key = 0;
    var $metadata_field_id_value = 0;
    
    function __construct() {
        parent::__construct("metadata_field", "id");
    }
}

?>