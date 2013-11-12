
function metadata_show_content() {
    var div = "";
    div += "<div id=\"hbi_tab_list\">";
    if(current_metadata === 0 || current_metadata===-1) {
        div += "<div class=\"hbi_tab\">" + trans_value["metadata"]["name"] + "</div>";
    }
    else {
        div += "<div class=\"hbi_tab_closed\"><a href=\"#\" onClick=\"metadata_set_navigation(0)\">" + trans_value["metadata"]["name"] + "</a></div>";
    }
    if(current_metadata === 1) {
        div += "<div class=\"hbi_tab\">" + trans_value["group"]["name"] + "</div>";
    }
    else {
        div += "<div class=\"hbi_tab_closed\"><a href=\"#\" onClick=\"metadata_set_navigation(1)\">" + trans_value["group"]["name"] + "</a></div>";
    }
    if(current_metadata === 2) {
        div += "<div class=\"hbi_tab\">" + trans_value["reportstructur"]["name"] + "</div>";
    }
    else {
        div += "<div class=\"hbi_tab_closed\"><a href=\"#\" onClick=\"metadata_set_navigation(2)\">" + trans_value["reportstructur"]["name"] + "</a></div>";
    }
    div += "</div>";
    div += "<div>";
    
    $("#content").empty();
    $("#content").append(div);
    
    switch(current_metadata) {
        case -1:
        case 0: metadata_get_metadata();
                break;      
        case 1: metadata_get_groups();
                break;
        case 2: metadata_get_reportstructur();
                break;
    }
}

