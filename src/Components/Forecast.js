import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import axios from 'axios';
import '../styles/forecast.scss';
import CurrentWeather from './CurrentWeather';
import { assetsPath } from '../rootDir';

const Forecast = () => {
  const [data, setData] = useState(null);

  const getShortDayName = (date) => {
    const isToday = new Date(date * 1000).getDate() === new Date().getDate();
    if (isToday) return 'Today';
    return format(new Date(date * 1000), 'E');
  };

  useEffect(() => {
    axios.get('http://api.openweathermap.org/data/2.5/onecall?lat=51.584870&lon=-0.280060&exclude=minutely&appid=811ade084421edfd4e2b8331ba00e291&units=metric')
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const dailyForecast = data && data.daily.slice(0, 7);
  return (
    <div className="forecast">
      <CurrentWeather data={data} />
      {
      dailyForecast && dailyForecast.map((day) => (
        <div key={day.dt} className="forecast__day">
          <span className="day__left-section">
            { getShortDayName(day.dt) }
          </span>
          <div className="day__right-section">
            <span style={{ padding: '0 10px' }}>
              <span>{day.temp.min.toFixed()}°</span> - <span>{day.temp.max.toFixed()}°</span>
            </span>
            <img src={`${assetsPath}/${day.weather[0].icon}.png`} alt={day.weather[0].icon} style={{ width: '40px', height: '40px' }} />
          </div>
        </div>
      ))
}
    </div>
  );
};

export default Forecast;
