<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

$session = array();
$session["session_id"] = md5("sdf87s98gf7d97");
if($username !== "test" || $password !== "test") {
    $session["session_id"] = "";
}
$session["session_username"] = $_REQUEST["username"];
$session["session_password"] = $_REQUEST["password"];
echo json_encode($session);

?>