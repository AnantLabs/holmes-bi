<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
$session_id = $_REQUEST["session_id"];
$session = session::get_session($session_id);
$user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
if($session->is_valid()===true && $user->has_group(session::GROUP_METADATA)===true) {
    $metadata_table = ormlib::get_from_instance(new metadata_table(), array("id"), array($_REQUEST["table_id"]));
    $metadata_table->remove();
    //TODO Remove more elements
    echo "true";
}
else {
    echo "no privileg";
}

?>