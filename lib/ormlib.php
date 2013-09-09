<?php

if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * ORM Class for entities.
 * ORM = Object Relation Mapper
 */
class ormlib {
    
    var $className;
    var $key;
    
    /**
     * Constructor
     * @param type $className
     * @param type $key
     */
    function __construct($className, $key) {
        $this->className = $className;
        $this->key = $key;
    }
    
    /**
     * Create Object Instance
     * @return type
     */
    function create_instance() {
        $r = new ReflectionClass($this->className);
        return $r->newInstanceArgs();
    }
    
    /**
     * Insert entity.
     * @global type $dbconnection
     */
    function insert() {
        global $dbconnection;
        $reflect = new ReflectionClass($this);
        $props = $reflect->getProperties();
        $keys = array();
        $values = array();
        foreach($props as $prop) {
            $propname = $prop->name;
            if($prop->class==$this->className) {
                if(!is_array($this->$propname) && $this->key != $propname) {
                    $keys[] = $propname;
                    $values[] = $this->$propname;
                }
            }
        }
        $query = "INSERT INTO ".$this->className." (".implode(",", $keys).") VALUES (\"".implode("\",\"",$values)."\")";
        $dbconnection->do_query_meta($query);
        $key1 = $this->key;
        $this->$key1 = $dbconnection->last_insert_meta();
    }
    
    /**
     * returns an entity with key
     * @param type $id
     * @return type
     */
    function get($key) {
        $keys = array($this->key);
        $values = array($key);
        return $this->get_with_parameter($keys, $values);
    }
    
    /**
     * Returns one entity with parameters
     * @global type $dbconnection
     * @param type $keys
     * @param type $values
     * @return null
     */
    function get_with_parameter($keys = array(), $values = array()) {
        global $dbconnection;
        $wheres = array();
        for($i=0;$i<count($keys);$i++) {
            $wheres[] = $keys[$i]."='".$values[$i]."'";
        }
        $where = "";
        if(count($wheres) > 0) {
            $where = " WHERE ".implode(" AND ", $wheres);
        }
        else {
            return NULL;
        }
        $query = "SELECT * FROM ".$this->className." $where";
        $result = $dbconnection->do_query_meta_response($query);
        $object = $this->create_instance();
        $reflect = new ReflectionClass($this);
        $props = $reflect->getProperties();
        while($myrow = mysql_fetch_array($result)) {
            foreach($props as $prop) {
                $propname = $prop->name;
                if($prop->class==$this->className) {
                    if(!is_array($object->$propname)) {
                        $object->$propname = $myrow[$propname];
                    }
                }
            }
        }
        $key = $this->key;
        if($object->$key != "") {
            return $object;
        }
        else {
            return NULL;
        }
    }
    
    /**
     * Update entity.
     * @global type $dbconnection
     */
    function update() {
        global $dbconnection;
        $reflect = new ReflectionClass($this);
        $props = $reflect->getProperties();
        $keys = array();
        $key = "";
        foreach($props as $prop) {
            $propname = $prop->name;
            if($prop->class==$this->className) {
                if(!is_array($this->$propname) && $propname != $this->key) {
                    $keys[] = $propname."='".($this->$propname)."'";
                }
            }
            if($propname==$this->key) {
                $key = $this->$propname;
            }
        }
        $query = "update ".$this->className." set ".implode(",", $keys)." where ".$this->key." = '$key'";
        $dbconnection->do_query_meta_response($query);
    }
    
    /**
     * Returns a list of entity with parameters
     * @global type $dbconnection
     * @param type $keys
     * @param type $values
     * @param type $order_by order f.e. index desc
     * @return type
     */
    function get_list($keys = array(), $values = array(), $order_by = "") {
        global $dbconnection;
        $wheres = array();
        for($i=0;$i<count($keys);$i++) {
            $wheres[] = $keys[$i]."='".$values[$i]."'";
        }
        $where = "";
        if(count($wheres) > 0) {
            $where = " where ".implode(" AND ", $wheres);
        }
        $objects = array();
        $query = "select * from ".$this->className." $where ".($order_by != "" ? "order by $order_by" : $order_by);
        $result = $dbconnection->do_query_meta_response($query);
        while($myrow = mysql_fetch_array($result)) {
            $object = $this->create_instance();
            $reflect = new ReflectionClass($object);
            $props = $reflect->getProperties();
            foreach($props as $prop) {
                $propname = $prop->name;
                if($prop->class==$object->className) {
                    if(!is_array($object->$propname)) {
                        $object->$propname = $myrow[$propname];
                    }
                }
            }
            $objects[] = $object;
        }
        return $objects;
    }
    
}

?>