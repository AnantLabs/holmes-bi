<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

$session_id = $_REQUEST["session_id"];
$session = session::get_session($session_id);
if($session->is_valid()) {
    ormlib::remove_from_instance(new user_settings(), "user_id = '".$session->user_id."'");
    $user_settings = $_REQUEST["user_settings"];
    for($i=0;$i<count($user_settings);$i++) {
        $users = new user_settings();
        $users->user_id = $session->user_id;
        $users->key = $user_settings[$i]["key"];
        $users->value = $user_settings[$i]["value"];
        $users->insert();
        echo "test";
    }
    echo true;
}

?>