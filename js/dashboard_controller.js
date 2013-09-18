
function dashboard_init() {
    dashboard_get_navigation();
}

function dashboard_get_navigation() {
    show_load();
    var url = "API.php?rand=" + Math.random() + "&object=navigation&action=get&session_id="+session_id;
    $.getJSON(url, function(data) {
        navigation_structur_list = data;
        dashboard_load_setting_list();
    });
}

function dashboard_show_report_info(id) {
    var report = null;
    for(i=0;i<navigation_structur_list.length;i++) {
        var report1 =  dashboard_find_report_navigation(navigation_structur_list[i],id*1);
        if(report1!==null) {
            report = report1;
            i = navigation_structur_list.length;
        }
    }
    if(report!==null) {
        var div = "";
        div += "<div>";
        div += "<p><b>Report: "+report.name+"</b></p>";
        div +="<hr>";
        div += "<p>"+report.description+"</p>";
        div += "<p><a href=\"#\" onClick=\"dashboard_show_report("+id+")\">Start</a></p>";
        div += "</div>";
        show_message("", div, mouse_x, mouse_y);
    }
}

function dashboard_show_report(id) {
    var found1 = false;
    for(var i=0;i<report_list.length;i++) {
        if(report_list[i].id*1 === id*1) {
            found1 = true;
            current_report = id;
            dashboard_show_content();
            close_message();
        }
    }
    if(found1 === false) {
        var url = "API.php?rand=" + Math.random() + "&object=report&action=get&session_id="+session_id+"&report_id="+id;
        $.getJSON(url, function(data) {
            report_list.push(data);
            current_report = data.id*1;
            dashboard_show_content();
            close_message();
            setting_list.push(new user_setting("report", data.id));
            var found = false;
            for(var i=0;i<setting_list.length;i++) {
                if(setting_list[i].key === "current_report") {
                    setting_list[i].value = data.id*1;
                    found = true;
                    i = setting_list.length;
                }
            }
            if(found === false) {
                setting_list.push(new user_setting("current_report", data.id*1));
            }
            dashboard_save_setting_list();
        });
    }
}

function dashboard_set_navigation(nr) {
    current_report = nr;
    dashboard_show_content();
    dashboard_update_current_project();
}

function dashboard_remove_navigation(nr) {
    for(var i=0;i<report_list.length;i++) {
        if(report_list[i].id*1===nr*1) {
            if(current_report*1===report_list[i].id*1) {
                current_report = -1;
            }
            report_list.splice(i,1);
            i = report_list.length;
            dashboard_update_current_project();
        }
    }
    dashboard_show_content();
}

function dashboard_switch_tab(report_id) {
    current_report = report_id;
    dashboard_show_content();
    //TODO Save current report
}

function dashboard_find_report_navigation(nav_struc, id) {
    if(nav_struc.report_id*1===id*1) {
        return nav_struc;
    }
    else {
        for(var i=0;i<nav_struc.sub_structur.length;i++) {
            var ergebnis = dashboard_find_report_navigation(nav_struc.sub_structur[i],id);
            if(ergebnis!==null) {
                return ergebnis;
            }
        }
        return null;
    }
}