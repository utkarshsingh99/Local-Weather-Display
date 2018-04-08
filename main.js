var place=document.getElementById("placeinfo");
var temp=document.getElementById("temp");
var univtemp;
getLocation();


function getLocation(){
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon,api);
  });
}else{
  place.innerHTML="Nope, not working in your browser, bitch.";
}
}

function api(json){
  textDisplay(json);
  background(json);
}

function background(json){
  var body=document.getElementById("body");
  if(json.weather[0].main=="Clouds"){
    body.style.backgroundImage='url(./cloudy.jpg)';
  }else if (json.weather[0].main=="Clear") {
    body.style.backgroundImage='url(./clear.jpg)';
  }else if (json.weather[0].main=="Drizzle") {
    body.style.backgroundImage='url(./drizzle.jpg)';
  }else if (json.weather[0].main=="Fog") {
    body.style.backgroundImage='url(./fog.jpg)';
  }else if (json.weather[0].main=="Haze") {
    body.style.backgroundImage='url(./haze.jpg)';
  }else if (json.weather[0].main=="Rain") {
    body.style.backgroundImage='url(./rain.jpg)';
  }
}
function textDisplay(json){
  console.log(json.coord.lat);
  console.log(json.coord.lon);
  place.innerHTML=json.name+", "+json.sys.country;
  temp.innerHTML=json.main.temp+" &#176"+"C";
  univtemp =json.main.temp;
  place.style.opacity=0;
  temp.style.opacity=0;
  var anim=setInterval(panimation,100);
  var tanim=setInterval(tanimation,200);
  var op=0;
  var top=0;
  function panimation(){
    if(place.style.opacity==1){
      clearInterval(anim);
    }else{
      op+=0.1;
      place.style.opacity=op;
    }
  }

  function tanimation(){
    if(temp.style.opacity==1){
      clearInterval(tanim);
    }else{
      top+=0.1;
      temp.style.opacity=top;
    }
  }
}

var fahr=0;
function unitToggle(){
  if(!fahr){
    univtemp=(univtemp*9)/5+32;
    temp.innerHTML=univtemp+" &#176"+"F";
    fahr=1;
  }else{
    univtemp=Math.round(((univtemp-32)*5)/9);
    temp.innerHTML=univtemp+" &#176"+"C";
    fahr=0;
  }
}
