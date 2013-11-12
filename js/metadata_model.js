function metadata(id, name) {
    this.id = id;
    this.name = name;
    this.metadata_table_list = new Array();
    this.metadata_relation_list = new Array();
    this.metadata_table_relation_list = new Array();

    this.add_table = function(metadata_table) {
        if (metadata_table.metadata_id === this.id) {
            this.metadata_table_list.push(metadata_table);
            return true;
        }
        else {
            return false;
        }
    };

    this.add_field = function(metadata_field) {
        for (var i = 0; i < this.metadata_table_list.length; i++) {
            if (this.metadata_table_list[i].add_field(metadata_field) === true) {
                return true;
            }
        }
        return false;
    };

    this.get_fields = function() {
        var fields = new Array();
        for (var i = 0; i < this.metadata_table_list.length; i++) {
            fields = fields.concat(this.metadata_table_list[i].metadata_field_list);
        }
        return fields;
    };

    this.has_field = function(metadata_field_id) {
        for (var i = 0; i < this.metadata_table_list.length; i++) {
            if (this.metadata_table_list[i].has_field(metadata_field_id) === true) {
                return true;
            }
        }
        return false;
    };

    this.has_table = function(metadata_table_id) {
        for (var i = 0; i < this.metadata_table_list.length; i++) {
            if (this.metadata_table_list[i].id === metadata_table_id) {
                return true;
            }
        }
        return false;
    };

    this.get_table = function(metadata_table_id) {
        for (var i = 0; i < this.metadata_table_list.length; i++) {
            if (this.metadata_table_list[i].id === metadata_table_id) {
                return this.metadata_table_lish[i];
            }
        }
        return false;
    };

    this.get_table_name = function(metadata_table_id) {
        var table = this.get_table(metadata_table_id);
        if (table !== false) {
            return table.name;
        }
        return "";
    };

    this.get_field_name = function(metadata_field_id) {
        for (var i = 0; i < this.metadata_table_list.length; i++) {
            for (var j = 0; j < this.metadata_table_list[i].metadata_field_list.length; j++) {
                if (this.metadata_table_list[i].metadata_field_list[j].id === metadata_field_id) {
                    return this.metadata_table_list[i].name + "." + this.metadata_table_list[i].metadata_field_list[j].name;
                }
            }
        }
        return "";
    };

    this.add_relation = function(metadata_relation) {
        if (this.has_field(metadata_relation.metadata_field_id1) === true || this.has_field(metadata_relation.metadata_field_id2)) {
            this.metadata_relation_list.push(metadata_relation);
            return true;
        }
        return false;
    };

    this.add_table_relation = function(metadata_table_relation) {
        if (this.has_field(metadata_table_relation.metadata_field_id1) === true || this.has_field(metadata_table_relation.metadata_field_id2) === true) {
            this.metadata_table_relation_list.push(metadata_table_relation);
            return true;
        }
        return false;
    };

    this.save = function() {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=save&object1=metadata&session_id=" + session_id,
                    data: {id: this.id, name: this.name},
                    dataType: "json",
                    success:
                            function(data) {
                                var found = false;
                                for (var i = 0; i < object_metadata_list.length; i++) {
                                    if (object_metadata_list[i].id * 1 === data.id * 1) {
                                        object_metadata_list[i].name = data.name;
                                        found = true;
                                    }
                                }
                                if (found === false) {
                                    object_metadata_list.push(new metadata(data.id, data.name));
                                }
                                close_message();
                                metadata_show_content();
                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                            }
                }
        );
    };
}

function metadata_table(id, name, metadata_id) {
    this.id = id;
    this.name = name;
    this.metadata_id = metadata_id;
    this.metadata_field_list = new Array();

    this.add_field = function(metadata_field) {
        if (this.id === metadata_field.metadata_table_id) {
            this.metadata_field_list.push(metadata_field);
        }
        else {
            return false;
        }
    };

    this.has_field = function(metadata_field_id) {
        for (var i = 0; i < this.metadata_field_list.length; i++) {
            if (metadata_field_id * 1 === this.metadata_field_list[i].id * 1) {
                return true;
            }
        }
        return false;
    };

    this.save = function() {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=save&object1=metadata_table&session_id=" + session_id,
                    data: {id: this.id, name: this.name, metadata_id: this.metadata_id},
                    dataType: "json",
                    success:
                            function(data) {
                                var found = false;
                                for (var i = 0; i < object_metadata_list.length; i++) {
                                    for (var j = 0; j < object_metadata_list[i].metadata_table_list.length; j++) {
                                        if (object_metadata_list[i].metadata_table_list[j].id * 1 === data.id * 1) {
                                            object_metadata_list[i].metadata_table_list[j].name = data.name;
                                            found = true;
                                        }
                                    }
                                }
                                if (found === false) {
                                    for (var i = 0; i < object_metadata_list.length; i++) {
                                        if (data.metadata_id === object_metadata_list[i].id) {
                                            object_metadata_list[i].add_table(new metadata_table(data.id, data.name, data.metadata_id));
                                            i = object_metadata_list.length;
                                        }
                                    }
                                }
                                close_message();
                                metadata_show_content();
                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                            }
                }
        );
    };
}

