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
        
        $query_elements = query::get_query_elements($table->metadata_id, $element_fields);
        for($j=0;$j<count($field_list_key);$j++) {
            $metadata_field = report_wrapper::get_from_instance(new metadata_field(), array("id"), array($field_list_key[$j]));
            $metadata_table = report_wrapper::get_from_instance(new metadata_table(), array("id"), array($metadata_field->metadata_table_id));
            if($metadata_table->id*1 !== $table->metadata_id) {
                $query_elements1 = query::get_query_elements($metadata_table->metadata_id);
                $query_elements["from"] = array_merge($query_elements["from"], $query_elements1["from"]);
                $query_elements["relations"] = array_merge($query_elements["relations"], $query_elements1["relations"]);
            }
        }
        
        //Get Datastructur for Query for metadata
        $query_fields = implode($query_elements["fields"], ",");
        $query_from = implode($query_elements["from"], ",");
        $query_elements["relations"] = array_merge($query_elements["relations"], query::get_field_relations($field_list_key, $field_list_value));
        $query_elements["relations"] = array_merge($query_elements["relations"], query::get_meta_relations($field_list_key, $table->metadata_id));
        $query_relation = implode($query_elements["relations"], " AND ");
        $query = "SELECT $query_fields from $query_from  WHERE $query_relation";
        $result = $dbconnection->do_query_data_response($query);
        $list = array();
        while($myrow = mysql_fetch_array($result)) {
            $arr = array();
            foreach($myrow as $key => $value) {
                $arr[$key] = $value;
            }
            $list[] = $arr;
        }
        $values[$rw->report_element_list[$i]->id] = $list;
    }
    echo json_encode($values);
}

?>