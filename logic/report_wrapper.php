<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Wrapper class for report
 */
class report_wrapper extends report {
    
    var $report_element_list = array();
    var $report_element_field_list = array();
    var $report_element_metadata_mapping = array();
    
    public function __construct() {
        parent::__construct();
    }
    
    public function load_structur_with_session($id, $session_id) {
        $object = new report();
        $reportlist = $object->get_list_with_session($session_id);
        $found = false;
        for($i=0;$i<count($reportlist);$i++) {
            if($reportlist[$i]->id*1 === $id*1) {
                $object = $reportlist[$i];
                $found = true;
            }
        }
        if($found===false) return null;
        $rw = new report_wrapper();
        $rw->id = $object->id;
        $rw->name = $object->name;
        $rw->report_element_list = ormlib::get_list_from_instance(new report_element(), array("report_id"), array($id));
        for($i=0;$i<count($rw->report_element_list);$i++) {
            $rw->report_element_field_list = array_merge($rw->report_element_field_list, ormlib::get_list_from_instance(new report_element_field(), array("report_element_id"), array($rw->report_element_list[$i]->id)));
        }
        for($i=0;$i<count($rw->report_element_field_list);$i++) {
            $rw->report_element_metadata_mapping[] = ormlib::get_from_instance(new metadata_field(), array("id"), array($rw->report_element_field_list[$i]->metadata_field_id));
        }
        return $rw;
    }
}

?>
