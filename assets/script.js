
var key = 'c8502ebcdb7a83fd03a62d0aaaafa07c';
var city = 'https://api.openweathermap.org/data/2.5/weather?q=Houston,Texas&appid='+ key;
//var location = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid='+key;
getApi();

function getApi() 
{
  
    fetch(city)
      .then(function (response) 
      {
        return response.json();
      })
      .then(function (data) 
      {
        console.log(data);
      });
}