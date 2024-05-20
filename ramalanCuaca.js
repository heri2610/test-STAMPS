const http = require('http');

function formatDate(dateString) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [year, month, day] = dateString.split('-');
  const monthName = months[parseInt(month) - 1];
  const date = new Date(year, month - 1, day);
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  return `${dayOfWeek}, ${day} ${monthName} ${year}`;
}

function getWeatherForecast() {
  const apiKey = '4322349a499ba18631bada272fc76404';
  const cityId = '1642907'; 
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`;

  const request = http.get(apiUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const forecasts = JSON.parse(data).list;

        const dailyTemperatures = {};
        forecasts.forEach(forecast => {
          const date = forecast.dt_txt.split(' ')[0]; 
          const temperature = forecast.main.temp; 
          if (!dailyTemperatures[date] || temperature > dailyTemperatures[date]) {
            dailyTemperatures[date] = temperature;
          }
        });

        console.log("Ramalan Cuaca Kota Jakarta untuk 5 Hari ke Depan:");
        Object.keys(dailyTemperatures).forEach(date => {
          const formattedDate = formatDate(date);
          console.log(`${formattedDate} : ${dailyTemperatures[date]}°C`);
        });

      } catch (error) {
        console.error('Error parsing weather forecast data:', error);
      }
    });
  });

  request.on('error', (error) => {
    console.error('Error fetching weather forecast:', error);
  });
}

getWeatherForecast();
