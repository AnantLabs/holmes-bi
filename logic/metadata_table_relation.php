<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * 
 */
class metadata_table_relation extends ormlib {
    
    var $id = 0;
    var $metadata_field_id1 = 0;
    var $metadata_field_id2 = 0;
    
    function __construct() {
        parent::__construct("metadata_table_relation", "id");
    }
}

?>