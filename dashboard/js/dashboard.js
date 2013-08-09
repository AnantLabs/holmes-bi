var sessionid = "";

function login(username, password) {
    this.username = username;
    this.password = password;
}

var session_id = "";
function check_login() {
    var username = $("#username").val();
    var password = $("#password").val();
    var url = "API.php?rand=" + Math.random() + "&object=user&action=login&username="+username+"&password="+password;
    $.getJSON(url, function(data) {
        if(data.session_id !== "") {
            session_id = data.session_id;
            $("#login_window").css("border","1px solid green");
            $("#login_window").parent().fadeOut("slow");
            get_navigation();
        }
        else {
            $("#login_window").css("border","2px solid red");
        }
    });
}

function show_loginwindow() {
    var div = "";
    div += "<div id=login_window>";
    div += "<h1 data-i18n=\"login.loginwindow\"></h1>";
    div += "<table id=\"login_table\">";
    div += "<tr><td><div data-i18n=\"login.username\"></div></td><td><input type=\"text\" id=\"username\" name=\"username\" value=\"\"/></td></tr>";
    div += "<tr><td><div data-i18n=\"login.password\"></div></td><td><input type=\"password\" id=\"password\" name=\"password\" value=\"\"/></td></tr>";
    div += "<tr><td colspan=\"2\"><button data-i18n=\"login.button\" onClick=\"check_login()\"/></td></tr>";
    div += "</table>";
    div += "<div></div>";
    div += "</div>";
    $("body").append(div);
    
    i18n.init(function(t) {
        $("#login_window").i18n();
    });
    
    $("#login_window").dialog();
}

function show_load() {
    var div = "";
    div += "<div id=\"loading\">"
    div += "<h1>....</h1>";
    div += "</div>";
    $("body").append(div);
    
    i18n.init(function(t) {
        $("#loading").i18n();
    });
    
    $("#loading").dialog();
}

var tabs = new Array();
var navigation_structur = new Array();

function get_structur() {
    show_load();
    
    //TODO Load Navigation
    
}


function show_navigation() {
    var div = "";
    div += "<div id=#tabs>";
    div += "<ul>"
    div += "<li><a href='#maintab' data-i18n=\"reporting.maintab.name\"></a></li>";
    //TODO Add Subtabs including removing element
    div += "</ul>";
    div += "<div id='maintab'>";
    div += "</div>";
    //TODO Load every open structur
    div += "</div>";
    
    $("#loading").fadeOut();
}