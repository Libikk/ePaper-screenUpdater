import React from 'react';
import './App.scss';
import Forecast from './Forecast';
import TflStatus from './tflStatus';

const DemoComponent = () => (
  <div className="rootContainer">
    <Forecast />
    <TflStatus />
  </div>
);

export default DemoComponent;
