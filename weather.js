function b() {
  var name = document.querySelector("#cityName").value;

  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=57efd9bd9f88874d09df3084d62e552a")

    .then(response => response.json())

    .then(response => {

      console.log(response);

      var Temperature = Math.round(response.main.temp - 273.15) + " °C";

      var Wind = Math.round(response.wind.speed * 3.6) + " km/hr";

      var TempF = Math.round((response.main.temp - 273.15)* 9 / 5 + 32) + " °F";

      var pressure = Number(response.main.pressure/33.864).toFixed(2);

      var d = new Date();

      let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

      var Icon = response.weather[0].icon;

      document.querySelector("#header").innerHTML = "Weather at " + response.name + ", " + regionNames.of(response.sys.country);
      document.querySelector("#time").innerHTML =" "+d.toLocaleTimeString('en-US');
      document.querySelector("#icon").innerHTML = `<img src = "http://openweathermap.org/img/wn/${Icon}@4x.png"/>`;
      document.querySelector("#weather").innerHTML = response.weather[0].main;
      document.querySelector("#discp").innerHTML = "(" + response.weather[0].description + ")";
      document.querySelector("#temp").innerHTML = Temperature;
      document.querySelector("#humidity").innerHTML =" "+response.main.humidity+ " %";
      document.querySelector("#visibility").innerHTML =" "+response.visibility/1000+" Km";
      document.querySelector("#pressure").innerHTML =" "+pressure+ " ''Hg";
      document.querySelector("#wind").innerHTML =" "+Wind;
      document.querySelector("#date").innerHTML =" "+d.toLocaleDateString('en-US');

      document.querySelector("#tempF").onclick = f;

      function f() {

        var tempName = document.querySelector("#tempF");

        if (tempName.value == "|°F") {

          document.querySelector("#temp").innerHTML = TempF;

          tempName.value = "|°C"

        } else {

          document.querySelector("#temp").innerHTML = Temperature;

          tempName.value = "|°F"

        }

      }
      document.querySelector("#content").style.display = "block";


    })
    .catch(err => {
      alert("Invalid Input, City not found");
      console.log(err.message);

    });
}