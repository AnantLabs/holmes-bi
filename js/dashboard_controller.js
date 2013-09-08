var tabs = new Array();
var navigation_structur = new Array();

function get_navigation() {
    show_load();
    var url = "API.php?rand=" + Math.random() + "&object=navigation&action=get&session_id="+session_id;
    $.getJSON(url, function(data) {
        navigation_structur_list = data;
        show_content();
    });
}

function show_report_info(id) {
    var report = null;
    for(i=0;i<navigation_structur_list.length;i++) {
        var report1 =  find_report_navigation(navigation_structur_list[i],id*1);
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
        div += "<p><a href=\"#\" onClick=\"show_report("+id+")\">Start</a></p>";
        div += "</div>";
        show_message(div, mouse_x, mouse_y);
    }
}

function show_report(id) {
    var url = "API.php?rand=" + Math.random() + "&object=report&action=get&session_id="+session_id+"&report_id="+id;
    $.getJSON(url, function(data) {
        view_report(data);
    });
}

function find_report_navigation(nav_struc, id) {
    console.log(nav_struc.report_id+";"+id);
    if(nav_struc.report_id*1===id*1) {
        return nav_struc;
    }
    else {
        for(var i=0;i<nav_struc.sub_structur.length;i++) {
            var ergebnis = find_report_navigation(nav_struc.sub_structur[i],id);
            if(ergebnis!==null) {
                return ergebnis;
            }
        }
        return null;
    }
}