var navigation_structur_list = new Array();
var report_list = new Array();

function dashboard_show_content() {
    var div = "";
    div += "<div id=\"hbi_tab_list\">";
    if(current_report*1===-1) {
        div += "<div class=\"hbi_tab\" id=\"hbi_navigation\">"+trans_value["reporting"]["maintab"]["name"]+"</div>";
    }
    else {
        div += "<div class=\"hbi_tab_closed\" id=\"hbi_navigation\"><a href=\"#\" onClick=\"dashboard_set_navigation(-1)\">"+trans_value["reporting"]["maintab"]["name"]+"</a></div>";
    }
    for(var i=0;i<report_list.length;i++) {
        if(current_report*1===report_list[i].id*1) {
            div += "<div class=\"hbi_tab\" id=\"hbi_navigation\">"+report_list[i].name+" (<a href=\"#\" onClick=\"dashboard_remove_navigation("+report_list[i].id+")\">X</a>)</div>";
        }
        else {
            div += "<div class=\"hbi_tab_closed\" id=\"hbi_navigation\"><a href=\"#\" onClick=\"dashboard_set_navigation("+report_list[i].id+")\">"+report_list[i].name+"</a> (<a href=\"#\" onClick=\"dashboard_remove_navigation("+report_list[i].id+")\">X</a>)</div>";
        }
    }
    div += "</div>";
    if(current_report*1===-1) {
        div += dashboard_show_maintab();
    }
    else {
        div += dashboard_show_form();
        div += dashboard_show_current_report();
    }
    $("#content").empty();
    $("#content").append(div);
    if(current_report*1===-1) {
        $(".hbi_structur_box_content_ul_0 ul ").css({display: "none"}); // Opera Fix
        $(".hbi_structur_box_content_ul_0 li").hover(function(){
            $(this).find('ul:first').css({visibility: "visible",display: "none",zIndex: "99"}).show(400);
        },function(){
            $(this).find('ul:first').fadeOut("slow");
        });
    }
    dashboard_update_design();
}

function dashboard_show_maintab() {
    var div = "";
    div += "<div>";
    for(var i=0;i<navigation_structur_list.length;i++) {
        div += dashboard_show_structur_box(navigation_structur_list[i]);
    }
    div += "</div>";
    return div;
}
function dashboard_show_form() {
    var report = null;
    for(var i=0;i<report_list.length;i++) {
        if(current_report*1===report_list[i].id*1) {
            report = report_list[i];
        }
    }
    if(report === null) {
        return "";
    }
    
    var fields = report.report_metadata_field_condition;
    
    if(fields.length===0) return "";
    
    var div = "";
    div += "<div class=\"hbi_report_form\">";
    for(var i=0;i<fields.length;i++) {
        div += "<div class=\"hbi_report_form_element\">";
        div += "<div class=\"hbi_report_form_element_left\">"+fields[i].name+"</div>";
        var element = "";
        var arr_list = report.report_values[fields[i].name];
        if(fields[i].type*1 === 1 || fields[i].type*1 === 5) { //Text or Selectfield
            element += "<select id=\"report_field_"+fields[i].id+"\">";
            element += "<option value=\"\"></option>";
            for(var j=0;j<arr_list.length;j++) {
                element += "<option value=\""+arr_list[j]+"\">"+arr_list[j]+"</option>";
            }
            element += "</select>";
        }
        if(fields[i].type*1 === 2 || fields[i].type*1 === 4) { //Number or Currency
            element = "<input type=\"text\" id=\"report_field_"+fields[i].id+"_from\" value=\"\"/> <input type=\"text\" id=\"report_field_"+fields[i].id+"_to\" value=\"\"/> ";
        }
        if(fields[i].type*1 === 6 || fields[i].type*1 === 7) { //Date or DateTime
            element = "<input type=\"text\" id=\"report_field_"+fields[i].id+"_from\" value=\"\"/> <input type=\"text\" id=\"report_field_"+fields[i].id+"_to\" value=\"\"/> ";
        }
        if(fields[i].type*1 === 3) { //GPS Field
            element = "<input type=\"text\" id=\"report_field_"+fields[i].id+"_from\" value=\"\"/> <input type=\"text\" id=\"report_field_"+fields[i].id+"_to\" value=\"\"/> ";
        }
        div += "<div class=\"hbi_report_form_element_right\">"+element+"</div>";
        div += "</div>";
    }
    div += "<div class=\"hbi_report_form_element\"><button class=\"hbi_report_form_element_button\" onClick=\"dashboard_refresh_report("+report.id+")\">starten</button></div>";
    div += "</div>";
    
    return div;
}

