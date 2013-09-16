<?php

class metadata_wrapper {
    var $metadata = null;
    var $metadata_field_list = array();
    var $metadata_field_selection_list = array();
    var $metdata_table_list = array();
    var $metadata_table_relation_list = array();
    var $metadata_relation_list = array();
    
    public function __construct($metadata) {
        $this->metadata = $metadata;
    }
    
    public static function get_list_with_session($session_id) {
        $session = session::get_session($session_id);
        if($session->is_valid()) {
            $user = ormlib::get_from_instance(new user(), array("id"), array($session->user_id));
            if($user !== null && $user->id !== null && $user->id !== "" ) {
                if($user->has_group(session::GROUP_METADATA) === true) {
                    $metadata_list = ormlib::get_list_from_instance(new metadata());
                    $mw_list = array();
                    for($i=0;$i<count($metadata_list);$i++) {
                        $md = $metadata_list[$i];
                        $mw = new metadata_wrapper($md);
                        $mw->metadata_field_list = ormlib::get_list_from_instance(new metadata_field, array("metadata_id"), array($md->id));
                        for($j=0;$j<count($mv->metadata_field_list);$j++) {
                            $mw->metadata_field_selection[] = ormlib::get_list_from_instance(new metadata_field_selection, array("metadata_field_id"), array($mv->metadata_field_list[$j]->id));
                        }
                        $mw->metadata_table_list = ormlib::get_list_from_instance(new metadata_table(), array("metadata_id"), array($md->id));
                        $mw->metadata_table_relation = ormlib::get_list_from_instance(new metadata_table_relation(), array("metadata_id"), array($md->id));
                        $mw->metadata_relation = array_merge($mv->metadata_relation, ormlib::get_list_from_instance(new metadata_table_relation, array("metadata_id1"), array($md->id)));
                        $mw->metadata_relation = array_merge($mv->metadata_relation, ormlib::get_list_from_instance(new metadata_table_relation, array("metadata_id2"), array($md->id)));
                        $mw_list[] = $mw;
                    }
                    return $mw_list;
                }
            }
        }
        return null;
    }
    
}

?>