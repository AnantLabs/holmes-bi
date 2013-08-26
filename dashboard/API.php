<?php

define("INTERFACE_ACCESS", TRUE);

$object = $_REQUEST["object"];
$action = $_REQUEST["action"];

if (file_exists("services/" . $object . "_" . $action . ".php")) {
    try {
        include "config.php";
        include "lib/dbconnection.php";
        include "lib/ormlib.php";
        include "logic/group.php";
        include "logic/report.php";
        include "logic/report_navigation.php";
        include "logic/report_navigation_report.php";
        include "logic/report_navigation_structur.php";
        include "logic/report_privileg.php";
        include "logic/user.php";
        include "logic/user_group.php";
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