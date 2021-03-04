import React, { useEffect, useState } from 'react';
import axios from 'axios';

const headers = {
  Authorization: `Bearer ${process.env.HOME_ASSISTANT_TOKEN}`,
};

const HomeAssistant = () => {
  const [currentRoomTemp, setCurrentRoomTemp] = useState(null);
  const [currentRoomHumidity, setCurrentRoomHumidity] = useState(null);
  const getTemp = () => {
    axios.get('http://homeassistant.local:8123/api/states/sensor.temperature', { headers })
      .then(({ data }) => {
        setCurrentRoomTemp(data.state);
      })
      .catch(console.error);

    axios.get('http://homeassistant.local:8123/api/states/sensor.humidity', { headers })
      .then(({ data }) => {
        setCurrentRoomHumidity(data.state);
      })
      .catch(console.error);
  };
  useEffect(() => {
    getTemp();
  });
  return (
    <div>
      <p>
        {currentRoomTemp}°C
      </p>
      <p>
        {currentRoomHumidity}%
      </p>
    </div>
  );
};

export default HomeAssistant;
