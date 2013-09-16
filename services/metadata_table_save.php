<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
$session_id = $_REQUEST["session_id"];
$session = session::get_session($session_id);
$user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
if($session->is_valid()===true && $user->has_group(session::GROUP_METADATA)===true) {
    $metadata_table = new metadata_table();
    $metadata_table->name = $_REQUEST["table_name"];
    $metadata_table->metadata_id = $_REQUEST["metadata_id"];
    $metadata_table->id = $_REQUEST["table_id"];
    if($_REQUEST["table_id"]!=="-1") {
        $metadata_table->update();
    }
    else {
        $metadata_table->insert();
    }
    echo json_encode($metadata_table);
}
else {
    echo "no privileg";
}

?>