function metadata_field(id, metadata_table_id, name, name_in_table, type, metadata_field_id_key, metadata_field_id_value) {
    this.id = id;
    this.metadata_table_id = metadata_table_id;
    this.name = name;
    this.name_in_table = name_in_table;
    this.type = type;
    this.metadata_field_id_key = metadata_field_id_key;
    this.metadata_field_id_value = metadata_field_id_value;

    this.save = function() {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=save&object1=metadata_field&session_id=" + session_id,
                    data: {id: this.id, name: this.name, name_in_table: this.name_in_table, metadata_table_id: this.metadata_table_id, type: this.type, metadata_field_id_key: this.metadata_field_id_key, metadata_field_id_value: this.metadata_field_id_value},
                    dataType: "json",
                    success:
                            function(data) {
                                var found = false;
                                for (var i = 0; i < object_metadata_list.length; i++) {
                                    for (var j = 0; j < object_metadata_list[i].metadata_table_list.length; j++) {
                                        for (var k = 0; k < object_metadata_list[i].metadata_table_list[j].metadata_field_list.length; k++) {
                                            if (object_metadata_list[i].metadata_table_list[j].metadata_field_list[k].id * 1 === data.id * 1) {
                                                if (object_metadata_list[i].metadata_table_list[j].metadata_field_list[k].metadata_table_id * 1 === data.metadata_table_id * 1) {
                                                    object_metadata_list[i].metadata_table_list[j].metadata_field_list[k].metadata_table_id = data.metadata_table_id;
                                                    object_metadata_list[i].metadata_table_list[j].metadata_field_list[k].name = data.name;
                                                    object_metadata_list[i].metadata_table_list[j].metadata_field_list[k].name_in_table = data.name_in_table;
                                                    object_metadata_list[i].metadata_table_list[j].metadata_field_list[k].type = data.type;
                                                    object_metadata_list[i].metadata_table_list[j].metadata_field_list[k].metadata_field_id_key = data.metadata_field_id_key;
                                                    object_metadata_list[i].metadata_table_list[j].metadata_field_list[k].metadata_field_id_value = data.metadata_field_id_value;
                                                    fount = true;
                                                    k = object_metadata_list[i].metadata_table_list[j].metadata_field_list.length;
                                                    j = object_metadata_list[i].metadata_table_list.length;
                                                    i = object_metadata_list.length;
                                                }
                                                else {
                                                    object_metadata_list[i].metadata_table_list[j].metadata_field_list.splice(k, 1);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (found === false) {
                                    for (var i = 0; i < object_metadata_list.length; i++) {
                                        if (object_metadata_list[i].add_field(data) === true) {
                                            i = object_metadata_list.length;
                                        }
                                    }
                                }
                                close_message();
                                metadata_show_content();
                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                            }
                }
        );
    };

}

function metadata_relation(id, metadata_field_id1, metadata_field_id2, type) {
    this.id = id;
    this.metadata_field_id1 = metadata_field_id1;
    this.metadata_field_id2 = metadata_field_id2;
    this.type = type;

    this.save = function() {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=save&object1=metadata_relation&session_id=" + session_id,
                    data: {id: this.id, metadata_field_id1: this.metadata_field_id1, metadata_field_id2: this.metadata_field_id2, type: this.type},
                    dataType: "json",
                    success:
                            function(data) {
                                for (var i = 0; i < object_metadata_list.length; i++) {
                                    for (var j = 0; j < object_metadata_list[i].metadata_relation_list.length; j++) {
                                        if (object_metadata_list[i].metadata_relation_list[j].id * 1 === data.id * 1) {
                                            object_metadata_list[i].metadata_relation_list.splice(j, 1);
                                            j--;
                                        }
                                    }
                                }
                                for (var i = 0; i < object_metadata_list.length; i++) {
                                    object_metadata_list[i].add_relation(data);
                                }
                                close_message();
                                metadata_show_content();
                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                            }
                }
        );
    };
}

function metadata_table_relation(id, metadata_field_id1, metadata_field_id2) {
    this.id = id;
    this.metadata_field_id1 = metadata_field_id1;
    this.metadata_field_id2 = metadata_field_id2;

    this.save = function() {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=save&object1=metadata_table_relation&session_id=" + session_id,
                    data: {id: this.id, metadata_field_id1: this.metadata_field_id1, metadata_field_id2: this.metadata_field_id2},
                    dataType: "json",
                    success:
                            function(data) {
                                var found = false;
                                for (var i = 0; i < object_metadata_list.length; i++) {
                                    for (var j = 0; j < object_metadata_list[i].metadata_table_relation_list.length; j++) {
                                        if (object_metadata_list[i].metadata_table_relation_list[j].id * 1 === data.id * 1) {
                                            found = true;
                                            object_metadata_list[i].metadata_table_relation_list[j].metadata_field_id1 = data.metadata_field_id1;
                                            object_metadata_list[i].metadata_table_relation_list[j].metadata_field_id2 = data.metadata_field_id2;
                                        }
                                    }
                                }
                                if (found === false) {
                                    for (var i = 0; i < object_metadata_list.length; i++) {
                                        if (object_metadata_list[i].add_table_relation(data) === true) {
                                            i = object_metadata_list.length;
                                        }
                                    }
                                }
                                close_message();
                                metadata_show_content();
                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                            }
                }
        );
    };

}

