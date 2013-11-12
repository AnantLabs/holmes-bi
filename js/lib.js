function format_datetime(dateString) {
    if(dateString.length === 0) {
        return "";
    }
    var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    var dateArray = reggie.exec(dateString); 
    console.log(dateString);
    console.log(reggie);
    console.log(dateArray);
    var year = dateArray[1];
    var month = dateArray[2];
    var day = dateArray[3];
    var hour = dateArray[4];
    var minute = dateArray[5];
    var second = dateArray[6];
    var formatStr = trans_value["date_time_format"];
    formatStr = formatStr.replace("YYYY", year);
    formatStr = formatStr.replace("MM", month);
    formatStr = formatStr.replace("DD", day);
    formatStr = formatStr.replace("hh", hour);
    formatStr = formatStr.replace("mm", minute);
    formatStr = formatStr.replace("ss", second);
    return formatStr;
}

function format_date(dateString) {
    var reggie = /(\d{4})-(\d{2})-(\d{2})/;
    var dateArray = reggie.exec(dateString); 
    var year = dateArray[1];
    var month = dateArray[2];
    var day = dateArray[3];
    var formatStr = trans_value["date_format"];
    formatStr = formatStr.replace("YY", year);
    formatStr = formatStr.replace("MM", month);
    formatStr = formatStr.replace("DD", day);
    return formatStr;
}

function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
function format_position(lat, lon, zoom) {
    if(value.length === 0) return "";
    var xtile = long2tile(lon, zoom);
    var ytile = lat2tile(lat, zoom);
    return xtile+"/"+ytile;
}
function show_position(value) {
    var split =  value.split(" ");
    var zoom = 12;
    var lat = split[0]*1;
    var lon = split[1]*1;
    var content = "<div id=\"hbi_map\"></div>";
    show_message(trans_value["position"], content, 200, 200);
    var map = L.map("hbi_map").setView([lat, lon], zoom);
    var marker = L.marker([lat, lon]).addTo(map);
    L.tileLayer('http://{s}.tile.cloudmade.com/'+cloudmade_key+'/4/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);
}