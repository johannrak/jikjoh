document.addEventListener('DOMContentLoaded', function(){
  var playlist = new Array("musics/youngfolks.mp3","musics/overload.mp3");
  var timer;
  var time = 3;
  var btnStart = document.getElementById("btnStartRunning");
  var audio1 = new Audio(), i=0;
  var runningtime;
  var lblRunTime = document.getElementById("lblRunTimer");
  var bool = false;
  var runTime;
  var distanceTime;
  var sTime;
  var splited;
  var latitude;
  var longitude;
  var distanceTime;
  var distanceRun = 0;
  var lblDistanceRun = document.getElementById('lblDistance');

  var locations = [];
  var oldLocations = [];

  navigator.geolocation.getCurrentPosition(userLocated, locationError);

  function userLocated(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    locations.push(longitude+","+latitude);
  }

  function locationError(error){
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("Permission denied- "+error.message);
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Position Not Available- "+error.message);
        break;
      case error.TIMEOUT:
        alert("Request Time Out-" +error.message);
        break;
    }//End of the function
  }



  function setResetInterval(bool) {
    if (bool) {
      runTime = setInterval(function(){
        sTime--;
        if (sTime < 0) {
          clearInterval(runTime);
          document.getElementById("stopRun").click();
        }
        lblRunTime.innerHTML = ("00"+parseInt(sTime/60)).slice(-2)+":"+("00"+parseInt(sTime%60)).slice(-2);
      },1000);
    } else {
      clearInterval(runTime);
    }
  }

  function setResetInterval1(bool){
    if (bool){

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }

      function showPosition(position) {
        latitude= position.coords.latitude;
        longitude = position.coords.longitude;
      }
    } else {
      clearInterval(distanceTime);
    }

    distanceTime = setInterval(function(){
      var splited = locations[locations.length-1].split(",");

      var xlongitude = splited[0];
      var xlatitude = splited[1];

      var R = 6371e3; // metres
      var φ1 = toRadians(latitude);
      var φ2 = toRadians(xlatitude);
      var Δφ = toRadians(xlatitude-latitude);
      var Δλ = toRadians(xlongitude-longitude);

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var d = R * c;
      distanceRun += parseInt(d)*1000;
      lblDistance.innerHTML = ("0000"+distanceRun).slice(-4)+" meters";
      //lblDistanceRun.innerHTML = Math.sqrt(Math.pow((xlongitude-longitude),2)+(Math.pow(xlatitude-latitude),2))+" meters";
      if (!locations.includes(longitude+":"+latitude)){
        locations.push(longitude+","+latitude);
        oldLocations.push(longitude+","+latitude);
      }
    }, 1000);

    function toRadians(value) {
      return value * Math.PI / 180;
    }
  }

    document.getElementById("playpause").addEventListener("click", function(){
      if (audio1.paused){
        audio1.src = playlist[i];
        audio1.play();
      } else {
        audio1.pause();
      }
    });

    document.getElementById("nextTrack").addEventListener("click", function(){
      if (i+1 == playlist.length){
        alert("This is already the last track");
      } else {
        i++;
        audio1.pause();
        audio1.src = playlist[i];
        audio1.play();
      }
    });

    document.getElementById("previousTrack").addEventListener("click", function(){
      if (i==0){
        alert("This is already the first track");
      } else {
        i--;
        audio1.pause();
        audio1.src = playlist[i];
        audio1.play();
      }
    });

    document.getElementById("stopRun").addEventListener("click", function(){
      i=0;
      audio1.pause();
      distanceRun = 0;
      navigator.geolocation.getCurrentPosition(userLocated, locationError);

      function userLocated(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        locations = [(longitude+";"+latitude)];
      }

      function locationError(error){
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("Permission denied- "+error.message);
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Position Not Available- "+error.message);
            break;
          case error.TIMEOUT:
            alert("Request Time Out-" +error.message);
            break;
        }//End of the function
      }

    });

    document.getElementById("btnPreviewRunning").addEventListener("click", function(){
      if (oldLocations.length==0) {
        alert("There is no previous running track recoreded");
      } else {

        var marker = L.marker([-20.16527900, 57.4963800]).addTo(map);
        window.location = "#previousRunPage";
      }

    });

  document.getElementById("btnStartRunning").addEventListener("click", function(){
    timer = setInterval(function(){
    btnStart.innerHTML = time;
    time--;
    if (time < 0) {
      clearInterval(timer);
      time = 3;
      btnStart.innerHTML = "START";
      window.location = "#runPage";
      runningtime = document.getElementById("timeRun").value;
      splited = String(runningtime).split(":");
      sTime = (parseInt(splited[0])*60) + (parseInt(splited[1]));
      setResetInterval(true);
      setResetInterval1(true);
      if (document.getElementById("checkboxMusic").checked){
        document.getElementById("playpause").click();
      }
      //window.location.href("http://google.com/");
      }
    }, 1000);
  });
});
