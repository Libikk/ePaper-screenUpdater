import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import axios from 'axios';
import '../styles/forecast.scss';

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
      {
      dailyForecast && dailyForecast.map((day) => (
        <div key={day.dt} className="forecast__day">
          <div className="day__left-section">
            { getShortDayName(day.dt) }
          </div>
          <div className="day__right-section">
            <span style={{ marginLeft: '10px' }}>
              <span>{day.temp.min.toFixed()}°</span> - <span>{day.temp.max.toFixed()}°</span>
            </span>
            <span style={{ marginLeft: '10px' }}>
              <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].icon} style={{ width: '30px', height: '30px' }} />
            </span>
          </div>
        </div>
      ))
}
    </div>
  );
};

export default Forecast;
