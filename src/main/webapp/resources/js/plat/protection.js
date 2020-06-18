
var currentLocation = window.location.href;
//console.log("cl: " + currentLocation);
if(currentLocation.indexOf("unityoptions.com") == -1 && currentLocation.indexOf("http://localhost") == -1){
    window.location.href = "http://unityoptions.com";
}