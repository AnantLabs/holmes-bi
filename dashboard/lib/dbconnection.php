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
    var $md_db; //databasename for metadatadb
    var $md_db_username; //username for metadata db
    var $md_db_password; //password for metadata db
    
    var $db_connection = null; //databaseobject for dashboard db
    var $md_db_connection = null; //databaseobject for metadatabase db
    
    /**
     * TODO
     */
    public function init() {
        
    }
    
    /**
     * TODO
     */
    public function start() {
        
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
        
    }
}
?>
