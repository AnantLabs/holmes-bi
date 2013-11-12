<?php

global $dbconnection;

define("INTERFACE_ACCESS", TRUE);

$object = $_REQUEST["object"];
$action = $_REQUEST["action"];

if (file_exists("services/" . $object . "_" . $action . ".php")) {
    try {
        include "config.php";
        include "lib/dbconnection.php";
        include "lib/ormlib.php";
        include "logic/group.php";
        
        //Report includes
        include "logic/report.php";
        include "logic/report_element.php";
        include "logic/report_element_field.php";
        include "logic/report_metadata_condition.php";
        include "logic/report_navigation.php";
        include "logic/report_navigation_report.php";
        include "logic/report_navigation_structur.php";
        include "logic/report_privileg.php";
        include "logic/report_wrapper.php";
        include "logic/query.php";
        
        //Metadata includes
        include "logic/metadata.php";
        include "logic/metadata_field.php";
        include "logic/metadata_relation.php";
        include "logic/metadata_table.php";
        include "logic/metadata_table_relation.php";
        include "logic/metadata_wrapper.php";
        
        include "logic/user.php";
        include "logic/user_group.php";
        include "logic/user_settings.php";
        include "logic/session.php";
        $dbconnection->init();
        $dbconnection->start();
        require_once("services/" . $object . "_" . $action . ".php");
        $dbconnection->close();
    } catch (Exception $exc) {
        echo $exc->getMessage();
    }
} else {
    echo "error no url";
}

?>