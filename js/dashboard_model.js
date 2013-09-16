

function navigation(id, name, content) {
    var id = id;
    var name = name;
    var content = content;
}

var setting_list = new Array();

function user_setting(key, value) {
    this.key = key;
    this.value = value;
}

var dashboard_load_report_list = new Array();

function dashboard_load_setting_list() {
    var url = "API.php?rand=" + Math.random() + "&object=user_settings&action=get&session_id="+session_id;
    $.getJSON(url, function(data) {
        setting_list = data;
        for(var i=0;i<setting_list.length;i++) {
            if(setting_list[i].key === "report") {
                dashboard_load_report_list.push(setting_list[i].value*1);
            }
            if(setting_list[i].key === "current_report") {
                current_report = setting_list[i].value*1;
            }
        }
        dashboard_load_report();
    });
}

function dashboard_update_current_project() {
    var url = "API.php?rand=" + Math.random() + "&object=user_settings&action=update&session_id="+session_id+"&current_report="+current_report;
    $.getJSON(url, function(data) { });
}

function dashboard_load_report() {
    if(dashboard_load_report_list.length > 0) {
        var url = "API.php?rand=" + Math.random() + "&object=report&action=get&session_id="+session_id+"&report_id="+dashboard_load_report_list[0];
        dashboard_load_report_list.splice(0, 1);
        $.getJSON(url, function(data) {
            report_list.push(data);
            close_message();
            dashboard_load_report();
        });
    }
    else {
        dashboard_show_content();
    }
}

function dashboard_save_setting_list() {
    $.ajax(
        {
            url: "API.php?rand=" + Math.random() + "&object=user_settings&action=set&session_id=" + session_id,
            data : {user_settings : setting_list},
            dataType: "json",
            success:
                function(data) {
                    
                },
            error:
                function(xhr, textStatus) {
                    console.log(textStatus);
                    console.log(xhr);
                }
        }
    );
}