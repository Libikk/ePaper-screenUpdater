import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';

const DemoComponent = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('http://api.openweathermap.org/data/2.5/onecall?lat=51.584870&lon=-0.280060&exclude=minutely&appid=811ade084421edfd4e2b8331ba00e291&units=metric')
      .then((res) => {
        console.log('🚀 ~ file: App.js ~ line 9 ~ useEffect ~ res', res);
        setData(res.data);
      });
  }, []);

  return (
    <div className="rootContainer">
      Data:
      {/* {data && JSON.stringify(data)} */}
      {
        data && data.daily.map((day) => (
          <div key={day.dt} style={{ display: 'flex', flexDirection: 'row', fontSize: '20px', fontWeight: 'bold' }}>
            <span>
              { (day.sunrise) }
            </span>
            <span style={{ marginLeft: '10px' }}>
              Temp:
              {' '}
              { day.temp.day }
            </span>
            <span style={{ marginLeft: '10px' }}>
              Weather:
              {' '}
              { day.weather[0].main }
            </span>
          </div>
        ))
                  }
    </div>
  );
};

export default DemoComponent;
