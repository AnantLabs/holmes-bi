 <?php
 if(!defined('INTERFACE_ACCESS')){die('Direct access not premitted');}

 /**
 * Cube class.
 */
class metadata extends ormlib {
    var $id = 0;
    var $name = "";
    function __construct() {
        parent::__construct("metadata", "id");
    }
}
 
?>