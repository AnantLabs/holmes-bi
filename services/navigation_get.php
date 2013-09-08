<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
echo json_encode(report_navigation::get_structur_with_session($_REQUEST["session_id"]));

?>