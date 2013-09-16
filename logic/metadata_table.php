<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * metadata_table 
 */
class metadata_table extends ormlib {
    
    var $id = 0;
    var $name = "";
    var $metadata_id = 0;
    
    function __construct() {
        parent::__construct("metadata_table", "id");
    }
}

?>