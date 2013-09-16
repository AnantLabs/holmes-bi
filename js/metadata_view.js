function metadata_show_content() {
    var div = "";
    div += "<div id=\"hbi_tab_list\">";
    div += "<div class=\"hbi_tab\">" + trans_value["metadata"]["name"] + "</div>";
    div += "</div>";
    div += "<div>";
    for (var i = 0; i < var_metadata.list.length; i++) {
        div += metadata_show_structur_box(var_metadata.list[i], i);
    }
    div += metadata_show_structur_box_empty();
    div += "</div>";
    div += "</div>";
    $("#content").append(div);

    $(".hbi_structur_box_content_ul_0 ul ").css({display: "none"}); // Opera Fix
    $(".hbi_structur_box_content_ul_0 li").hover(function() {
        $(this).find('ul:first').css({visibility: "visible", display: "none", zIndex: "99"}).show(400);
    }, function() {
        $(this).find('ul:first').fadeOut("slow");
    });
}

function metadata_show_structur_box_empty() {
    var div = "";
    div += "<div class=\"hbi_structur_box1\">";
    div += "<div class=\"hbi_structur_box_head\"><a href=\"#\" onClick=\"metadata_add(-1)\">" + trans_value["metadata"]["new"] + "</a></div>";
    div += "<div class=\"hbi_structur_box_content\">";
    div += "<ul class=\"hbi_structur_box_content_ul_0\">"
    div += "<li class=\"hbi_structur_box_content_li_0\"></li>";
    div += "</ul>"
    div += "</div>";
    div += "</div>";
    return div;
}

function metadata_show_structur_box(metadata, i) {
    var div = "";
    div += "<div class=\"hbi_structur_box1\">";
    div += "<div class=\"hbi_structur_box_head\"><a href=\"#\" onClick=\"metadata_add("+i+")\">" + metadata.name + "</a> (<a href=\"#\" onClick=\"metadata_drop("+i+")\">X</a>)</div>";
    div += "<div class=\"hbi_structur_box_content\">";
    div += "<ul class=\"hbi_structur_box_content_ul_0\">"
    div += "<li class=\"hbi_structur_box_content_li_0\"><a href=\"#\" onClick=\"metadata_show_tables(" + i + ")\">" + trans_value["metadata"]["table"] + "</a></li>";
    div += "<li class=\"hbi_structur_box_content_li_0\"><a href=\"#\" onClick=\"metadata_show_table_relations(" + i + ")\">" + trans_value["metadata"]["table_relations"] + "</a></li>";
    div += "<li class=\"hbi_structur_box_content_li_0\"><a href=\"#\" onClick=\"metadata_show_fields(" + i + ")\">" + trans_value["metadata"]["fields"] + "</a></li>";
    div += "<li class=\"hbi_structur_box_content_li_0\"><a href=\"#\" onClick=\"metadata_show_relations(" + i + ")\">" + trans_value["metadata"]["meta_relations"] + "</a></li>";
    div += "</ul>"
    div += "</div>";
    div += "</div>";
    return div;
}

function metadata_interface(header, content) {
    var div = "";
    div += "<div class=\"hbi_interface\">";
    div += "<h1 class=\"hbi_metadata_header\">" + header + "</h1>";
    div += content;
    div += "</div>"
    show_message(header, div, 200, 200);
}