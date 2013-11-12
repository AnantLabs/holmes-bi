var current_report = -1;
var dashboard_load_report_list = new Array();
var current_metadata = -1;

function load_setting_list(exec) {
    var url = "API.php?rand=" + Math.random() + "&object=user_settings&action=get&session_id="+session_id;
    $.getJSON(url, function(data) {
        setting_list = data;
        for(var i=0;i<setting_list.length;i++) {
            if(setting_list[i].key_value === "report") {
                dashboard_load_report_list.push(setting_list[i].value*1);
            }
            if(setting_list[i].key_value === "current_report") {
                current_report = setting_list[i].value*1;
            }
            if(setting_list[i].key_value === "current_metadata") {
                current_metadata = setting_list[i].value*1;
            }
        }
        if(exec*1===0) {
            dashboard_show_content();
        }
        else {
            metadata_show_content();
        }
    });
}

var setting_list = new Array();
function user_setting(key, value) {
    this.key = key;
    this.value = value;
}

function dashboard_update_current_project() {
    var url = "API.php?rand=" + Math.random() + "&object=user_settings&action=update&session_id="+session_id+"&current_report="+current_report;
    $.getJSON(url, function(data) { });
}

function metadata_update_current_metadata() {
    var url = "API.php?rand=" + Math.random() + "&object=user_settings&action=update&session_id="+session_id+"&current_metadata="+current_metadata;
    $.getJSON(url, function(data) { });
}

