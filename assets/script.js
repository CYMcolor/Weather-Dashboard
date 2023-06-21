var key = 'c8502ebcdb7a83fd03a62d0aaaafa07c';
var city = 'Houston';
console.log(city);

$( document ).ready(function () 
{
    getCoordAPI();

});

function getCoordAPI()
{
    var coordURL = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+ key;
    $.ajax(
    {
        url: coordURL,
        method: "GET"
    })
    .then(function(response)
    {
        console.log(response);
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
    var $date = $('#current').children('.date');
    var $icon = $('#current').children('ul').children('.icon').children('img');
    var $temp =  $('#current').children('ul').children('.temp');
    var $wind =  $('#current').children('ul').children('.wind');
    var $humd =  $('#current').children('ul').children('.humd');
    $.ajax
    ({
        url: cityURL,
        method: "GET"
    })
    .then(function(response)
    {
        console.log(response);

        var date = response.dt;
        var newDate = new Date(date*1000);
        $date.text(newDate.toDateString());

        var icon = response.weather[0].icon;
        $icon.attr('src','http://openweathermap.org/img/wn/'+icon+'@2x.png');
        $icon.attr('alt', response.weather[0].description);

        var temp = response.main.temp;
        $temp.text('Temp: '+ temp + ' Kelvin ');

        var wind = response.wind.speed;
        $wind.text('Wind: ' + wind + 'MPH');

        var humd = response.main.humidity;
        $humd.text('Humidity: ' + humd + '%');

    })
}

function get5DayAPI(lat, lon)
{
    var  cityURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='
                  + lat + '&lon='+ lon +'&appid='+ key;
    
    $.ajax
    ({
        url: cityURL,
        method: "GET"
    })
    .then(function(response)
    {
        console.log(response);
        // for(var i = 0; i < 5; i++)
        // {
        //     var $date = $('#day' + i).children('.date');
        //     var $icon = $('#day' + i).children('ul').children('.icon').children('img');
        //     var $temp =  $('#day' + i).children('ul').children('.temp');
        //     var $wind =  $('#day' + i).children('ul').children('.wind');
        //     var $humd =  $('#day' + i).children('ul').children('.humd');
            
        //     var newI = i *8;

        //     var date = response.list[newI].dt;
        //     var newDate = new Date(date*1000);
        //     $date.text(newDate.toUTCString());

        //     var icon = response.list[newI].weather[0].icon;
        //     $icon.attr('src','http://openweathermap.org/img/wn/'+icon+'@2x.png');
        //     $icon.attr('alt', response.list[newI].weather[0].description);
            
        //     var temp = response.list[newI].main.temp;
        //     $temp.text('Temp: '+ temp + ' Kelvin ');

        //     var wind = response.list[newI].wind.speed;
        //     $wind.text('Wind: ' + wind + 'MPH');

        //     var humd = response.list[newI].main.humidity;
        //     $humd.text('Humidity: ' + humd + '%');

        // }

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