function dashboard_refresh_report(nr) {
    var report = null;
    for(var i=0;i<report_list.length;i++) {
        if(current_report*1===report_list[i].id*1) {
            report = report_list[i];
        }
    }
    if(report === null) {
        return "";
    }
    
    var fields = report.report_metadata_field_condition;
    var field_list_value = new Array();
    var field_list_key = new Array();
    for(var i=0;i<fields.length;i++) {
        if(fields[i].type*1 === 1 || fields[i].type*1 === 5) { //Text or Selectfield
            field_list_value.push($("#report_field_"+fields[i].id).val());
            field_list_key.push(fields[i].id);
        }
        else {
            //TODO
        }
    }
    
    $.ajax(
        {
            url: "API.php?rand=" + Math.random() + "&object=query&action=get&session_id=" + session_id+"&report_id="+report.id,
            data : {field_list_key : field_list_key, field_list_value : field_list_value},
            dataType: "json",
            success:
                function(data) {
                    dashboard_update_report_elements(data);
                },
            error:
                function(xhr, textStatus) {
                    console.log(textStatus);
                    console.log(xhr);
                }
        }
    );
}


var element_list_data = new Array();
function dashboard_update_report_elements(data) {
    var report = null;
    for(var i=0;i<report_list.length;i++) {
        if(current_report*1===report_list[i].id*1) {
            report = report_list[i];
        }
    }
    if(report === null) {
        return "";
    }
    element_list_data = data;
    dashboard_show_content();
}

function dashboard_show_current_report() {
    var report = null;
    for(var i=0;i<report_list.length;i++) {
        if(current_report*1===report_list[i].id*1) {
            report = report_list[i];
        }
    }
    if(report === null) {
        return "";
    }
    var div = "";
    div += "<div class=\"hbi_report_view\">";
    div += "<div class=\"hbi_report_view1\">";
    for(var i=0;i<report.report_element_list.length;i++) {
        div += dashboard_show_report_element(report.report_element_list[i]);
    }
    div += "</div>";
    div += "</div>";
    return div;
}

function dashboard_update_design() {
    var report = null;
    for(var i=0;i<report_list.length;i++) {
        if(current_report*1===report_list[i].id*1) {
            report = report_list[i];
        }
    }
    if(report === null) {
        return "";
    }
    for(var i=0;i<report.report_element_list.length;i++) {
        dashboard_update_report_element(report.report_element_list[i]);
    }
}

function dashboard_show_report_element(report_element) {
    var div = "";
    div += "<div class=\"dashboard_report_element\" id=\"dashboard_report_element"+report_element.id+"\">";
    div += "<div class=\"dashboard_report_element_head\">";
    div += "<div class=\"dashboard_report_element_head_left\">"+report_element.name+"</div>";
    var config = "";//<a href=\"#\" onClick=\"dashboard_show_config("+report_element.id+")\"><img src=\"images/config_icon.png\" onClick=\"\"/></a>";
    var form = "";//<a href=\"#\" onClick=\"dashboard_show_form("+report_element.id+")\"><img src=\"images/form_icon.png\"/>";
    if(report_element.type*1 !== 1) {
        form = "";
    }
    div += "<div class=\"dashboard_report_element_head_right\">"+form+" "+config+"</div>";
    div += "</div>";
    div += "<div class=\"dashboard_report_element_form\" id=\"dashboard_report_element_form"+report_element.id+"\"></div>";
    switch(report_element.type*1) {
        case 1:     div += dashboard_show_report_element_table(report_element);
                    break;
        case 2:     div += dashboard_show_report_element_map(report_element);
                    break;
        case 3:     div += dashboard_show_report_element_piechart(report_element);
                    break;
        case 4:     div += dashboard_show_report_element_barchart(report_element);
                    break;
        case 5:     div += dashboard_show_report_element_linechart(report_element);
                    break;
    }
    div += "</div>";
    return div;
}

/*
function dashboard_show_form() {
    var div = "";
    var report = null;
    for(var i=0;i<report_list.length;i++) {
        if(current_report*1===report_list[i].id*1) {
            report = report_list[i];
        }
    }
    if(report === null) {
        return "";
    }
    for(var i=0;i<report.report_element_list.length;i++) {
        dashboard_update_report_element(report.report_element_list[i]);
    }
    
    $("#dashboard_report_element_form"+report_element.id).clear();
    $("#dashboard_report_element_form"+report_element.id).append(div);
}*/

