

function navigation(id, name, content) {
    var id = id;
    var name = name;
    var content = content;
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