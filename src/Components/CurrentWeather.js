import React from 'react';
import '../styles/currentWeather.scss';
import format from 'date-fns/format';
import { assetsPath } from '../rootDir';

const CurrentWeather = (data) => {
  if (!data.data) return 1;

  const getTime = (date) => format(new Date(date * 1000), 'k:m');
  const current = data?.data?.current;
  console.log('🚀 ~ file: CurrentWeather.js ~ line 10 ~ CurrentWeather ~ current', current);

  return (
    <div className="current">
      <div className="current_temp">
        {current?.temp.toFixed()}°
      </div>
      <div className="current_additional-details">
        <span />
        <span>{current.wind_speed}m/s</span>
        <span />
      </div>
      <div className="current_sunrise-sunset">
        {getTime(current?.sunrise)}
        <img src={`${assetsPath}/50d.png`} alt="kurwa" style={{ width: '30px', height: '30px' }} />
        {getTime(current?.sunset)}
      </div>
    </div>
  );
};

export default CurrentWeather;
