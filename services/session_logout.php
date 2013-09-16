<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

$session_id = $_REQUEST["session_id"];
echo json_encode(session::logout($session_id));

?>