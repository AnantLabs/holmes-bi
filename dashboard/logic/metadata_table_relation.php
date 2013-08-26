<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * 
 */
class metadata_tablerelation extends ormlib {
    var $id = 0;
    var $metadataid = 0;
    var $table1_field = "";
    var $table2_field = "";
    function __construct() {
        parent::__construct("metadata_tablerelation", "id");
    }
}

?>