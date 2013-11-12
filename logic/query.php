<?php

class query {
    
    public static function get_fields($tables) {
        $fields = array();
        foreach($tables as $table) {
            $fields = array_merge($fields, ormlib::get_list_from_instance(new metadata_field(), array("metadata_table_id"), array($table->id)));
        }
        return $fields;
    }
    
    public static function get_from($tables) {
        $query_from = array();
        foreach($tables as $table) {
            $query_from[] = $table->name;
        }
        return $query_from;
    } 
    
    public static function get_query_relations($fields, $tables) {
        $relations = query::get_relations($fields);
        $query_relation = array();
        foreach($relations as $relation) { //build query relations
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
                if($table->id*1 === $field1->metadata_table_id*1) {
                    $table1 = $table;
                }
                if($table->id*1 === $field2->metadata_table_id*1) {
                    $table2 = $table;
                }
            }
            $query_relation[] = $table1->name.".`".$field1->name_in_table."` = `".$table2->name."`.".$field2->name_in_table;
        }
        return $query_relation;
    }
    
    public static function get_relations($fields) {
        $relations = array();
        
        foreach($fields as $field) {
            $relations = array_merge($relations, ormlib::get_list_from_instance(new metadata_table_relation(), array("metadata_field_id1"), array($field->id)));
            $relations = array_merge($relations, ormlib::get_list_from_instance(new metadata_table_relation(), array("metadata_field_id2"), array($field->id)));   
        }
        
        for($j=0;$j<count($relations)-1;$j++) { //remove double relations
            for($k=$j+1;$k<count($relations);$k++) {
                if($relations[$j]->metadata_field_id1*1 === $relations[$k]->metadata_field_id1*1 &&
                   $relations[$j]->metadata_field_id2*1 === $relations[$k]->metadata_field_id2*1) {
                    array_splice($relations, $k ,1);
                    $k--;
                }
            }
        }
        
        return $relations;
    }
    
    public static function get_query_fields($fields, $tables, $element_fields) {
        $query_datafields = array();
        foreach($fields as $field) {
            foreach($element_fields as $element_field) {
                if($field->id*1 === $element_field->metadata_field_id*1) {
                    $query_datafields[] = $field;
                }
            }
        }
        
        $query_fields = array();
        foreach($query_datafields as $query_datafield) {
            foreach($tables as $table) {
                if($query_datafield->metadata_table_id*1 === $table->id*1) {
                    $query_fields []= $table->name.".`".$query_datafield->name_in_table."` as '".$query_datafield->name."'";
                }
            }
        }
        return $query_fields;
    }
    
    public static function get_query_elements($metadata_id, $element_fields = array()) {
        
        $tables = ormlib::get_list_from_instance(new metadata_table(), array("metadata_id"), array($metadata_id));
        $query_from = query::get_from($tables);
        
        $fields = query::get_fields($tables);
        $query_relation = query::get_query_relations($fields, $tables);
        
        $query_fields = query::get_query_fields($fields, $tables, $element_fields);
        
        return array("fields" => $query_fields, "from" => $query_from, "relations" => $query_relation);
        
    }
    
    public static function get_field_relations($keys, $values) {
        $relations = array();
        for($i=0;$i<count($keys);$i++) {
            $key = $keys[$i];
            $value = $values[$i];
            $metadata_field = ormlib::get_from_instance(new metadata_field(), array("id"), array($key));
            $metadata_table = ormlib::get_from_instance(new metadata_table(), array("id"), array($metadata_field->metadata_table_id));
            $relations[] = $metadata_table->name.".`".$metadata_field->name_in_table."` like '%".$value."%'";
        }
        return $relations;
    }
    
    public static function get_meta_relations($keys, $metadata_id) {
        $relations = array();
        for($i=0;$i<count($keys);$i++) {
            $key = $keys[$i];
            $metadata_field = ormlib::get_from_instance(new metadata_field(), array("id"), array($key));
            $metadata_table = ormlib::get_from_instance(new metadata_table(), array("id"), array($metadata_field->metadata_table_id));
            $relations = array_merge($relations, query::get_meta_relations_1($metadata_table->metadata_id, $metadata_id));
            $relations = array_merge($relations, query::get_meta_relations_1($metadata_id, $metadata_table->metadata_id));
        }
        return $relations;
    }
    
    public static function get_meta_relations_1($metadata_id, $metadata_id1) {
        global $dbconnection;
        $query = "select 
                metadata_relation.metadata_field_id1,
                metadata_relation.metadata_field_id2
            from 
                metadata_relation, 
                metadata_table as metadata_table1, 
                metadata_field as metadata_field1, 
                metadata_table as metadata_table2, 
                metadata_field as metadata_field2
            where 
                metadata_relation.metadata_field_id1 = metadata_field1.id and 
                metadata_field1.metadata_table_id = metadata_table1.id and 
                metadata_table1.metadata_id = $metadata_id and 
                metadata_relation.metadata_field_id2 = metadata_field2.id and 
                metadata_field2.metadata_table_id = metadata_table2.id and 
                metadata_table2.metadata_id = $metadata_id1
            ";
        $result = $dbconnection->do_query_meta_response($query);
        $fields = array();
        while($myrow = mysql_fetch_array($result)) {
            $fields[] = array($myrow["metadata_field_id1"], $myrow["metadata_field_id2"]);
        }
        
        $relations = array();
        foreach($fields as $field) {
            $relations[] = query::get_meta_relations_2($field[0])." = ".query::get_meta_relations_2($field[1]);
        }
        return $relations;
    }
    
    public static function get_meta_relations_2($metadata_field_id) {
        $metadata_field = ormlib::get_from_instance(new metadata_field(), array("id"), array($metadata_field_id));
        $metadata_table = ormlib::get_from_instance(new metadata_table(), array("id"), array($metadata_field->metadata_table_id));
        return $metadata_table->name.".`".$metadata_field->name_in_table."`";
    }
}

?>