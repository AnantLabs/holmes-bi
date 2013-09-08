var mouse_x = 0;
var mouse_y = 0;

$(document).mousemove(function(event) {
        mouse_x = event.pageX;
        mouse_y = event.pageY;
});

function init_view() {
    var div = "";
    div += "<div id=\"hbi_message_window\">";
    div += "</div>";
    $("body").append(div);
}

function show_message(content, posx, posy) {
    $("#hbi_message_window").empty();
    $("#hbi_message_window").append("<div id=\"hbi_message_window_head\"><button id=\"hbi_window_close\" onClick=\"close_message()\">X</button></div>");
    $("#hbi_message_window").append(content);
    $("#hbi_message_window").show();
    $("#hbi_message_window").css({position:"absolute",left:posx+"px",top:posy+"px"});
    $("#hbi_message_window").css("border","1px solid #999");
    $("#hbi_message_window").css("background-color","white");
    $("#hbi_message_window").draggable();
}

function close_message() {
    $("#hbi_message_window").hide();
}

function show_loginwindow() {
    var div = "";
    div += "<h1>"+trans_value.login.loginwindow+"</h1>";
    div += "<table id=\"login_table\">";
    div += "<tr><td>"+trans_value.login.username+"</td><td><input type=\"text\" id=\"username\" name=\"username\" value=\"\"/></td></tr>";
    div += "<tr><td>"+trans_value.login.password+"</td><td><input type=\"password\" id=\"password\" name=\"password\" value=\"\"/></td></tr>";
    div += "<tr><td>"+trans_value.login.view+"</td><td><select id=\"view\">";
    div += "<option value=\"1\">"+trans_value.login.dashboard+"</option>";
    div += "<option value=\"2\">"+trans_value.login.metadata+"</option>";
    div += "</select></td></tr>";
    div += "<tr><td colspan=\"2\"><button onClick=\"check_login()\">"+trans_value.login.button+"</button></td></tr>";
    div += "</table>";
    div += "<div></div>";
    div += "</div>";
    show_message(div,200,200);
}
