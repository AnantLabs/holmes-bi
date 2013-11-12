<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
echo json_encode(user::check_and_save($_REQUEST["session_id"], $_REQUEST["user_id"], $_REQUEST["username"], $_REQUEST["password"]));

?>