var metadata_list = new Array();
var metadata_table_list = new Array();
var metadata_field_list = new Array();
var metadata_relation_list = new Array();
var metadata_table_relation_list = new Array();

var metadata_list_loaded = false;
var metadata_table_list_loaded = false;
var metadata_field_list_loaded = false;
var metadata_relation_list_loaded = false;
var metadata_table_relation_list_loaded = false;

function load_metadata_init() {
    $.ajax(
            {
                url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=list&object1=metadata&session_id=" + session_id,
                dataType: "json",
                success:
                        function(data) {
                            metadata_list = data;
                            metadata_list_loaded = true;
                            parse_data();
                        },
                error:
                        function(xhr, textStatus) {
                            console.log(textStatus);
                            console.log(xhr);
                        }
            }
    );
    $.ajax(
            {
                url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=list&object1=metadata_table&session_id=" + session_id,
                dataType: "json",
                success:
                        function(data) {
                            metadata_table_list = data;
                            metadata_table_list_loaded = true;
                            parse_data();
                        },
                error:
                        function(xhr, textStatus) {
                            console.log(textStatus);
                            console.log(xhr);
                        }
            }
    );
    $.ajax(
            {
                url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=list&object1=metadata_field&session_id=" + session_id,
                dataType: "json",
                success:
                        function(data) {
                            metadata_field_list = data;
                            metadata_field_list_loaded = true;
                            parse_data();
                        },
                error:
                        function(xhr, textStatus) {
                            console.log(textStatus);
                            console.log(xhr);
                        }
            }
    );
    $.ajax(
            {
                url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=list&object1=metadata_relation&session_id=" + session_id,
                dataType: "json",
                success:
                        function(data) {
                            metadata_relation_list = data;
                            metadata_relation_list_loaded = true;
                            parse_data();
                        },
                error:
                        function(xhr, textStatus) {
                            console.log(textStatus);
                            console.log(xhr);
                        }
            }
    );
    $.ajax(
            {
                url: "API.php?rand=" + Math.random() + "&object=metadatalib&action=all&method=list&object1=metadata_table_relation&session_id=" + session_id,
                dataType: "json",
                success:
                        function(data) {
                            metadata_table_relation_list = data;
                            metadata_table_relation_list_loaded = true;
                            parse_data();
                        },
                error:
                        function(xhr, textStatus) {
                            console.log(textStatus);
                            console.log(xhr);
                        }
            }
    );
}

var object_metadata_list = new Array();

