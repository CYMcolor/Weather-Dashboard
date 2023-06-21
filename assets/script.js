var key = 'c8502ebcdb7a83fd03a62d0aaaafa07c';
var city = 'Houston';
var $search = $('#search');
var $input = $('#input');
var history = [];

$( document ).ready(function () 
{
    var history = [];
    $search.submit( function(event)
    {
        event.preventDefault();
        //get city name
        city = $input.val();
        //store the value
        
        //history = localStorage.getItem("history");

        history.push(city);
        localStorage.setItem("history",history);
        console.log(history);
        //clear text area and give it a placeholder
        $input.val('');
        $input.attr('placeholder','enter city');
        console.log(city);
        //call the api
        getCoordAPI();
    });
    

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
        getAPI(lat,lon);
    })
}

function getAPI(lat, lon)
{
    var  cityURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='
                  + lat + '&lon='+ lon +'&units=imperial'+
                  '&exclude=minutely,hourly'+'&appid='+ key;
    
    $.ajax
    ({
        url: cityURL,
        method: "GET"
    })
    .then(function(response)
    {
        console.log(response);
        ///current--------------------------------------------------------
        var $date = $('#current').children('.date');
        var $icon = $('#current').children('ul').children('.icon').children('img');
        var $temp =  $('#current').children('ul').children('.temp');
        var $wind =  $('#current').children('ul').children('.wind');
        var $humd =  $('#current').children('ul').children('.humd');
        var date = response.current.dt;
        var newDate = new Date(date*1000);
        $date.text(newDate.toDateString());

        var icon = response.current.weather[0].icon;
        $icon.attr('src','http://openweathermap.org/img/wn/'+icon+'@2x.png');
        $icon.attr('alt', response.current.weather[0].description);

        var temp = response.current.temp;
        $temp.text('Temp: '+ temp + ' °F ');

        var wind = response.current.wind_speed;
        $wind.text('Wind: ' + wind + ' MPH');

        var humd = response.current.humidity;
        $humd.text('Humidity: ' + humd + '%');

        //5day- forecast--------------------------------------------
        for(var i = 1; i < 6; i++)
        {
            var $date = $('#day' + i).children('.date');
            var $icon = $('#day' + i).children('ul').children('.icon').children('img');
            var $temp =  $('#day' + i).children('ul').children('.temp');
            var $wind =  $('#day' + i).children('ul').children('.wind');
            var $humd =  $('#day' + i).children('ul').children('.humd');
            
            var currData = response.daily[i];

            var date = currData.dt;
            var newDate = new Date(date*1000);
            $date.text(newDate.toDateString());

            var icon = currData.weather[0].icon;
            $icon.attr('src','http://openweathermap.org/img/wn/'+icon+'@2x.png');
            $icon.attr('alt', currData.weather[0].description);
            
            var temp = currData.temp.day;
            $temp.text('Temp: '+ temp + ' °F ');

            var wind = currData.wind_speed;
            $wind.text('Wind: ' + wind + ' MPH');

            var humd = currData.humidity;
            $humd.text('Humidity: ' + humd + '%');
        }
        
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
