<?php

if (!defined('INTERFACE_ACCESS')) {
    die('Direct access not premitted');
}

/**
 * Cube definition for handling
 */
class metadata_field_selection extends ormlib {

    var $id = 0;
    var $metadata_table_id = 0;
    var $name = "";
    var $value = "";
    
    function __construct() {
        parent::__construct("metadata_field_selection", "id");
    }
    
}

?>