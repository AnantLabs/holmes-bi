<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}


class report_metadata_condition extends ormlib {
    var $id = 0;
    var $report_id = 0;
    var $metadata_field_id = 0;
    var $standard = "";
    
    function __construct() {
        parent::__construct("report_metadata_condition", "id");
    }
    
}

?>