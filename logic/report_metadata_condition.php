<?php

class report_metadata_condition {
    var $id = 0;
    var $report_id = 0;
    var $metadata_field_id = 0;
    
    function __construct() {
        parent::__construct("report_metadata_condition", "id");
    }
    
}

?>