<?php

/**
 * Wrapper class for working with navigation elements
 */
class report_navigation_structur {
    
    var $id;
    var $name;
    var $description;
    var $head_id;
    var $report_id;
    var $sub_structur = array();
    
    public function __construct($id, $name, $head_id, $report_id, $description = "") {
        $this->id = $id;
        $this->name = utf8_encode($name);
        $this->head_id = $head_id;
        $this->report_id = $report_id;
        $this->description = utf8_encode($description);
    }
    
    public function add_navigation($report_navigation_structur) {
        if($report_navigation_structur->head_id*1 === $this->id*1) {
            $this->sub_structur[] = $report_navigation_structur;
            return true;
        }
        else {
            for($i=0;$i<count($this->sub_structur);$i++) {
                if($this->sub_structur[$i]->add_navigation($report_navigation_structur)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    public function remove_empty_elements() {
        for($i=0;$i<count($this->sub_structur);$i++) {
            if($this->sub_structur[$i]->remove_empty_elements()) {
                array_splice($this->sub_structur, $i, 1);
                $i--;
            }
        }
        if(count($this->sub_structur) === 0 && $this->report_id === 0) {
            return true;
        }
        return false;
    }
    
}

?>