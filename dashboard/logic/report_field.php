<?php

define("REPORT_FIELD_ATTRIBUTES_GROUPBY", 1);
define("REPORT_FIELD_ATTRIBUTES_SUM", 2);
define("REPORT_FIELD_ATTRIBUTES_AVG", 3);
define("REPORT_FIELD_ATTRIBUTES_MIN", 4);
define("REPORT_FIELD_ATTRIBUTES_MAX", 5);

class report_field {
    var $id = 0;
    var $metadata_fieldid = 0;
    var $attributes = array(); 
    var $where_element = false;
}

?>
