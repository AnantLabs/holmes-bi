function metadata_init() {
    metadata_get_metadata();
}

var metadata_structur_list = new Array();
function metadata_get_metadata() {
    show_load();
    load_init();
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
        console.log(table_nr);
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
        console.log(table_nr);
        if(table_nr*1===-1) {
            metadata_structur_list[metadata_nr].metadata_table_list.push(data);
        }
        metadata_show_tables(metadata_nr);
    });
}