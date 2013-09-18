<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

$session_id = $_REQUEST["session_id"];
$field_list_key = $_REQUEST["field_list_key"];
$field_list_value = $_REQUEST["field_list_value"];
$report_id = $_REQUEST["report_id"];

$rw = report_wrapper::load_structur_with_session($report_id, $session_id);

if($rw !== null && $rw->id !== "") {
    $values = array();
    for($i=0;$i<count($rw->report_element_list);$i++) {
        $element_fields = array();
        for($j=0;$j<count($rw->report_element_field_list);$j++) {
            if($rw->report_element_list[$i]->id*1 === $rw->report_element_field_list[$j]->report_element_id*1) {
                $element_fields[] = $rw->report_element_field_list[$j];
            }
        }
        
        $field = null;
        for($j=0;$j<count($rw->report_element_metadata_mapping);$j++) {
            if($rw->report_element_metadata_mapping[$j]->id*1 === $element_fields[0]->metadata_field_id*1) {
                $field = $rw->report_element_metadata_mapping[$j];
            }
        }
        
        $table = ormlib::get_from_instance(new metadata_table(), array("id"), array($field->metadata_table_id));
        
        //Get Datastructur for Query for metadata
        $fields = array();
        $tables = ormlib::get_list_from_instance(new metadata_table(), array("metadata_id"), array($table->metadata_id));
        $query_from = "";
        foreach($tables as $table) {
            if(strlen($query_from)!==0) {
                $query_from .= ",";
            }
            $query_from .= $table->name;
            $fields = array_merge($fields, ormlib::get_list_from_instance(new metadata_field(), array("metadata_table_id"), array($table->id)));
        }
        
        //check whether global report query is in query
        
        
        $relations = array();
        $query_datafields = array();
        foreach($fields as $field) {
            $relations = array_merge($relations, ormlib::get_list_from_instance(new metadata_table_relation(), array("metadata_field_id1"), $field->id));
            $relations = array_merge($relations, ormlib::get_list_from_instance(new metadata_table_relation(), array("metadata_field_id2"), $field->id));
            foreach($element_fields as $element_field1) {
                if($field->id*1 === $element_field1->metadata_field_id*1) {
                    $query_datafields[] = $field;
                }
            }
        }
        //remove double relations
        
        $query_relation = "";
        foreach($relations as $relation) {
            $field1 = "";
            $field2 = "";
            foreach($fields as $field) {
                if($field->id*1 === $relation->metadata_field_id1*1) {
                    $field1 = $field;
                }
                if($field->id*1 === $relation->metadata_field_id2*1) {
                    $field2 = $field;
                }
            }
            $table1 = "";
            $table2 = "";
            foreach($tables as $table) {
                if($table->id*1 === $field1->metadata_table_id) {
                    $table1 = $table;
                }
                if($table->id*1 === $field2->metadata_table_id) {
                    $table2 = $table;
                }
            }
            if(strlen($query_relation)!==0) {
                $query_relation .= " AND ";
            }
            $query_relation .= $table1->name.".`".$field1->name_in_table."` = `".$table2->name."`.".$field2->name_in_table;
        }
        
        $query_fields = "";
        foreach($query_datafields as $query_datafield) {
            foreach($tables as $table) {
                if($query_datafield->metadata_table_id*1 === $table->id*1) {
                    if(strlen($query_fields)!==0) {
                        $query_fields .= ",";
                    }
                    $query_fields .= $table->name.".`".$query_datafield->name_in_table."` as '".$query_datafield->name."'";
                }
            }
        }
        
        //TODO Update $query_from, $query_relation for metadata
        
        if(strlen($query_relation)===0) {
            $query_relation .= " 1 ";
        }
        
        $query = "SELECT $query_fields from $query_from WHERE $query_relation";
        echo $query;
    }
}

?>