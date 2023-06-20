
var key = 'c8502ebcdb7a83fd03a62d0aaaafa07c';
var coordURL = 'https://api.openweathermap.org/data/2.5/weather?q=Houston,Texas&appid='+ key;

var lat, lon;

coord = getCoord();
console.log(coord  );
function getCoord()
{
    var coord = {lat: lat, lon: lon};
    $.ajax(
    {
        url: coordURL,
        type: "POST",
        data: JSON.stringify(coord),
        success: function(response)
        {
            
        },
        error: function(error)
        {
            console.log(error)
        }
            
    })
    .then(function (response)
    {
        console.log(response);
    });
    console.log(coord  );
 }

    // console.log('lat city: '+ lat);
// console.log('lon city: '+ lon);
// function getApi() 
// {
//     //get the city's latitude and longitude
//     return fetch(coordURL)
//       .then(function (response) 
//       {
//         return response.json();
//       })
//       .then(function (data) 
//       {
//         console.log(data);
//         return data.coord;
        
//       });
    
// }

//   lat = data.coord.lat;
    // lon = data.coord.lon;

    // get the city's weather info
    // var  cityURL = 'https://api.openweathermap.org/data/2.5/weather?lat='
    //                 + lat + '&lon='+ lon +'&appid='+ key;
    
    // fetch(cityURL)
    //   .then(function (response) 
    //   {
    //     return response.json();
    //   })
    //   .then(function (data) 
    //   {
    //     console.log(data);
        
    //   })