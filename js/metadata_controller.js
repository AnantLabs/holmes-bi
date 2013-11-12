function metadata_init() {
    load_setting_list(1);
}

var metadata_structur_list = new Array();
function metadata_get_metadata() {
    show_load();
    load_metadata_init();
}

function metadata_save_table(metadata_nr, table_nr) {
    var table_name = encodeURIComponent($("#metadata_table_name").val());
    var metadata_id = metadata_structur_list[metadata_nr].metadata.id;
    var table_id = table_nr;
    if(table_id!==-1) {
        table_id = metadata_structur_list[metadata_nr].metadata_table_list[table_nr].id;
        metadata_structur_list[metadata_nr].metadata_table_list[table_nr].name = table_name;
    }
    var url = "API.php?rand=" + Math.random() + "&object=metadata_table&metadata_id="+metadata_id+"&table_id="+table_id+"&action=save&session_id="+session_id+"&table_name="+table_name;
    $.getJSON(url, function(data) {
        if(table_nr*1===-1) {
            metadata_structur_list[metadata_nr].metadata_table_list.push(data);
        }
        metadata_show_tables(metadata_nr);
    });
}

function metadata_remove_table(metadata_nr, table_nr) {
    var table_id = metadata_structur_list[metadata_nr].metadata_table_list[table_nr].id;
    var url = "API.php?rand=" + Math.random() + "&object=metadata_table&table_id="+table_id+"&action=remove&session_id="+session_id;
    $.getJSON(url, function(data) {
        metadata_structur_list[metadata_nr].metadata_table_list.splice(table_nr, 1);
        metadata_show_tables(metadata_nr);
    });
}

function metadata_save_field(metadata_nr, field_nr) {
    var field_name = encodeURIComponent($("#metadata_field_name").val());
    var field_type = $("#metadata_field_type").val();
    var metadata_id = metadata_structur_list[metadata_nr].metadata.id;
    var table_id = table_nr;
    if(table_id!==-1) {
        table_id = metadata_structur_list[metadata_nr].metadata_filed_list[field_nr].id;
        metadata_structur_list[metadata_nr].metadata_table_list[field_nr].name = table_name;
    }
    var url = "API.php?rand=" + Math.random() + "&object=metadata_table&metadata_id="+metadata_id+"&table_id="+table_id+"&action=save&session_id="+session_id+"&table_name="+table_name;
    $.getJSON(url, function(data) {
        if(table_nr*1===-1) {
            metadata_structur_list[metadata_nr].metadata_table_list.push(data);
        }
        metadata_show_tables(metadata_nr);
    });
}

function metadata_set_navigation(nr) {
    current_metadata = nr;
    metadata_show_content();
    metadata_update_current_metadata();
}

var user_list = new Array();
var group_list = new Array();
var user_group_list = new Array();
var load_user = false;
var load_group = false;
var load_user_group = false;

function metadata_get_groups() {
    
    load_user = false;
    load_group = false;
    load_user_group = false;
    user_list = new Array();
    group_list = new Array();
    user_group_list = new Array();
    var url = "API.php?rand=" + Math.random() + "&object=user&action=get&session_id="+session_id;
    $.getJSON(url, function(data) {
        jQuery.each( data, function( i, val ) {
            user_list.push(val);
        });
        load_user = true;
        metadata_groups_show();
    });
    
    var url = "API.php?rand=" + Math.random() + "&object=user_group&action=get&session_id="+session_id;
    $.getJSON(url, function(data) {
        jQuery.each( data, function( i, val ) {
            user_group_list.push(val);
        });
        load_user_group = true;
        metadata_groups_show();
    });
    
    var url = "API.php?rand=" + Math.random() + "&object=group&action=get&session_id="+session_id;
    $.getJSON(url, function(data) {
        jQuery.each( data, function( i, val ) {
            group_list.push(val);
        });
        load_group = true;
        metadata_groups_show();
    });
}

function get_user_name(user_id) {
    for(var i=0;i<user_list.length;i++) {
        if(user_list[i].id*1 === user_id*1) {
            return user_list[i].username;
        }
    }
    return "";
}

function get_group_name(group_id) {
    for(var i=0;i<group_list.length;i++) {
        if(group_list[i].id*1 === group_id*1) {
            return group_list[i].name;
        }
    }
    return "";
}

function metadata_groups_show() {
    if(load_user===true && load_group === true && load_user_group === true) {
        groups_show();
    }
}

function save_group(nr) {
    if(nr*1!==1 && nr*1!==2) {
        var groupname = $("#group_name").val();
        if(groupname==="") {
            $("#hbi_message_content").empty().append(trans_value["group"]["groupname_not_empty"]);
        }
        else {
            group_save_interface(nr, groupname);
        }
    }
    else {
        $("#hbi_message_content").empty().append(trans_value["group"]["group_not_change_able"]);
    }
}

function save_user(nr) {
    if(nr*1!==1) {
        var username = $("#user_name").val();
        var password = $("#password").val();
        if(username==="" || password === "") {
            $("#hbi_message_content").empty().append(trans_value["user"]["user_not_empty"]);
        }
        else {
            user_save_interface(nr, username, password);
        }
    }
    else {
        $("#hbi_message_content").empty().append(trans_value["user"]["user_not_change_able"]);
    }
}