import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/homeAssistant.scss";
import { assetsPath } from "../rootDir";

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_HOME_ASSISTANT_TOKEN}`,
};
const homeAssistantUrl = process.env.REACT_APP_HOME_ASSISTANT_URL;
const HomeAssistant = () => {
  const [temps, setTemps] = useState([]);

  const getValue = async (key) => {
    return axios
      .get(`${homeAssistantUrl}/api/states/sensor.${key}`, {
        headers,
      })
      .then(({ data }) => {
        return data.state;
      });
  };
  useEffect(() => {
    const getTemps = async () => {
      const temps = await Promise.all(
        tempsConfig.map(async (config) => {
          const temperatureValue = await getValue(config.temperatureKey);
          const humidityValue = await getValue(config.humidityKey);
          return {
            ...config,
            temperatureValue,
            humidityValue,
          };
        })
      ).catch((err) => console.error(err));
      setTemps(temps);
    };
    getTemps();
  });
  const sortedTemperaturesByTemperature = temps.sort(
    (a, b) => a.temperatureValue - b.temperatureValue
  );
  return (
    <div className="home-assistant-container">
      {sortedTemperaturesByTemperature.map((temp) => (
        <div key={temp.label} className="home-assistant-temperature">
          <div className="home-assistant-temperature__label">{temp.label}</div>
          <div className="home-assistant-temperature__value">
            {Number(temp.temperatureValue) ? `${temp.temperatureValue}°C` : "-"}
          </div>
          <div className="home-assistant-temperature__value">
            {Number(temp.humidityValue) ? `${temp.humidityValue}%` : "-"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeAssistant;

const tempsConfig = [
  {
    label: "Bedroom",
    temperatureKey: "bedroom_temperature",
    temperatureValue: "",
    humidityKey: "bedroom_humidity",
    humidityValue: "",
  },
  {
    label: "Kitchen",
    temperatureKey: "kitchen_temperature_2",
    temperatureValue: "",
    humidityKey: "kitchen_humidity_2",
    humidityValue: "",
  },
  {
    label: "Loft",
    temperatureKey: "loft_temperature",
    temperatureValue: "",
    humidityKey: "loft_humidity",
    humidityValue: "",
  },
  {
    label: "Bathroom",
    temperatureKey: "bathroom_temperature",
    temperatureValue: "",
    humidityKey: "bathroom_humidity",
    humidityValue: "",
  },
  {
    label: "Garden room",
    temperatureKey: "garden_room_temperature",
    temperatureValue: "",
    humidityKey: "garden_room_humidity",
    humidityValue: "",
  },
];
