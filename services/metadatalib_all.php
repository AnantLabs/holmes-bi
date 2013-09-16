<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}
$session_id = $_REQUEST["session_id"];
$session = session::get_session($session_id);
$user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
if($session->is_valid()===true && $user->has_group(session::GROUP_METADATA)===true) {
    $object1 = $_REQUEST["object1"];
    $ref = new ReflectionClass($object1);
    $method = $_REQUEST["method"];
    if($method==="list") {
        echo json_encode($ref->newInstanceArgs()->get_list());
    }
    if($method==="save") {
        $obj = $ref->newInstanceArgs();
        $obj->read_from_request();
        $key = $obj->key;
        if(($obj->$key)*1===-1) {
            $obj->insert();
        }
        else {
            $obj->update();
        }
        echo json_encode($obj);
    }
}
else {
    echo "no privileg";
}

?>