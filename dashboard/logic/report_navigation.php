<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

class report_navigation extends ormlib {
    var $id = 0;
    var $name = "";
    var $head_id = "";
    
    public function __construct() {
        parent::__construct("report_navigation", "id");
    }
    
    public static function get_structur_with_session($session_id) {
        $report_list = report::get_list_with_session($session_id);
        if(count($report_list)>0) {
            $rn = new report_navigation();
            $report_nav_list = $rn->get_list();
            
            //Turn Report Navigation List into Report Navigation Structur List
            $rns_list = array();
            for($i=0;$i<count($report_nav_list);$i++) {
                $rns_list[] = $report_nav_list[$i]->to_report_navigation_structur();
            }
            
            //Create Structur
            for($i=0;$i<count($rns_list);$i++) {
                $rns = $rns_list[$i];
                for($j=0;$j<count($rns_list);$j++) {
                    if($i!=$j) { 
                        if($rns->add_navigation($rns_list[$j])) {
                            array_splice($rns_list, $j, 1);
                            $j--;
                        }
                    }
                }
            }
            
            $rnr = new report_navigation_report();
            $rnr_list = $rnr->get_list();
            for($i=0;$i<count($rnr_list);$i++) {
                for($j=0;$j<count($report_list);$j++) {
                    if($report_list[$j]->id === $rnr_list[$i]->report_id) {
                        for($k=0;$k<count($rns_list);$k++) {
                            $rns_list[$k]->add_navigation(new report_navigation_structur(0, $report_list[$j]->name, $rnr_list[$i]->report_navigation_id, $report_list[$j]->id, $report_list[$j]->description));
                        }
                        $j = count($report_list);
                    }
                }
            }
            
            return $rns_list;
        }
        else {
            return null;
        }
            
    }
    
    public function to_report_navigation_structur() {
        return new report_navigation_structur($this->id, $this->name, $this->head_id, 0);
    }
    
}

?>