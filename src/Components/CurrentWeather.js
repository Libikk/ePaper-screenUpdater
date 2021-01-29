import React from 'react';
import '../styles/currentWeather.scss';
import format from 'date-fns/format';

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
      <div className="current_sunrise-sunset">
        {getTime(current?.sunrise)}  -  {getTime(current?.sunset)}
      </div>
    </div>
  );
};

export default CurrentWeather;
