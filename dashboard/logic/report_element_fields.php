<?php

define("REPORT_ELEMENT_FIELD_TYPE_KEY", 1);
define("REPORT_ELEMENT_FIELD_TYPE_FIELD", 2);
define("REPORT_ELEMENT_FIELD_TYPE_VALUE1", 3);

define("REPORT_ELEMENT_FIELD_ATTRIBUTE_WITHOUT", 0);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_SUM", 1);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_AVG", 2);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_MIN", 3);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_MAX", 4);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_YEAR", 5);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_DAY", 6);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_MONTH", 7);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_MONTH_YEAR", 8);
define("REPORT_ELEMENT_FIELD_ATTRIBUTE_WEEK_YEAR", 8);

class report_element_field extends ormlib {
    var $id = 0;
    var $name = "";
    var $type = 0;
    var $attribute = 0;
    var $order = 0;
    var $groupby = false;
    
    public function __construct() {
        parent::__construct("report_element_field", "id");
    }
}

?>