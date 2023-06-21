var key = 'c8502ebcdb7a83fd03a62d0aaaafa07c';
//var coordURL = 'https://api.openweathermap.org/data/2.5/weather?q=Houston,Texas&appid='+ key;
//var  cityURL = 'https://api.openweathermap.org/data/2.5/weather?lat='
//                  + lat + '&lon='+ lon +'&appid='+ key;
getCoordAPI();
function getCoordAPI()
{
    var coordURL = 'https://api.openweathermap.org/data/2.5/weather?q=Houston,Texas&appid='+ key;
    $.ajax(
    {
        url: coordURL,
        method: "GET"
    })
    .then(function(response)
    {
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        getCurrDayAPI(lat,lon);
        get5DayAPI(lat,lon);
    })
}

function getCurrDayAPI(lat, lon)
{
    var  cityURL = 'https://api.openweathermap.org/data/2.5/weather?lat='
                  + lat + '&lon='+ lon +'&appid='+ key;
    console.log('lat city: '+ lat);
    console.log('lon city: '+ lon);
    $.ajax
    ({
        url: cityURL,
        method: "GET"
    })
    .then(function(response)
    {
        console.log(response);
        var icon = response.weather[0].icon;
        console.log(icon);
        var temp = response.main.temp;
        console.log(temp);
        var wind = response.wind.speed;
        console.log(wind);
        var humd = response.main.humidity;
        console.log(humd);

    })
}

function get5DayAPI(lat, lon)
{
    var  cityURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='
                  + lat + '&lon='+ lon +'&appid='+ key;
                  
    $.ajax
    ({
        url: cityURL,
        method: "GET"
    })
    .then(function(response)
    {
        console.log(response);
        var temp = response.list[0].main.temp;
        console.log(temp);

    })
}


/*
//async method to store values globally
var coord;
getCoordAPI();

console.log(JSON.parse(coord));
function getCoordAPI()
{
    var coordURL = 'https://api.openweathermap.org/data/2.5/weather?q=Houston,Texas&appid='+ key;
    $.ajax(
    {
        async: false,
        url: coordURL,
        method: "GET",
        dataType: 'json',
        success:function(data)
        {
            coord = JSON.stringify(data);
        } 
    })

}
*/