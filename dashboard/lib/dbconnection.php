<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Lib for handling db connection.
 */

$dbconnection = new dbconnection();

define("TYPE_DASHBOARD_DB", 1);
define("TYPE_METADATA_DB", 2);

class dbconnection {
    var $datadb; //databasename for dashboard db
    var $datadb_username; //username for dashboard db
    var $datadb_password; //password for dashboard db
    var $datadb_host; //host for dashboard db
    
    var $metadb; //databasename for metadatadb
    var $metadb_username; //username for metadata db
    var $metadb_password; //password for metadata db
    var $metadb_host; //host for metadata db
    
    var $datadb_connection = NULL; //databaseobject for dashboard db
    var $metadb_connection = NULL; //databaseobject for metadatabase db
    
    /**
     * Init Element
     */
    public function init() {
        global $config;
        $this->datadb = $config["datadb"]["name"];
        $this->datadb_username = $config["datadb"]["username"];
        $this->datadb_password = $config["datadb"]["password"];
        $this->datadb_host = $config["datadb"]["host"];
        
        $this->metadb = $config["metadb"]["name"];
        $this->metadb_username = $config["metadb"]["username"];
        $this->metadb_password = $config["metadb"]["password"];
        $this->metadb_host = $config["metadb"]["host"];
    }
    
    /**
     * Start Initialisierung
     */
    public function start() {
        $this->datadb_connection = mysql_connect($this->datadb_host, $this->datadb_username, $this->datadb_password, true) or die('Could not connect to mysql server.');
        mysql_select_db($this->datadb, $this->datadb_connection);
        $this->metadb_connection = mysql_connect($this->metadb_host, $this->metadb_username, $this->metadb_password, true) or die('Could not connect to mysql server.');
        mysql_select_db($this->metadb, $this->metadb_connection);
    }
    
    /**
     * Close Function
     */
    public function close() {
        mysql_close($this->datadb_connection);
        mysql_close($this->metadb_connection);
    }
    
    
    /**
     * @param String $query query to be done
     */
    public function do_query_meta($query) {
        mysql_query($query, $this->metadb_connection);
    }
    
    /**
     * @param String $query query to be done
     */
    public function do_query_data($query) {
        mysql_query($query, $this->datadb_connection);
    }
    
    /**
     * @param String $query query to be done
     */
    public function do_query_meta_response($query) {
        return mysql_query($query, $this->metadb_connection);
    }
    
    /**
     * @param String $query query to be done
     */
    public function do_query_data_response($query) {
        return mysql_query($query, $this->datadb_connection);
    }
    
    /**
     * 
     * @return type ID of last insert mysql with dataresource meta
     */
    public function last_insert_meta() {
        return mysql_insert_id($this->metadb_connection);
    }
    
    /**
     * @return type ID of last insert mysql with dataresource data
     */
    public function last_insert_data() {
        return mysql_insert_id($this->datadb_connection);
    }
    
}
?>
