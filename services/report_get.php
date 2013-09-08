<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
echo json_encode(report_wrapper::load_structur_with_session($_REQUEST["report_id"], $_REQUEST["session_id"]));

?>