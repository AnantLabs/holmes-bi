<?php

define("INTERFACE_ACCESS", TRUE);

if (file_exists("service/" . $object . "_" . $action . ".php")) {
    try {
        include "lib/dbconnection.php";
        include "config.php";
        include "logic/group.php";
        include "logic/query.php";
        include "logic/query_fields.php";
        include "logic/query_tables.php";
        include "logic/report.php";
        include "logic/reportgroup.php";
        include "logic/reportnavigation.php";
        include "logic/user.php";
        include "logic/usergroup.php";
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