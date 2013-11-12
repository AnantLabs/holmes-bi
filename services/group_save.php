<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
echo json_encode(group::check_and_save($_REQUEST["session_id"], $_REQUEST["group_id"], $_REQUEST["group_name"]));

?>