function parse_data() {
    if (
            metadata_list_loaded === true &&
            metadata_table_list_loaded === true &&
            metadata_field_list_loaded === true &&
            metadata_relation_list_loaded === true &&
            metadata_table_relation_list_loaded === true
            ) {
        object_metadata_list = new Array();

        for (var i = 0; i < metadata_list.length; i++) {
            var metadata_obj = new metadata(metadata_list[i].id, metadata_list[i].name);
            object_metadata_list.push(metadata_obj);
        }

        for (var i = 0; i < metadata_table_list.length; i++) {
            var metadata_table_obj = new metadata_table(metadata_table_list[i].id, metadata_table_list[i].name, metadata_table_list[i].metadata_id);
            for (var j = 0; j < object_metadata_list.length; j++) {
                object_metadata_list[j].add_table(metadata_table_obj);
            }
        }

        for (var i = 0; i < metadata_field_list.length; i++) {
            var metadata_field_obj = new metadata_field(metadata_field_list[i].id, metadata_field_list[i].metadata_table_id, metadata_field_list[i].name, metadata_field_list[i].name_in_table, metadata_field_list[i].type, metadata_field_list[i].metadata_field_id_key, metadata_field_list[i].metadata_field_id_value);
            for (var j = 0; j < object_metadata_list.length; j++) {
                object_metadata_list[j].add_field(metadata_field_obj);
            }
        }

        for (var i = 0; i < metadata_relation_list.length; i++) {
            var metadata_relation_obj = new metadata_relation(metadata_relation_list[i].id, metadata_relation_list[i].metadata_field_id1, metadata_relation_list[i].metadata_field_id2, metadata_relation_list[i].type);
            for (var j = 0; j < object_metadata_list.length; j++) {
                object_metadata_list[j].add_relation(metadata_relation_obj);
            }
        }

        for (var i = 0; i < metadata_table_relation_list.length; i++) {
            var metadata_table_relation_obj = new metadata_table_relation(metadata_table_relation_list[i].id, metadata_table_relation_list[i].metadata_field_id1, metadata_table_relation_list[i].metadata_field_id2);
            for (var j = 0; j < object_metadata_list.length; j++) {
                object_metadata_list[j].add_table_relation(metadata_table_relation_obj);
            }
        }

        metadata_show();
    }
}

var navigation = new Array();

function metadata_print_box(metadata) {
    var div = "";
    div += "<div class=\"hbi_metadata_structur_box\">";
    div += "<div class=\"hbi_metadata_structur_box_head\"><a href=\"#\" onClick=\"metadata_edit(" + metadata.id + ")\">" + metadata.name + "</a>" + (metadata.id !== -1 ? " (<a href=\"#\" onClick=\"metadata_drop(" + metadata.id + ")\">X</a>)" : "") + "</div>";
    div += "<div class=\"hbi_metadata_structur_box_content\">";
    div += "<ul class=\"hbi_metadata_structur_box_content_ul_0\">"
    if (metadata.id !== -1) {
        div += "<li class=\"hbi_metadata_structur_box_content_li_0\">" + trans_value["metadata"]["table"] + metadata_print_tables(metadata) + "</li>";
        div += "<li class=\"hbi_metadata_structur_box_content_li_0\">" + trans_value["metadata"]["fields"] + metadata_print_fields(metadata) + "</a></li>";
        div += "<li class=\"hbi_metadata_structur_box_content_li_0\">" + trans_value["metadata"]["table_relations"] + metadata_print_table_relation(metadata) + "</a></li>";
        div += "<li class=\"hbi_metadata_structur_box_content_li_0\">" + trans_value["metadata"]["meta_relations"] + metadata_print_relation(metadata) + "</a></li>";
    }
    div += "</ul>"
    div += "</div>";
    div += "</div>";
    return div;
}

function metadata_print_tables(metadata) {
    var div = "";
    div += "<ul class=\"hbi_metadata_structur_box_content_ul_1\">";
    for (var i = 0; i < metadata.metadata_table_list.length; i++) {
        div += "<li class=\"hbi_metadata_structur_box_content_li_1\"><a href=\"#\" onClick=\"metadata_table_edit(" + metadata.metadata_table_list[i].id + "," + metadata.id + ")\">" + metadata.metadata_table_list[i].name + "</a> (<a href=\"#\">X</a>)</li>"
    }
    div += "<li class=\"hbi_metadata_structur_box_content_li_1\"><a href=\"#\" onClick=\"metadata_table_edit(-1," + metadata.id + ")\">" + trans_value["metadata"]["new"] + "</a></li>";
    div += "</ul>";
    return div;
}

function metadata_print_fields(metadata) {
    var div = "";
    var fields = metadata.get_fields();
    div += "<ul class=\"hbi_metadata_structur_box_content_ul_1\">";
    for (var i = 0; i < fields.length; i++) {
        div += "<li class=\"hbi_metadata_structur_box_content_li_1\"><a href=\"#\" onClick=\"metadata_field_edit(" + fields[i].id + "," + metadata.id + ")\">" + metadata.get_field_name(fields[i].id) + "</a> (<a href=\"#\">X</a>)</li>";
    }
    div += "<li class=\"hbi_metadata_structur_box_content_li_1\"><a href=\"#\" onClick=\"metadata_field_edit(-1, " + metadata.id + ")\">" + trans_value["metadata"]["new"] + "</a></li>";
    div += "</ul>";
    return div;
}

