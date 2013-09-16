<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

class report extends ormlib {
    var $id = 0;
    var $name = "";
    var $description = "";
    
    function __construct() {
        parent::__construct("report", "id");
    }
    
    public static function get_list_with_session($session_id) {
        $session = session::get_session($session_id);
        if($session != null && $session->is_valid()) {
            $user_group = new user_group();
            $report_privileg_list = array();
            $user_group_list = $user_group->get_list(array("user_id"),array($session->user_id));
            for($i=0;$i<count($user_group_list);$i++) {
                $report_privileg = new report_privileg();
                $report_privileg_list = array_merge($report_privileg_list, $report_privileg->get_list(array("group_id","privileg_id"), array($user_group_list[$i]->group_id, report_privileg::PRIVILEG_ID_ACCESS)));
            }
            $report_list = array();
            $report = new report();
            for($i=0;$i<count($report_privileg_list);$i++) {
                array_push($report_list, $report->get($report_privileg_list[$i]->report_id));
            }
            $session->update();
            return $report_list;
        }
        return array();
    }
}

?>