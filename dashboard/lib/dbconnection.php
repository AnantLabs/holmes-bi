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
    
    var $datadb_connection = null; //databaseobject for dashboard db
    var $metadb_connection = null; //databaseobject for metadatabase db
    
    /**
     * TODO
     */
    public function init() {
        $this->datadb = $config["db"]["name"];
        $this->datadb_username = $config["db"]["username"];
        $this->datadb_password = $config["db"]["password"];
        $this->datadb_host = $config["db"]["host"];
        
        $this->metadb = $config["mb_db"]["name"];
        $this->metadb_username = $config["mb_db"]["username"];
        $this->metadb_password = $config["mb_db"]["password"];
        $this->metadb_host = $config["mb_db"]["host"];
    }
    
    /**
     * TODO
     */
    public function start() {
        $this->datadb_connection = mysql_connect($this->datadb_host, $this->datadb_username, $this->datadb_password) or die("Keine Verbindung möglich: " . mysql_error());
        mysql_select_db($this->datadb, $this->datadb_connection);
        $this->metadb_connection = mysql_connect($this->metadb_host, $this->metadb_username, $this->metadb_password) or die("Keine Verbindung möglich: " . mysql_error());
        mysql_select_db($this->metadb, $this->metadb_connection);
    }
    
    /**
     * TODO
     */
    public function open_db_connection() {
        
    }
    
    /**
     * TODO
     */
    public function open_md_connection() {
        
    }
    
    /**
     * TODO
     */
    public function close_db_connection() {
        
    }
    
    /**
     * TODO
     */
    public function clode_md_connection() {
        
    }
    
    /**
     * TODO
     * @param String $query query to be done
     * @param int $type database to be done
     */
    public function do_query($query, $type) {
        
    }
    
    /**
     * TODO 
     * @param String $query query to be done
     * @param int $type database to be done (@see TYPE_DASHBOARD_DB, @see TYPE_METADATA_DB)
     */
    public function do_query_response($query, $type) {
        
    }
    
    /**
     * close all db connections
     */
    public function close() {
        mysql_close($this->datadb_connection);
        mysql_close($this->metadb_connection);
    }
}
?>