function metadata_print_relation(metadata) {
    var div = "";
    div += "<ul class=\"hbi_metadata_structur_box_content_ul_1\">";
    for (var i = 0; i < metadata.metadata_relation_list.length; i++) {
        var mr = metadata.metadata_relation_list[i];
        var type = "";
        if (mr.type * 1 === 1) {
            type = trans_value["metadata"]["relation"]["type"]["1_N"];
        }
        if (mr.type * 1 === 2) {
            type = trans_value["metadata"]["relation"]["type"]["N_1"];
        }
        if (mr.type * 1 === 3) {
            type = trans_value["metadata"]["relation"]["type"]["N_M"];
        }
        var text1 = metadata.get_field_name(mr.metadata_field_id1);
        var text2 = metadata.get_field_name(mr.metadata_field_id2);
        if (text2 === "" && mr.type * 1 === 1) {
            type = trans_value["metadata"]["relation"]["type"]["N_1"];
        }
        if (text1 === "" && mr.type * 1 === 2) {
            type = trans_value["metadata"]["relation"]["type"]["1_N"];
        }
        var text = text1 + text2;
        div += "<li class=\"hbi_metadata_structur_box_content_li_1\"><a href=\"#\" onClick=\"metadata_relation_edit(" + metadata.metadata_relation_list[i].id + ", " + metadata.id + ")\">" + text + " " + type + "</a> (<a href=\"#\">X</a>)</li>";
    }
    div += "<li class=\"hbi_metadata_structur_box_content_li_1\"><a href=\"#\" onClick=\"metadata_relation_edit(-1, " + metadata.id + ")\">" + trans_value["metadata"]["new"] + "</a></li>";
    div += "</ul>";
    return div;
}

function metadata_print_table_relation(metadata) {
    var div = "";
    div += "<ul class=\"hbi_metadata_structur_box_content_ul_1\">";
    for (var i = 0; i < metadata.metadata_table_relation_list.length; i++) {
        div += "<li class=\"hbi_metadata_structur_box_content_li_1\"><a href=\"#\" onClick=\"metadata_table_relation_edit(" + metadata.metadata_table_relation_list[i].id + "," + metadata.id + ")\">" + metadata.get_field_name(metadata.metadata_table_relation_list[i].metadata_field_id1) + ":" + metadata.get_field_name(metadata.metadata_table_relation_list[i].metadata_field_id2) + "</a> (<a href=\"#\">X</a>)</li>";
    }
    div += "<li class=\"hbi_metadata_structur_box_content_li_1\"><a href=\"#\" onClick=\"metadata_table_relation_edit(-1," + metadata.id + ")\">" + trans_value["metadata"]["new"] + "</a></li>";
    div += "</ul>";
    return div;
}

function metadata_edit(nr) {
    var metadata_obj = new metadata(nr, "");
    for (var i = 0; i < object_metadata_list.length; i++) {
        if (object_metadata_list[i].id * 1 === nr * 1) {
            metadata_obj = object_metadata_list[i];
        }
    }
    var div = "";
    div += "<p>" + trans_value["metadata"]["name"] + ": <input type=\"text\" name=\"metadata_name\" id=\"metadata_name\" value=\"" + metadata_obj.name + "\"/></p>";
    div += "<button onClick=\"metadata_save(" + nr + ")\">" + trans_value["save"] + "</button>";
    metadata_interface(trans_value["metadata"]["create"] + " " + trans_value["metadata"]["metadata"], div);
}

function metadata_save(nr) {
    var metadata_obj = new metadata(nr, "");
    for (var i = 0; i < object_metadata_list.length; i++) {
        if (object_metadata_list[i].id * 1 === nr * 1) {
            metadata_obj = object_metadata_list[i];
        }
    }
    metadata_obj.name = $("#metadata_name").val();
    metadata_obj.save();
}

function metadata_table_edit(nr, metadata_id) {
    var obj = new metadata_table(nr, "", metadata_id);
    for (var i = 0; i < object_metadata_list.length; i++) {
        for (var j = 0; j < object_metadata_list[i].metadata_table_list.length; j++) {
            if (object_metadata_list[i].metadata_table_list[j].id * 1 === nr * 1) {
                obj = object_metadata_list[i].metadata_table_list[j];
            }
        }
    }
    var div = "";
    div += "<p>Name: <input type=\"text\" name=\"metadata_table_name\" id=\"metadata_table_name\" value=\"" + obj.name + "\"/></p>";
    div += "<button onClick=\"metadata_table_save(" + nr + "," + metadata_id + ")\">" + trans_value["save"] + "</button>";
    metadata_interface(trans_value["metadata"]["create"] + " " + trans_value["metadata"]["table"], div);
}

function metadata_table_save(nr, metadata_id) {
    var obj = new metadata_table(nr, "", metadata_id);
    for (var i = 0; i < object_metadata_list.length; i++) {
        for (var j = 0; j < object_metadata_list[i].metadata_table_list.length; j++) {
            if (object_metadata_list[i].metadata_table_list[j].id * 1 === nr * 1) {
                obj = object_metadata_list[i].metadata_table_list[j];
            }
        }
    }
    obj.name = $("#metadata_table_name").val();
    obj.save();
}

