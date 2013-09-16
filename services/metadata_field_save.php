<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
$session_id = $_REQUEST["session_id"];
$session = session::get_session($session_id);
$user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
if($session->is_valid()===true && $user->has_group(session::GROUP_METADATA)===true) {
    $metadata_field = new metadata_table();
    $metadata_field->id = $_REQUEST["field_id"];
    $metadata_field->metadata_id = $_REQUEST["metadata_id"];
    $metadata_field->name = $_REQUEST["field_name"];
    $metadata_field->name_in_field = $_REQUEST["field_name_in_field"];
    $metadata_field->metadata_table_id = $_REQUEST["table_id"];
    $metadata_field->type = $_REQUEST["type"];
    $metadata_field->table_id = $_REQUEST["table_id"];
    $metadata_field->table_key_field_id = $_REQUEST["table_key_field_id"];
    $metadata_field->table_name_field_id = $_REQUEST["table_name_field_id"];
    if($_REQUEST["field_id"]!=="-1") {
        $metadata_field->update();
    }
    else {
        $metadata_field->insert();
    }
    echo json_encode($metadata_field);
}
else {
    echo "no privileg";
}

?>