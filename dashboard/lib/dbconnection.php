<?php
if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

/**
 * Lib for handling db connection.
 */

$dbconnection = new dbconnection();

define("TYPE_DASHBOARD_DB", 1);
define("TYPE_METADATA_DB", 2);

class dbconnection {
    var $db; //databasename for dashboard db
    var $db_username; //username for dashboard db
    var $db_password; //password for dashboard db
    var $db_host; //host for dashboard db
    var $md_db; //databasename for metadatadb
    var $md_db_username; //username for metadata db
    var $md_db_password; //password for metadata db
    var $md_db_host; //host for metadata db
    
    var $db_connection = null; //databaseobject for dashboard db
    var $md_db_connection = null; //databaseobject for metadatabase db
    
    /**
     * TODO
     */
    public function init() {
        $this->db = $config["db"]["name"];
        $this->db_username = $config["db"]["username"];
        $this->db_password = $config["db"]["password"];
        $this->db_host = $config["db"]["host"];
        
        $this->mb_db = $config["mb_db"]["name"];
        $this->mb_db_username = $config["mb_db"]["username"];
        $this->mb_db_password = $config["mb_db"]["password"];
        $this->mb_db_host = $config["mb_db"]["host"];
    }
    
    /**
     * TODO
     */
    public function start() {
        $this->db_connection = mysql_connect($this->db_host, $this->db_username, $this->db_password) or die("Keine Verbindung möglich: " . mysql_error());
        mysql_select_db($this->db, $this->db_connection);
        $this->md_db_connection = mysql_connect($this->md_db_host, $this->md_db_username, $this->md_db_password) or die("Keine Verbindung möglich: " . mysql_error());
        mysql_select_db($this->md_db, $this->md_db_connection);
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
        mysql_close($this->db_connection);
        mysql_close($this->md_db_connection);
    }
}
?>
