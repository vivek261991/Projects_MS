// Put your Last.fm API key here
var api_key="2c799bb29ebf383dcb61868a359df9e6";
var request = new XMLHttpRequest();
function displayResult(){


//check to remove previous query contents
var a=document.getElementsByTagName("fieldset");
		if(a!=null){
                for(i=0;i<(a.length);i++){
                a[i].parentNode.removeChild(a[i]);
								}
    }


    if(request.readyState == 4){
        var json = JSON.parse(request.responseText);


                        var uList = document.createElement("UL");

                                        fieldset = document.createElement("fieldset");
                                        uList.appendChild(fieldset);

                                        var legend = document.createElement("legend");
                                        fieldset.appendChild(legend);

                                        var name = document.createElement("h3");
                                        name.innerHTML = '<font color="blue">'+"BIOGRAPHY"+'</font>';
                                        legend.appendChild(name);
                                
                                        var inULList = document.createElement("LI");
                                        fieldset.appendChild(inULList);
                       
                                        contDIV = document.createElement("div");
                                        inULList.appendChild(contDIV);
                           
                                        var artistHeadn = document.createElement("h3");
                                        artistHeadn.innerHTML='<center>'+json.artist.name+'</center>';
                                        contDIV.appendChild(artistHeadn);
                                         
                                        var center = document.createElement("center");
                                        contDIV.appendChild(center);
                                        
                                        var artistIMG = document.createElement("img");
                                        artistIMG.setAttribute("src",json.artist.image[2]["#text"]);
                                        center.appendChild(artistIMG);
                          
                                        var summaryHeadn = document.createElement("h3");
                                        summaryHeadn.setAttribute("class","text-center");
                                        summaryHeadn.innerHTML="BIOGRAPHY:"+"<br\>"+json.artist.bio.summary;
                                        contDIV.appendChild(summaryHeadn);
                                        var mastrDIV = document.getElementById("output");
                                        mastrDIV.appendChild(uList);


        //REQUEST TO FETCH TOP ALBUMS
        var artist = document.getElementById("form-input").value;
        var methodtop = "artist.getTopAlbums";
        request.onreadystatechange = displayResulttop;
        request.open("GET","proxy.php?method="+methodtop+"&artist="+artist+"&api_key="+api_key+"&format=json","true");
        request.withCredentials = "true";
        request.send();



    }
}
function displayResulttop()
{

    if(request.readyState == 4)
    {
        var json = JSON.parse(request.responseText);
        var uList = document.createElement("UL");

        fieldset = document.createElement("fieldset");
        uList.appendChild(fieldset);

        var legend = document.createElement("legend");
        fieldset.appendChild(legend);

        var topHeadn = document.createElement("h4");
        topHeadn.innerHTML= '<center>'+'<h4>'+'<font color="blue">'+"TOP ALBUMS"+'</font>'+'</h4>'+'</center>';
        legend.appendChild(topHeadn);


        for(var i=1; i<6;i++){

            var inULList = document.createElement("LI");
            fieldset.appendChild(inULList);

            center = document.createElement("center");
            inULList.appendChild(center);

            contDIV = document.createElement("div");
            center.appendChild(contDIV);

            fieldset1 = document.createElement("fieldset");
            contDIV.appendChild(fieldset1);

            var topHeadn = document.createElement("h3");
            topHeadn.innerHTML=json.topalbums.album[i].name;
            fieldset1.appendChild(topHeadn);

            var clsIMG = document.createElement("img");
            clsIMG.setAttribute("src",json.topalbums.album[i].image[2]["#text"]);
            fieldset1.appendChild(clsIMG);

            var playcountHeadn = document.createElement("h3");
            playcountHeadn.innerHTML="PLAYCOUNT:"+json.topalbums.album[i].playcount;
            fieldset1.appendChild(playcountHeadn);

            }

         var mastrDIV = document.getElementById("outputtop");
         mastrDIV.appendChild(uList);

    //REQUEST TO FETCH EVENTS
    var artist = document.getElementById("form-input").value;
    var methodEvent = "artist.getEvents";
    request.onreadystatechange = displayResultevent;
    request.open("GET","proxy.php?method="+methodEvent+"&artist="+artist+"&api_key="+api_key+"&format=json","true");
    request.withCredentials = "true";
    request.send();


    }
}
function displayResultevent(){

    if(request.readyState == 4){
        var json = JSON.parse(request.responseText);

        var str = JSON.stringify(json,undefined,2);




       //CHECK TO REMOVE ALREADY POPULATED CONTENTS UNDER P TAG IN CASE OF NO RESULTS
       if(str.length < 300){
       var a=document.getElementsByTagName("p");
       if(a!=null){
       for(i=0;i<(a.length);i++){
       a[i].parentNode.removeChild(a[i]);
       }
       }


        var noResult = document.createElement("p");
        var albumHeadn = document.createElement("h3");
        albumHeadn.innerHTML='<marquee>'+"NO EVENTS"+'</marquee>';
        noResult.appendChild(albumHeadn);

     var mastrDIV = document.getElementById("outputevent");
     mastrDIV.appendChild(noResult);

			 }


	  else{
                var a=document.getElementsByTagName("p");//CHECK TO REMOVE PREVIOUS POPULATED NO RESULT CONTENT
                if(a!=null){
                for(i=0;i<(a.length);i++){
                a[i].parentNode.removeChild(a[i]);
                }
                }


           var uList = document.createElement("UL");
           uList.setAttribute("class","thumbnails");
           uList.setAttribute("style","margin-top: 42px;");

           fieldset = document.createElement("fieldset");
           uList.appendChild(fieldset);

           var legend = document.createElement("legend");
           fieldset.appendChild(legend);

           var eventHeadn = document.createElement("h4");
           eventHeadn.innerHTML= '<center>'+'<h4>'+'<font color="blue">'+"UP COMING EVENTS"+'</font>'+'</h4>'+'</center>';
           legend.appendChild(eventHeadn);


                            for(var i=0;i<json.events.event.length;i++){

                            var inULList = document.createElement("LI");
                            inULList.setAttribute("class","span4");
                            fieldset.appendChild(inULList);

                            center = document.createElement("center");
                            inULList.appendChild(center);

                            contDIV = document.createElement("div");
                            contDIV.setAttribute("class","thumbnail");
                            center.appendChild(contDIV);

                            fieldset1 = document.createElement("fieldset");
                            contDIV.appendChild(fieldset1);

                            var albumHeadn = document.createElement("h3");
                            fieldset1.appendChild(albumHeadn);

                            var venueHeadn = document.createElement("h3");
                            venueHeadn.innerHTML="VENUE:"+json.events.event[i]["venue"].name;
                            fieldset1.appendChild(venueHeadn);

                            var loc = document.createElement("h3");
                            loc.setAttribute("class","text-center");
                            loc.innerHTML="ADDRESS:"+json.events.event[i]["venue"]["location"].city+","+json.events.event[i]["venue"]["location"].country+","+json.events.event[i]["venue"]["location"].postalcode;
                            fieldset1.appendChild(loc);

                            var startDate = document.createElement("h3");
                            startDate.setAttribute("class","text-center");
                            startDate.innerHTML="START DATE:"+json.events.event[i].startDate;
                            fieldset1.appendChild(startDate);
                            }

                                        var mastrDIV = document.getElementById("outputevent");
                                        mastrDIV.appendChild(uList);

                }

    }
}
function sendRequest(){
var a=document.getElementsByTagName("fieldset");
if(a!=null){
                for(i=0;i<(a.length);i++)
                {
                a[i].parentNode.removeChild(a[i]);

                }
                }

    var method = "artist.getInfo";
    request.onreadystatechange = displayResult;
    var artist = document.getElementById("form-input").value;
    request.open("GET","proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json","true");
    request.withCredentials = "true";
    request.send(null);
}