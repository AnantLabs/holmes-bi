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

function view_report(report_wrapper) {
    console.log(report_wrapper);
}