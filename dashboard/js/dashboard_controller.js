$(document).ready(function() {
    if($("#hbi_message_window").length===0) {
        init();
    }
});

function login(username, password) {
    this.username = username;
    this.password = password;
}

function init() {
    init_view();
    load_lang(); //First step load lang file
    
}

var trans_value;
var user_lang;

function load_lang() {
    user_lang = navigator.language || navigator.userLanguage;
    load_lang_1();
}

function load_lang_1() {
    $.ajax({url: "locales/"+user_lang+"/translation.json"}
    ).done(function (data) {
            trans_value = data;
            init1();
        }
    ).fail(function() {
        user_lang = "en";
        load_lang_1();
    });
}

function init1() {
    if(session_id==="") {
        show_loginwindow();
    }
}

function check_login() {
    var username = $("#username").val();
    var password = $("#password").val();
    var url = "API.php?rand=" + Math.random() + "&object=session&action=get&username="+username+"&password="+password;
    $.getJSON(url, function(data) {
        if(data.session_id !== "") {
            session_id = data.session_id;
            $("#hbi_message_window").css("border","1px solid green");
            $("#hbi_message_window").fadeOut("slow");
            get_navigation();
        }
        else {
            $("#hbi_message_window").css("border","2px solid red");
        }
    });
}

function show_load() {
    var div = "";
    div += "<div class=\"loading\"><h1>Loading ...</h1></div>";
    show_message(div);
}

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
        div += "<p><a href=#>Start</a></p>";
        div += "</div>";
        show_message(div, mouse_x, mouse_y);
    }
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