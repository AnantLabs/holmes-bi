

function navigation(id, name, content) {
    var id = id;
    var name = name;
    var content = content;
}

var hbidash = new holmesbidashboard();
function holmesbidashboard() {
    var mode = 0;
    var navlist = new Array();
    
    function add_navigation(id, name, content) {
        this.navlist.push(new navigation(id, name, content));
    }
    function remove_navigation(id) {
        for (var i = 0; i < navlist.length; i++) {
            if (this.navlist[i].id === id) {
                //TODO Remove element
            }
        }
    }
}