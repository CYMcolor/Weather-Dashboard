var key = 'c8502ebcdb7a83fd03a62d0aaaafa07c';
var city = 'Houston';
var $search = $('#search');
var $input = $('#input');

var saveCity = function(cty)
{
  this.city = cty;
}

$( function () 
{
    //display history that was shown inlocalstorage
    displayHistory();

    //if history was clicked on show results
    //for dynamic elements have to call the static parent and then on click to the 
    //actual thing that clciks
    $("#history").on("click",'.history-btn', function(event)
    {
        event.preventDefault();
        city = $(this).parent().attr('class');

        console.log("button pressed: "+ city);
        //call the api
        getCoordAPI(city);
        $(document).off("click");
        
    });

    //city searched thorugh search bar
    $search.submit( function(event)
    {

        event.preventDefault();
        //get city name
        city = $input.val();
        city = city.replace('+', ' ');
        //clear text area and give it a placeholder
        $input.val('');
        $input.attr('placeholder','enter city');

        //call the api
        getCoordAPI(city);
    });
    
});

function getCoordAPI(city)
{
    var coordURL = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+ key;
    $.ajax(
    {
        url: coordURL,
        method: "GET"
    })
    .then(function(response)
    {   
        //get city name
        var city = response.name;
        console.log(city);
        //get coordinates
        console.log(response);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        //show weather api
        getWeatherAPI(lat,lon, city);
        //stores the history
        storeHistory(response, city);        
    })
}

function getWeatherAPI(lat, lon, city)
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
        var $name = $('#current').children('.city-name');
        var $date = $('#current').children('.date');
        var $icon = $('#current').children('ul').children('.icon').children('img');
        var $temp =  $('#current').children('ul').children('.temp');
        var $wind =  $('#current').children('ul').children('.wind');
        var $humd =  $('#current').children('ul').children('.humd');

        $name.text(city);
    
        var date = response.current.dt;
        var newDate = new Date(date*1000);
        $date.text(newDate.toDateString());

        var icon = response.current.weather[0].icon;
        $icon.attr('src','http://openweathermap.org/img/wn/'+icon+'@2x.png');
        $icon.attr('alt', response.current.weather[0].description);
        $icon.attr('title', response.current.weather[0].description);

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
            $icon.attr('title', currData.weather[0].description);
            
            var temp = currData.temp.day;
            $temp.text('Temp: '+ temp + ' °F ');

            var wind = currData.wind_speed;
            $wind.text('Wind: ' + wind + ' MPH');

            var humd = currData.humidity;
            $humd.text('Humidity: ' + humd + '%');
        }
        
    })
}

function storeHistory(response, city)
{
    //store the city
    var history = [];
    if (localStorage.getItem('history') !== null) 
    {
        history = JSON.parse(localStorage.getItem("history"));
    }
    if (response.status !== 200) 
    {
        var newCity = new saveCity(city);
        //check if city already exists
        var replace = checkRepeat(history, city);
        
        //if there is a repeat remove it from the list from its previous postion
        if( replace !== false)
        {
            history.splice(replace, 1);
        }  
        //put current city to end of list   
        history.push(newCity);
        localStorage.setItem("history",JSON.stringify(history));
    }

    displayHistory();  

}

function checkRepeat(history, city)
{
    //checks if there is a repeat and send the index at repeat
    var ind;
    //console.log(JSON.stringify(history));
    for(var i = 0; i< history.length; i++)
    {
        if(history[i].city == city)
        {
            ind = i;
            return ind;
        }         
    }
    return false;
}

function displayHistory()
{
    var history = [];
    if (localStorage.getItem('history') !== null) 
    {
        history = JSON.parse(localStorage.getItem("history"));
    }
    //create buttons
    var $history = $("#history");
    //removes current list
    $history.children('ul').remove();
    //creates new list
    var $ul = $("<ul id= '#history-list'>");
    $history.append($ul);
    
    if (localStorage.getItem('history') !== null) 
    {
        //get history info
        history = JSON.parse(localStorage.getItem("history"));
        //loop until all the list is displayed as buttons
        //is in descending order so the latest item is on top
        for(i = history.length; i-- ; i>0)
        {
            //console.log(history[i]);
            var city = history[i].city;
            //make it so the the city replaces spaces with +, so the class can be read properly
            city = city.replace(/\s/g , "+");
            //console.log("new replace: " +city)
            var $li = $('<li class = '+ city+'>');
            var $btn = $('<button class = "history-btn btn btn-secondary">');
            $btn.text(history[i].city);
            $ul.append($li);
            $li.append($btn);
            
        }
        
    }
}
//css script------
function w3_open() 
{
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("#openNav").style.display = "none";
}
  
function w3_close() 
{
    document.getElementById("mySidebar").style.display = "none";
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