function dashboard_update_report_element(report_element) {
    switch(report_element.type*1) {
        case 1:     dashboard_update_report_element_table(report_element);
                    break;
        case 2:     dashboard_update_report_element_map(report_element);
                    break;
        case 3:     dashboard_update_report_element_piechart(report_element);
                    break;
        case 4:     dashboard_update_report_element_barchart(report_element);
                    break;
        case 5:     dashboard_update_report_element_linechart(report_element);
                    break;
    }
}

function dashboard_get_report(report_element) {
    var report = null;
    for(var i=0;i<report_list.length;i++) {
        if(report_list[i].id*1===report_element.report_id*1) {
            report = report_list[i];
        }
    }
    return report;
}

function dashboard_get_report_fields(report_element) {
    var report_element_field_list = new Array();
    var report = dashboard_get_report(report_element);
    if(report===null) return new Array();
    for(var i=0;i<report.report_element_field_list.length;i++) {
        if(report.report_element_field_list[i].report_element_id*1 === report_element.id*1) {
            report_element_field_list.push(report.report_element_field_list[i]);
        }
    }
    return report_element_field_list;
}

function dashboard_get_report_element_fields(report_element) {
    var report_element_field_list = dashboard_get_report_fields(report_element);
    var report = dashboard_get_report(report_element);
    var report_fields = new Array();
    for(var i=0;i<report_element_field_list.length;i++) {
        for(var j=0;j<report.report_element_metadata_mapping.length;j++) {
            if(report_element_field_list[i].metadata_field_id*1 === report.report_element_metadata_mapping[j].id*1) {
                report_fields.push(report.report_element_metadata_mapping[j]);
            }
        }
    }
    return report_fields;
}

function get_current_data(report_element) {
    for(var index in element_list_data) {
        if(index*1 === report_element.id*1) {
            return element_list_data[index];
        }
    }
    return new Array();
}

var table_status = new Array();
function set_table_status(report_element_id, status ) {
    table_status[""+report_element_id] = status;
    dashboard_show_content();
}

function get_value_from_array(array, index, key) {
    if(array.length < index + 1) {
        return "";
    }
    for(var index1 in array[index]) {
        if(index1 === key) {
            return array[index][index1];
        }
    }
    return "";
}

function dashboard_show_report_element_table(report_element) {
    var elements = get_current_data(report_element);
    
    var status = 0;
    if($.inArray(""+report_element.id, table_status) === true) {
        status = table_status[""+report_element.id]*1;
    }
    var div = "";
    div += "<div class=\"dashboard_table\" id=\"dashboard_table"+report_element.id+"\">";
    div += "<div class=\"dashboard_table_head\" id=\"dashboard_table_head"+report_element.id+"\">";
    var fields = dashboard_get_report_element_fields(report_element);
    for(var i=0;i<fields.length;i++) {
        var width = 100;
        if(fields[i].type*1 === 7) {
            width = 200;
        }
        if(i===fields.length-1) {
            
            div += "<div class=\"dashboard_table_head_element_last\" style=\"width:"+width+"px\">"+fields[i].name+"</div>";
        }
        else {
            div += "<div class=\"dashboard_table_head_element\" style=\"width:"+width+"px\">"+fields[i].name+"</div>";
        }
    }
    div += "</div>";
    div += "<div class=\"dashboard_table_content\" id=\"dashboard_table_content"+report_element.id+"\">";
    for(var i=0;i<15;i++) {
        div += "<div class=\"dashboard_table_content_row\" id=\"dashboard_table_content_row"+report_element.id+"_"+i+"\">";
        for(var j=0;j<fields.length;j++) {
            var value = "";
            var index = 10*status + i;
            if(elements.length >= index + 1) {
                value = get_value_from_array(elements, index, fields[j].name);
                if(fields[j].type*1 === 7) {
                   value = format_datetime(value);
                }
                if(fields[j].type*1 === 6) {
                   value = format_date(value);
                }
                if(fields[j].type*1 === 3) {
                    value = "<div><a href=\"#\" onClick=\"show_position('"+value+"')\">"+trans_value["location"]+"</a></div>";
                }
            }
            if(elements.length === 0 && i === 0 && j === 0) {
                value = trans_value["nocontent"];
            }
            div += "<div class=\"dashboard_table_content_td\" id=\"dashboard_table_content_td_"+report_element.id+"_"+i+"_"+j+"\">"+value+"</div>";
        }
        div += "</div>";
    }
    div += "</div>";
    div += "<div class=\"dashboard_table_footer\" id=\"dashboard_table_footer"+report_element.id+"\"><button><<</button><button><</button><input type=\"text\" class=\"dashboard_table_pagination_number\" value=\"0\"> <div id=\"dashboard_table_pagination"+report_element.id+"\"> / 0 </div><select id=\"\"><option value=10>10</option><option value=20>20</option><option value=30>30</option><option value=50>50</option><option value=100>100</option></select><button>></button><button>>></button></div>"
    div += "</div>";
    return div;
}