function metadata_show() {
    var div = "<div>";
    for (var i = 0; i < object_metadata_list.length; i++) {
        div += metadata_print_box(object_metadata_list[i], i);
    }
    div += metadata_print_box(new metadata(-1, trans_value["metadata"]["new"]));
    div += "</div>";
    $("#content").append(div);
    var h = 0;
    $(".hbi_metadata_structur_box").each(
        function(){
            if($(this).height()>h) {
                h = $(this).height();
            }
        }
    );
    $(".hbi_metadata_structur_box").each(
        function(){
            $(this).height(h);
        }
    );
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

function groups_show() {
    var div = "<div>";
    div += show_group_list();
    div += show_user_list();
    div += "</div>";
    $("#content").append(div);
}
function show_group_list() {
    var div = "";
    div += "<div class=\"hbi_metadata_structur_box\">";
    div += "<div class=\"hbi_metadata_structur_box_head\">" + trans_value["group"]["name"] + "</div>";
    div += "<div class=\"hbi_metadata_structur_box_content\">";
    div += "<ul class=\"hbi_metadata_structur_box_content_ul_0\">"
    for(var i=0;i<group_list.length;i++) {
        div += "<li class=\"hbi_metadata_structur_box_content_li_0\"><a href=\"#\" onClick=\"show_group_edit_dialog("+group_list[i].id+")\">"+group_list[i].name+"</a> (<a href=\"#\" onClick=\"show_group_remove_dialog("+group_list[i].id+")\">x</a>)</li>";
    }
    div += "<li class=\"hbi_metadata_structur_box_content_li_0\"><a href=\"#\" onClick=\"show_group_edit_dialog(-1)\">+ "+trans_value["group"]["new"]+"</a></li>";
    div += "</ul>";
    div += "</div>";
    div += "</div>";
    div += "</div>";
    return div;
}
function show_user_list() {
    var div = "";
    div += "<div class=\"hbi_metadata_structur_box\">";
    div += "<div class=\"hbi_metadata_structur_box_head\">" + trans_value["user"]["name"] + "</div>";
    div += "<div class=\"hbi_metadata_structur_box_content\">";
    div += "<ul class=\"hbi_metadata_structur_box_content_ul_0\">"
    for(var i=0;i<user_list.length;i++) {
        div += "<li class=\"hbi_metadata_structur_box_content_li_0\"><a href=\"#\"  onClick=\"show_user_edit_dialog("+user_list[i].id+")\">"+user_list[i].username+"</a> (<a href=\"#\" onClick=\"show_user_remove_dialog("+user_list[i].id+")\">x</a>)</li>";
    }
    div += "<li class=\"hbi_metadata_structur_box_content_li_0\"><a href=\"#\"  onClick=\"show_user_edit_dialog(-1)\">+ "+trans_value["user"]["new"]+"</a></li>";
    div += "</ul>";
    div += "</div>";
    div += "</div>";
    div += "</div>";
    return div;
}

function show_group_edit_dialog(group_id) {
    var div = "";
    var text = "";
    if(group_id !== -1) {
        text = trans_value["group"]["edit"];
    }
    else {
        text = trans_value["group"]["create"];
    }
    var value = "";
    if(group_id !== -1) {
        for(var i=0;i<group_list.length;i++) {
            if(group_id===group_list[i].id*1) {
                value = group_list[i].name;
            }
        }
    }
    div += "<div style=\"text-align:left;padding-left:10px\">";
    div += "<h2 class=\"hbi_metadata_header\">"+text+"</h2>";
    div += "<p id=\"hbi_message_content\"></p>";
    div += "<p>"+trans_value["group"]["groupname"]+": "+"<input type=\"text\" name=\"group_name\" id=\"group_name\" value=\""+value+"\"/></p>";
    div += "<p><button onClick=\"save_group("+group_id+")\">"+text+"</button></p>";
    if(group_id !== -1) {
        div += "<p></p>";
        div += "<h2 class=\"hbi_metadata_header\">"+ trans_value["group"]["usergroup"]+"</h2>";
        div += "<ul>";
        var list = new Array();
        for(var i=0;i<user_group_list.length;i++) {
            if(user_group_list[i].group_id*1 === group_id*1) {
                div += "<li>"+get_user_name(user_group_list[i].user_id)+" (<a href=\"#\" onClick=\"remove_user_group("+user_group_list[i].user_id+", "+group_id+")\">X</a>)</li>";
                list.push(user_group_list[i].user_id);
            }
        }
        if(list.length!==user_list.length) {
            div += "<li><select id=\"user_id\">";
            for(var i=0;i<user_list.length;i++) {
                var in_list = false;
                for(var j=0;j<list.length;j++) {
                    if(list[j]*1===user_list[i].id*1) {
                        in_list = true;
                    }
                }
                if(in_list === false) {
                    div += "<option value=\""+user_list[i].id+"\">"+user_list[i].username+"</option>";
                } 
            }
            div += "</select> <button onClick=\"add_user_group_from_group("+group_id+")\">"+trans_value["group"]["add_usergroup"]+"</button></li>";
        }
        div += "</ul>";
        div += "</p>";
    }
    div += "</div>";
    
    show_message(text, div, mouse_x, mouse_y);
}

function show_group_remove_dialog(group_id) {
    if(group_id*1 > 2) {
        var div = "";
        var text = "";
        text = trans_value["group"]["remove"];
        var value = "";
        if(group_id !== -1) {
            for(var i=0;i<group_list.length;i++) {
                if(group_id===group_list[i].id*1) {
                    value = group_list[i].name;
                }
            }
        }
        div += "<div style=\"text-align:left;padding-left:10px\">";
        div += "<h2 class=\"hbi_metadata_header\">"+value+" "+text+"</h2>";
        div += "<p>"+trans_value["group"]["remove_question"].replace('%s',value)+"</p>";
        div += "<p><button onClick=\"remove_group("+group_id+")\">"+text+"</button></p>";
        show_message(text, div, mouse_x, mouse_y);
    }
    else {
        var text = trans_value["group"]["remove"];
        var div = "<div style=\"text-align:left;padding-left:10px\">";
        div += "<p>"+trans_value["group"]["not_remove_able"]+"</p>";
        show_message(text, div, mouse_x, mouse_y);
    }
}

function show_user_edit_dialog(user_id) {
    var div = "";
    var text = "";
    if(user_id !== -1) {
        text = trans_value["user"]["edit"];
    }
    else {
        text = trans_value["user"]["create"];
    }
    var value = "";
    if(user_id !== -1) {
        for(var i=0;i<user_list.length;i++) {
            if(user_id*1===user_list[i].id*1) {
                value = user_list[i].username;
            }
        }
    }
    div += "<div style=\"text-align:left;padding-left:10px\">";
    div += "<h2 class=\"hbi_metadata_header\">"+text+"</h2>";
    div += "<p id=\"hbi_message_content\"></p>";
    div += "<p>"+trans_value["user"]["username"]+": "+"<input type=\"text\" name=\"user_name\" id=\"user_name\" value=\""+value+"\"/></p>";
    div += "<p>"+trans_value["user"]["password"]+": "+"<input type=\"text\" name=\"password\" id=\"password\" value=\"\"/></p>";
    div += "<p><button onClick=\"save_user("+user_id+")\">"+text+"</button></p>";
    if(user_id !== -1) {
        div += "<p></p>";
        div += "<h2 class=\"hbi_metadata_header\">"+ trans_value["user"]["usergroup"]+"</h2>";
        div += "<ul>";
        var list = new Array();
        for(var i=0;i<user_group_list.length;i++) {
            if(user_group_list[i].user_id*1 === user_id*1) {
                div += "<li>"+get_group_name(user_group_list[i].group_id)+" (<a href=\"#\" onClick=\"remove_user_group("+user_id+", "+user_group_list[i].group_id+")\">X</a>)</li>";
                list.push(user_group_list[i].group_id);
            }
        }
        if(list.length!==group_list.length) {
            div += "<li><select id=\"group_id\">";
            for(var i=0;i<group_list.length;i++) {
                var in_list = false;
                for(var j=0;j<list.length;j++) {
                    if(list[j]*1===group_list[i].id*1) {
                        in_list = true;
                    }
                }
                if(in_list === false) {
                    div += "<option value=\""+group_list[i].id+"\">"+group_list[i].name+"</option>";
                } 
            }
            div += "</select> <button onClick=\"add_user_group_from_user("+user_id+")\">"+trans_value["user"]["add_usergroup"]+"</button></li>";
        }
        div += "</ul>";
        div += "</p>";
    }
    div += "</div>";
    
    show_message(text, div, mouse_x, mouse_y);
}

function show_user_remove_dialog(user_id) {
    if(user_id*1 > 1) {
        var div = "";
        var text = "";
        text = trans_value["user"]["remove"];
        var value = "";
        if(user_id !== -1) {
            for(var i=0;i<user_list.length;i++) {
                if(user_id===user_list[i].id*1) {
                    value = user_list[i].username;
                }
            }
        }
        div += "<div style=\"text-align:left;padding-left:10px\">";
        div += "<h2 class=\"hbi_metadata_header\">"+value+" "+text+"</h2>";
        div += "<p>"+trans_value["user"]["remove_question"].replace('%s',value)+"</p>";
        div += "<p><button onClick=\"remove_user("+user_id+")\">"+text+"</button></p>";
        show_message(text, div, mouse_x, mouse_y);
    }
    else {
        var text = trans_value["user"]["remove"];
        var div = "<div style=\"text-align:left;padding-left:10px\">";
        div += "<p>"+trans_value["user"]["not_remove_able"]+"</p>";
        show_message(text, div, mouse_x, mouse_y);
    }
}

function reportstructur_show() {
    
}