function metadata_field_edit(nr, metadata_id) {
    var obj = new metadata_field(nr, 0, "", "", 0, 0, 0);
    var table = new Array();
    for (var i = 0; i < object_metadata_list.length; i++) {
        var fields = object_metadata_list[i].get_fields();
        for (var j = 0; j < fields.length; j++) {
            if (fields[j].id * 1 === nr * 1) {
                obj = fields[j];
            }
        }
        if (object_metadata_list[i].id * 1 === metadata_id * 1) {
            table = object_metadata_list[i].metadata_table_list;
        }
    }
    var table_select = "";
    table_select += "<select id=\"metadata_table_id\">";
    for (var i = 0; i < table.length; i++) {
        table_select += "<option value=\"" + table[i].id + "\" " + (obj.metadata_table_id * 1 === table[i].id * 1 ? "selected" : "") + ">" + table[i].name + "</option>";
    }
    table_select += "</select>";

    var type_select = "";
    type_select += "<select name=\"metadata_field_type\" id=\"metadata_field_type\">";
    type_select += "<option value=\"1\" " + (obj.type * 1 === 1 ? "selected" : "") + ">" + trans_value["metadata"]["field"]["type"]["text"] + "</option>";
    type_select += "<option value=\"2\" " + (obj.type * 1 === 2 ? "selected" : "") + ">" + trans_value["metadata"]["field"]["type"]["number"] + "</option>";
    type_select += "<option value=\"3\" " + (obj.type * 1 === 3 ? "selected" : "") + ">" + trans_value["metadata"]["field"]["type"]["location"] + "</option>";
    type_select += "<option value=\"4\" " + (obj.type * 1 === 4 ? "selected" : "") + ">" + trans_value["metadata"]["field"]["type"]["currency"] + "</option>";
    type_select += "<option value=\"5\" " + (obj.type * 1 === 5 ? "selected" : "") + ">" + trans_value["metadata"]["field"]["type"]["selection"] + "</option>";
    type_select += "<option value=\"6\" " + (obj.type * 1 === 6 ? "selected" : "") + ">" + trans_value["metadata"]["field"]["type"]["date"] + "</option>";
    type_select += "<option value=\"7\" " + (obj.type * 1 === 7 ? "selected" : "") + ">" + trans_value["metadata"]["field"]["type"]["datetime"] + "</option>";
    type_select += "</select>";

    var key_select = "<select id=\"metadata_field_id_key\"></select>";
    var value_select = "<select id=\"metadata_field_id_value\"></select>";

    var div = "";
    div += "<p>" + trans_value["metadata"]["field"]["name"] + ": <input type=\"text\" name=\"metadata_field_name\" id=\"metadata_field_name\" value=\"" + obj.name + "\"/></p>";
    div += "<p>" + trans_value["metadata"]["field"]["name_in_table"] + ": <input type=\"text\" name=\"metadata_field_name_in_table\" id=\"metadata_field_name_in_table\" value=\"" + obj.name_in_table + "\"/></p>";
    div += "<p>" + trans_value["metadata"]["field"]["table"] + ": " + table_select + "</p>";
    div += "<p>" + trans_value["metadata"]["field"]["type"]["type"] + ": " + type_select + "</p>";
    div += "<p>" + trans_value["metadata"]["field"]["key"] + ": " + key_select + "</p>";
    div += "<p>" + trans_value["metadata"]["field"]["value"] + ": " + value_select + "</p>";
    div += "<button onClick=\"metadata_field_save(" + nr + ")\">" + trans_value["save"] + "</button>";
    metadata_interface(trans_value["create"] + " " + trans_value["metadata"]["field"]["name"], div);
}

function metadata_field_save(nr) {
    var obj = new metadata_field(nr, 0, "", "", 0, 0, 0);
    obj.id = nr;
    obj.name = $("#metadata_field_name").val();
    obj.name_in_table = $("#metadata_field_name_in_table").val();
    obj.metadata_table_id = $("#metadata_table_id").val();
    obj.type = $("#metadata_field_type").val();
    obj.metadata_field_id_key = $("#metadata_field_id_key").val();
    obj.metadata_field_id_value = $("#metadata_field_id_value").val();
    obj.save();
}

