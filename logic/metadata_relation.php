 <?php
 if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

 /**
 * Cube relation class.
 */
class metadata_relation extends ormlib {
    
    const METADATA_RELATION_TYPE_1_N = 1;
    const METADATA_RELATION_TYPE_N_1 = 2;
    const METADATA_RELATION_TYPE_N_M = 3;
    
    var $id = 0;
    var $metadata_field_id1 = 0;
    var $metadata_field_id2 = 0;
    var $type = 0;
    
    function __construct() {
        parent::__construct("metadata_relation", "id");
    }
    
}
 
?>