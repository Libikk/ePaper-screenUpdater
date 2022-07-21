import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Thermometer from 'react-thermometer-component';
import '../styles/homeAssistant.scss';
import { assetsPath } from '../rootDir';

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_HOME_ASSISTANT_TOKEN}`,
};
const homeAssistantUrl = process.env.REACT_APP_HOME_ASSISTANT_URL
const HomeAssistant = () => {
  const [currentRoomTemp, setCurrentRoomTemp] = useState(null);
  const [currentRoomHumidity, setCurrentRoomHumidity] = useState(null);
  const getTemp = () => {
    axios.get(`${homeAssistantUrl}/api/states/sensor.kitchen_temperature_2`, { headers })
      .then(({ data }) => {
        setCurrentRoomTemp(Number(data.state).toFixed());
      })
      .catch(console.error);

    axios.get(`${homeAssistantUrl}/api/states/sensor.kitchen_humidity_2`, { headers })
      .then(({ data }) => {
        setCurrentRoomHumidity(data.state);
      })
      .catch(console.error);
  };
  useEffect(() => {
    getTemp();
  });
  return (
    <div className="home-assistant-container">
      <p>
        <span>{currentRoomHumidity}</span><img src={`${assetsPath}/humidity.png`} alt="kurwa" style={{ width: '40px', height: '40px' }} />
      </p>
      <Thermometer
        theme="light"
        value={currentRoomTemp}
        max="40"
        steps="4"
        format="°C"
        size="large"
        height="400"
      />
    </div>
  );
};

export default HomeAssistant;