function metadata_table_relation_edit(nr, metadata_id) {
    var obj = new metadata_table_relation(nr, 0, 0);
    var fields = new Array();
    var metadata_obj = new metadata(0, name);
    for (var i = 0; i < object_metadata_list.length; i++) {
        if (object_metadata_list[i].id * 1 === metadata_id) {
            metadata_obj = object_metadata_list[i];
            fields = metadata_obj.get_fields();
            for (var j = 0; j < object_metadata_list[i].metadata_table_relation_list.length; j++) {
                if (nr * 1 === object_metadata_list[i].metadata_table_relation_list[j].id * 1) {
                    obj = object_metadata_list[i].metadata_table_relation_list[j];
                }
            }
        }
    }
    var field_select1 = "";
    var field_select2 = "";
    field_select1 += "<select id=\"metadata_field_id1\">";
    field_select2 += "<select id=\"metadata_field_id2\">";
    for (var i = 0; i < fields.length; i++) {
        field_select1 += "<option value=\"" + fields[i].id + "\" " + (obj.metadata_field_id1 * 1 === fields[i].id * 1 ? "selected" : "") + ">" + metadata_obj.get_field_name(fields[i].id) + "</option>";
        field_select2 += "<option value=\"" + fields[i].id + "\" " + (obj.metadata_field_id2 * 1 === fields[i].id * 1 ? "selected" : "") + ">" + metadata_obj.get_field_name(fields[i].id) + "</option>";
    }
    field_select1 += "</select>";
    field_select2 += "</select>";

    var div = "";
    div += "<p>" + trans_value["metadata"]["field"]["name"] + ": " + field_select1 + "</p>";
    div += "<p>" + trans_value["metadata"]["field"]["name"] + ": " + field_select2 + "</p>";
    div += "<button onClick=\"metadata_table_relation_save(" + nr + ")\">" + trans_value["save"] + "</button>";
    metadata_interface(trans_value["create"] + " " + trans_value["metadata"]["table_relation"], div);
}

function metadata_table_relation_save(nr) {
    var obj = new metadata_table_relation(nr, 0, 0);
    obj.id = nr;
    obj.metadata_field_id1 = $("#metadata_field_id1").val();
    obj.metadata_field_id2 = $("#metadata_field_id2").val();
    obj.save();
}

function metadata_relation_edit(nr, metadata_id) {
    var obj = new metadata_relation(nr, 0, 0, 0);
    var fields = new Array();
    for (var i = 0; i < object_metadata_list.length; i++) {
        fields = fields.concat(object_metadata_list[i].get_fields());
        for (var j = 0; j < object_metadata_list[i].metadata_relation_list.length; j++) {
            if (nr * 1 === object_metadata_list[i].metadata_relation_list[j].id * 1) {
                obj = object_metadata_list[i].metadata_relation_list[j];
            }
        }
    }
    var field_select1 = "";
    var field_select2 = "";
    field_select1 += "<select id=\"metadata_field_id1\">";
    field_select2 += "<select id=\"metadata_field_id2\">";
    for (var i = 0; i < fields.length; i++) {
        var name1 = "";
        for (var j = 0; j < object_metadata_list.length; j++) {
            if (name1 === "") {
                name1 = object_metadata_list[j].get_field_name(fields[i].id);
            }
        }
        field_select1 += "<option value=\"" + fields[i].id + "\" " + (obj.metadata_field_id1 * 1 === fields[i].id * 1 ? "selected" : "") + ">" + name1 + "</option>";
        field_select2 += "<option value=\"" + fields[i].id + "\" " + (obj.metadata_field_id2 * 1 === fields[i].id * 1 ? "selected" : "") + ">" + name1 + "</option>";
    }
    field_select1 += "</select>";
    field_select2 += "</select>";

    var type_select = "";
    type_select += "<select name=\"metadata_relation_type\" id=\"metadata_relation_type\">";
    type_select += "<option value=\"1\" " + (obj.type * 1 === 1 ? "selected" : "") + ">" + trans_value["metadata"]["relation"]["type"]["1_N"] + "</option>";
    type_select += "<option value=\"2\" " + (obj.type * 1 === 2 ? "selected" : "") + ">" + trans_value["metadata"]["relation"]["type"]["N_1"] + "</option>";
    type_select += "<option value=\"3\" " + (obj.type * 1 === 3 ? "selected" : "") + ">" + trans_value["metadata"]["relation"]["type"]["N_M"] + "</option>";
    type_select += "</select>"

    var div = "";
    div += "<p>" + trans_value["metadata"]["field"]["name"] + ": " + field_select1 + "</p>";
    div += "<p>" + trans_value["metadata"]["field"]["name"] + ": " + field_select2 + "</p>";
    div += "<p>" + trans_value["metadata"]["type"] + ": " + type_select + "</p>";
    div += "<button onClick=\"metadata_relation_save(" + nr + ")\">" + trans_value["save"] + "</button>";
    metadata_interface(trans_value["create"] + " " + trans_value["metadata"]["table_relation"], div);
}

