// Put your zillow.com API key here
var zwsid = "X1-ZWz1b3ghoh2nm3_4eq90";
var request = new XMLHttpRequest()
var map;
var latlng;
var full_adr;
var address;
var city;
var state;
var zipcode;
var marker;
var markers = [];

//FOLLOWING METHOD GETS THE TOTAL NUMBER OF MARKERS AND REMOVE THEM
function deleteMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
        }

  markers = [];
   deleteResults();

}
//FOLLOWING METHOD EMPTIES THE CONTENT OF THE TEXT DISPLAY AREA
function deleteResults()
{
document.getElementById("text_display").value = " ";
}
//LOADS THE MAP ONLOAD AND DYNAMICALLY APPENDS THE TEXT AREA, CALLS THE geoCode() method
function loadmap() {

                     geocoder = new google.maps.Geocoder();
                     map = new google.maps.Map(document.getElementById("map-canvas"), {
                     center: new google.maps.LatLng(32.75, -97.13),
                     zoom:16
                        });

                 var div = document.getElementById("output");
                 var align = document.createElement("center");
                 var texta = document.createElement("Textarea");
                 texta.setAttribute("id","text_display");
                 texta.setAttribute('cols',80);
         texta.setAttribute('rows', 40);
                 align.appendChild(texta);
                 div.appendChild(align);

                rgeoCode();
   }

//geoCode() METHOD GETS THE LATITUDE AND LONGITUDE onclick event AND PASSES THE COORDINATES TO REVERSE CODING FUNCTION
 function rgeoCode(){

  google.maps.event.addListener(map, 'click', function(event) {
   var latilong = event.latLng;
 var lat = latilong.lat();
 var lng = latilong.lng();
         latlng = new google.maps.LatLng(lat, lng);
          geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
                full_adr = results[0].formatted_address.split(",");
                var e = full_adr[2].split(" ");
        var g = full_adr[3].split(" ");
        address = full_adr[0].split(" ");
                city = full_adr[1].split(",");
                state = e[1].split(" ");
                zipcode = e[2].split(" ");

                try{
                request.onreadystatechange = displayResultr;
    request.open("GET","proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+city+"+"+state+"+"+zipcode);
    request.withCredentials = "true";
    request.send(null);
        }
        catch(err){
        alert(err);
        }
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
 });
}
//APPENDS THE TEXTAREA WITH ZESTIMATE AMOUNT AND INFO PLACES THE MARKER WITH INFOWINDOW LOADED WITH SAME DETAILS
 function displayResultr() {

if (request.readyState == 4) {
        var xml = request.responseXML.documentElement;

//alert("from displayresult1:");
try{
var value3=xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].childNodes[0].nodeValue;
code = xml.getElementsByTagName("code")[0].childNodes[0].nodeValue;

//ONLY IF THE CODE == 0 WHICH IMPLIES SUCCESSFUL VALUE IN THE API RESPONSE
if(code == '0' && value3 != null || value3 == '0' || value3 == ''){

marker = new google.maps.Marker({
position: latlng,
map: map
        });
                marker.setMap(map);
markers.push(marker);

infowindow=new google.maps.InfoWindow();
infowindow.setContent("<font color='red'>"+"$"+value3+"</font>"+":"+full_adr);
infowindow.open(map,marker);

document.getElementById("text_display").value = document.getElementById("text_display").value+"\n"+"AMOUNT:$"+value3+"\n"+"ADDRESS:"+address+"\n"+"CITY:"+city+"\n"+"STATE:"+state+"\n"+"ZIPCODE:"+zipcode+"\n";



}
}
catch(err){

}
}

}



function xml_to_string ( xml_node ) {
   if (xml_node.xml)
      return xml_node.xml;
   var xml_serializer = new XMLSerializer();
   return xml_serializer.serializeToString(xml_node);
}
//APPENDS THE VALUE AND LOADS THE MARKER WITH ZESTIMATE AND OTHER INFO TO IMPLEMENT THE GEOCODING FUNCTION
function displayResult () {
    if (request.readyState == 4) {
        var xml = request.responseXML.documentElement;
                try{
                var value2=xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].childNodes[0].nodeValue;
                code = xml.getElementsByTagName("code")[0].childNodes[0].nodeValue;
if(code == '0' && value2 != null){

document.getElementById("text_display").value = document.getElementById("text_display").value+"\n"+"AMOUNT:$"+value2+"\n"+"ADDRESS:"+xml.getElementsByTagName("street")[0].childNodes[0].nodeValue+"\n"+"CITY:"+xml.getElementsByTagName("city")[0].childNodes[0].nodeValue+"\n"+"STATE:"+xml.getElementsByTagName("state")[0].childNodes[0].nodeValue+"\n"+"ZIPCODE:"+xml.getElementsByTagName("zipcode")[0].childNodes[0].nodeValue+"\n";

                var address = document.getElementById("fulladdress").value;
geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         map.setCenter(results[0].geometry.location);
         marker = new google.maps.Marker({
             map: map,
                         draggable : true,
             position: results[0].geometry.location
         });
 marker.setMap(map);
 markers.push(marker);
 infowindow1=new google.maps.InfoWindow(); infowindow1.setContent("<font color='red'>"+"$"+value2+"</font>"+":"+xml.getElementsByTagName("street")[0].childNodes[0].nodeValue+":"+xml.getElementsByTagName("city")[0].childNodes[0].nodeValue+":"+xml.getElementsByTagName("state")[0].childNodes[0].nodeValue+":"+"ZIPCODE:"+xml.getElementsByTagName("zipcode")[0].childNodes[0].nodeValue);
infowindow1.open(map,marker);

                 }

 else{
 alert(status);
 }
 });
 }

        }
        catch(err){
        }

        }


}


function sendRequest () {
    request.onreadystatechange = displayResult;
        var full_address = document.getElementById("fulladdress").value;
        var ful_first = full_address.split(",");
    var state = ful_first[2].split(" ");
        var address = ful_first[0].split(",");
                var city = ful_first[1].split(",");
                var zipcode = ful_first[3].split(" ");

        var url = "proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+city+"+"+state+"+"+zipcode;
        var encoded_url = encodeURI(url);


    request.open("GET",encoded_url);    request.withCredentials = "true";
    request.send(null);
}