function dashboard_update_report_element_table(report_element) {
    var width = $("#dashboard_table_head"+report_element.id).width();
    if(width < 300) {
        width = 300;
    }
    var fields = dashboard_get_report_element_fields(report_element);
    for(var i=0;i<15;i++) {
        $("#dashboard_table_content_row"+report_element.id+"_"+i).width(width);
        for(var j=0;j<fields.length;j++) {
            if(fields[j].type*1 === 7) {
                $("#dashboard_table_content_td_"+report_element.id+"_"+i+"_"+j).width(200);
            }
            else {
                $("#dashboard_table_content_td_"+report_element.id+"_"+i+"_"+j).width(100);
            }
        }
    }
    $("#dashboard_table_head"+report_element.id).width(width);
    $("#dashboard_table_head"+report_element.id).height(25);
    $("#dashboard_table_content"+report_element.id).width(width);
    $("#dashboard_table_footer"+report_element.id).width(width);
    $("#dashboard_table_footer"+report_element.id).height(40);
    $("#dashboard_table"+report_element.id).width(width+20);
}

function dashboard_show_report_element_map(report_element) {
    var div = "";
    div += "<div id=\"hbi_map_"+report_element.id+"\" class=\"hbi_map_dash\"></div>";
    return div;
}

function dashboard_update_report_element_map(report_element) {
    var elements = get_current_data(report_element);
    if(elements.length === 0) {
        return;
    }
    var fields = dashboard_get_report_element_fields(report_element);
    for(var j=0;j<fields.length;j++) {
        if(fields[j].type*1 === 3) {
            var value = get_value_from_array(elements, 0, fields[j].name);
            console.log(value);
            var split =  value.split(" ");
            var zoom = 12;
            var lat = split[0]*1;
            var lon = split[1]*1;
            var map = L.map("hbi_map_"+report_element.id).setView([lat, lon], zoom);
            var marker = L.marker([lat, lon]).addTo(map);
            L.tileLayer('http://{s}.tile.cloudmade.com/'+cloudmade_key+'/4/256/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
                maxZoom: 18
            }).addTo(map);
        }
    }
}

function dashboard_show_report_element_piechart(report_element) {
    var div = "";
    return div;
}

function dashboard_update_report_element_piechart(report_element) {
}

function dashboard_show_report_element_barchart(report_element) {
    var div = "";
    return div;
}

function dashboard_update_report_element_barchart(report_element) {
}

function dashboard_show_report_element_linechart(report_element) {
    var div = "";
    return div;
}

function dashboard_update_report_element_linechart(report_element) {
}

function dashboard_show_structur_box(nav_struc) {
    var div = "";
    div += "<div class=\"hbi_structur_box\">";
    div += "<div class=\"hbi_structur_box_head\">"+nav_struc.name+"</div>";
    div += "<div class=\"hbi_structur_box_content\">";
    div += "<ul class=\"hbi_structur_box_content_ul_0\">"
    for(var i=0;i<nav_struc.sub_structur.length;i++) {
        div += dashboard_show_structur(nav_struc.sub_structur[i], 0);
    }
    div += "</ul>";
    div += "</div>";
    div += "</div>";
    return div;
}

function dashboard_show_structur(nav_struc, ebene) {
    var div = "";
    div += "<li class=\"hbi_structur_box_content_li_"+ebene+"\">";
    var action = "";
    if(nav_struc.report_id !== 0) {
        action = "onClick=\"dashboard_show_report_info("+nav_struc.report_id+")\"";
    }
    div += "<a href=\"#\" "+action+">"+nav_struc.name+"</a>";
    if(nav_struc.sub_structur.length > 0) {
        div += "<ul class=\"hbi_structur_box_content_ul_"+ebene+1+"\">";
        for(var i=0;i<nav_struc.sub_structur.length;i++) {
            div += dashboard_show_structur(nav_struc.sub_structur[i], ebene + 1);
        }
        div += "</ul>";
    }
    div += "</li>";
    return div;
}

function dashboard_view_report(report_wrapper) {
    var div = "";
    $("#hbi_tab_list").append(div);
}