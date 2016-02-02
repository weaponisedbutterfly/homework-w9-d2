window.onload = function(){
  console.log('App started');

  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();
  request.open("GET", url);


  var select = document.getElementById('dropdown');
  var countryInfo = document.getElementById('countryInfo');

  var JSONcountry = localStorage.getItem('saved country') || {};

  var countryToLoad = JSON.parse(JSONcountry) || {};

  var li1 = document.createElement('li');
  li1.innerText = "Country: " + countryToLoad.countryname;
  countryInfo.appendChild(li1);

  var li2 = document.createElement('li');
  li2.innerText = "Population: " + countryToLoad.countrypopulation;
  countryInfo.appendChild(li2);

  var li3 = document.createElement('li');
  li3.innerText = "Capital: " + countryToLoad.countrycapital;
  countryInfo.appendChild(li3);
  console.log(countryToLoad);




  request.onload = function(){
    if(request.status === 200){
      console.log('got the data');
    }

    var countries = JSON.parse(request.responseText);
    // console.log("First country:", countries[0].name);

    // console.log("Last country:", countries[countries.length - 1].name);
    // console.log("Countries over 100 million people:")
    // for(country of countries){
    //   if(country.population > 100000000){
    //     console.log(country.name, country.population);
    //   }
    // }
    // console.log("Northern European countries:")
    // for(country of countries){
    //   if(country.subregion === "Northern Europe"){
    //     console.log(country.name);
    //   }
    // }

    for(country of countries){
      var listItem = document.createElement("option");
      listItem.innerText = country.name;
      select.appendChild(listItem);
    }   
  

  var loadCountryData = function(){
    var name = select.selectedOptions[0].innerText;
    countryInfo.innerText = "";
      
      for(country of countries){
        if(country.name === name){
          var population = country.population;
          var capital = country.capital;

          var countryToSave = {
            countryname: name,
            countrypopulation: population,
            countrycapital: capital
          }

          var countryString = JSON.stringify(countryToSave);

          localStorage.setItem("saved country", countryString);

          console.log(countryToSave);

          var li1 = document.createElement('li');
          li1.innerText = "Country: " + name;
          countryInfo.appendChild(li1);

          var li2 = document.createElement('li');
          li2.innerText = "Population: " + population;
          countryInfo.appendChild(li2);

          var li3 = document.createElement('li');
          li3.innerText = "Capital: " + capital;
          countryInfo.appendChild(li3);

        }
      }

  }

  select.onchange = loadCountryData;

  }


request.send(null);


 




};
