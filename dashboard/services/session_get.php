<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

echo json_encode(session::create_session($username, $password));

?>