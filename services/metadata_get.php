<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
echo json_encode(metadata_wrapper::get_list_with_session($_REQUEST["session_id"]));

?>