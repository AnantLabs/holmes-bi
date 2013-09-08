<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Wrapper class for report
 */
class report_wrapper extends report {
    
    var $report_element_list = array();
    var $report_element_metadata_mapping = array();
    var $metadata_wrapper_list = array();
    
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
        $report_element = new report_element();
        $rw->report_element_list = $report_element->get_list(array("report_id"),array($id));
        return $rw;
    }
}

?>