function metadata_relation_save(nr) {
    var obj = new metadata_relation(nr, 0, 0, 0);
    obj.id = nr;
    obj.metadata_field_id1 = $("#metadata_field_id1").val();
    obj.metadata_field_id2 = $("#metadata_field_id2").val();
    obj.type = $("#metadata_relation_type").val();
    obj.save();
}

function group_save_interface(id, group_name) {
    $.ajax(
            {
                url: "API.php?rand=" + Math.random() + "&object=group&action=save&session_id=" + session_id + "&group_name=" + group_name + "&group_id=" + id,
                dataType: "json",
                success:
                        function(data) {
                            if (data.response == "OK") {
                                show_message("", trans_value["group"]["group_save_successful"], mouse_x, mouse_y);
                                metadata_show_content();
                            }
                            else {
                                show_message("", trans_value["error"]["name"] + " " + data.message, mouse_x, mouse_y);
                            }

                        },
                error:
                        function(xhr, textStatus) {
                            console.log(textStatus);
                            console.log(xhr);
                            show_message("", trans_value["error"]["servercommunication"], mouse_x, mouse_y);
                        }
            }
    );
}

function user_save_interface(id, username, password) {
    $.ajax(
            {
                url: "API.php?rand=" + Math.random() + "&object=user&action=save&session_id=" + session_id + "&username=" + username + "&password=" + password + "&user_id=" + id,
                dataType: "json",
                success:
                        function(data) {
                            if (data.response == "OK") {
                                show_message("", trans_value["user"]["user_save_successful"], mouse_x, mouse_y);
                                metadata_show_content();
                            }
                            else {
                                show_message("", trans_value["error"]["name"] + " " + data.message, mouse_x, mouse_y);
                            }

                        },
                error:
                        function(xhr, textStatus) {
                            console.log(textStatus);
                            console.log(xhr);
                            show_message("", trans_value["error"]["servercommunication"], mouse_x, mouse_y);
                        }
            }
    );
}

function add_user_group_from_group(nr) {
    add_user_group($("#user_id").val(), nr);
}
function add_user_group_from_user(nr) {
    add_user_group(nr, $("#group_id").val());
}
function add_user_group(user_id, group_id) {
    if (user_id * 1 !== -1 && group_id * 1 !== -1) {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=user_group&action=save&session_id=" + session_id + "&user_id=" + user_id + "&group_id=" + group_id,
                    dataType: "json",
                    success:
                            function(data) {
                                if (data.response == "OK") {
                                    metadata_show_content();
                                    close_message();
                                }
                                else {
                                    show_message("", trans_value["error"]["name"] + " " + data.message, mouse_x, mouse_y);
                                }

                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                                show_message("", trans_value["error"]["servercommunication"], mouse_x, mouse_y);
                            }
                }
        );
    }
}

function remove_user_group(user_id, group_id) {
    if (user_id * 1 > 0 && group_id * 1 > 0) {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=user_group&action=remove&session_id=" + session_id + "&user_id=" + user_id + "&group_id=" + group_id,
                    dataType: "json",
                    success:
                            function(data) {
                                if (data.response == "OK") {
                                    metadata_show_content();
                                    close_message();
                                }
                                else {
                                    show_message("", trans_value["error"]["name"] + " " + data.message, mouse_x, mouse_y);
                                }

                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                                show_message("", trans_value["error"]["servercommunication"], mouse_x, mouse_y);
                            }
                }
        );
    }
}

function remove_group(group_id) {
    if (group_id * 1 > 2) {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=group&action=remove&session_id=" + session_id + "&group_id=" + group_id,
                    dataType: "json",
                    success:
                            function(data) {
                                if (data.response == "OK") {
                                    metadata_show_content();
                                    close_message();
                                }
                                else {
                                    show_message("", trans_value["error"]["name"] + " " + data.message, mouse_x, mouse_y);
                                }

                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                                show_message("", trans_value["error"]["servercommunication"], mouse_x, mouse_y);
                            }
                }
        );
    }
}


function remove_user(user_id) {
    if (user_id * 1 > 1) {
        $.ajax(
                {
                    url: "API.php?rand=" + Math.random() + "&object=user&action=remove&session_id=" + session_id + "&user_id=" + user_id,
                    dataType: "json",
                    success:
                            function(data) {
                                if (data.response == "OK") {
                                    metadata_show_content();
                                    close_message();
                                }
                                else {
                                    show_message("", trans_value["error"]["name"] + " " + data.message, mouse_x, mouse_y);
                                }

                            },
                    error:
                            function(xhr, textStatus) {
                                console.log(textStatus);
                                console.log(xhr);
                                show_message("", trans_value["error"]["servercommunication"], mouse_x, mouse_y);
                            }
                }
        );
    }
}