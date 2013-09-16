<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

$session_id = $_REQUEST["session_id"];
$session = session::get_session($session_id);
if($session->is_valid()) {
    echo json_encode(ormlib::get_list_from_instance(new user_settings(), array("user_id"), array($session->user_id)));
}

?>