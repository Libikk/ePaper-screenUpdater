import React from 'react';
import '../styles/currentWeather.scss';
import format from 'date-fns/format';
import { assetsPath } from '../rootDir';

const CurrentWeather = (data) => {
  if (!data.data) return 1;

  const getTime = (date) => format(new Date(date * 1000), 'kk:mm');
  const current = data?.data?.current;

  return (
    <div className="current">
      <div className="current_temp">
        {current?.temp.toFixed()}°
      </div>
      <div className="current_additional-details">
        <div className="additional-details-element">
          <span>{current.humidity}</span><img src={`${assetsPath}/humidity.png`} alt="kurwa" style={{ width: '26px', height: '26px' }} />
        </div>
        <div className="additional-details-element">
          <span>{Number(current.wind_speed).toFixed()}m/s</span><img src={`${assetsPath}/wind.png`} alt="kurwa" style={{ width: '30px', height: '30px' }} />
        </div>

        <div className="additional-details-element">
          <span>{current.pressure}hPa</span>
        </div>
      </div>
      <div className="current_sunrise-sunset">
        {getTime(current?.sunrise)}
        <img src={`${assetsPath}/50d.png`} alt="kurwa" />
        {getTime(current?.sunset)}
      </div>
    </div>
  );
};

export default CurrentWeather;
