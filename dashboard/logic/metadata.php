 <?php
 if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

 /**
 * Cube class.
 */
 
class metadaten extends ormlib {
    var $id = 0;
    var $tables = array();
    var $tables_relations = array();
    var $fields = array();
    var $addition = "";
    function __construct() {
        parent::__construct("metadaten", "id");
    }
}
 
?>