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
    div += "<tr><td colspan=\"2\"><button onClick=\"check_login()\">"+trans_value.login.button+"</button></td></tr>";
    div += "</table>";
    div += "<div></div>";
    div += "</div>";
    show_message(div,200,200);
}

var navigation_structur_list;
function show_content() {
    var div = "";
    div += "<div id=\"hbi_tab_list\">";
    div += "<div class=\"hbi_tab\">"+trans_value["reporting"]["maintab"]["name"]+"</div>";
    div += "</div>";
    div += "<div>";
    for(var i=0;i<navigation_structur_list.length;i++) {
        div += show_structur_box(navigation_structur_list[i]);
    }
    div += "</div>";
    div += "</div>";
    $("#content").append(div);
    
    $(".hbi_structur_box_content_ul_0 ul ").css({display: "none"}); // Opera Fix
    $(".hbi_structur_box_content_ul_0 li").hover(function(){
        $(this).find('ul:first').css({visibility: "visible",display: "none",zIndex: "99"}).show(400);
    },function(){
        $(this).find('ul:first').fadeOut("slow");
    });
}
function show_structur_box(nav_struc) {
    var div = "";
    div += "<div class=\"hbi_structur_box\">";
    div += "<div class=\"hbi_structur_box_head\">"+nav_struc.name+"</div>";
    div += "<div class=\"hbi_structur_box_content\">";
    div += "<ul class=\"hbi_structur_box_content_ul_0\">"
    for(var i=0;i<nav_struc.sub_structur.length;i++) {
        div += show_structur(nav_struc.sub_structur[i], 0);
    }
    div += "</ul>"
    div += "</div>";
    div += "</div>";
    return div;
}

function show_structur(nav_struc, ebene) {
    var div = "";
    div += "<li class=\"hbi_structur_box_content_li_"+ebene+"\">";
    var action = "";
    if(nav_struc.report_id !== 0) {
        action = "onClick=\"show_report_info("+nav_struc.report_id+")\"";
    }
    div += "<a href=\"#\" "+action+">"+nav_struc.name+"</a>";
    if(nav_struc.sub_structur.length > 0) {
        div += "<ul class=\"hbi_structur_box_content_ul_"+ebene+1+"\">";
        for(var i=0;i<nav_struc.sub_structur.length;i++) {
            div += show_structur(nav_struc.sub_structur[i], ebene + 1);
        }
        div += "</ul>";
    }
    div += "</li>";
    return div;
}