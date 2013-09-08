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

