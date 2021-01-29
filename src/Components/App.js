import React from 'react';
import './App.scss';
import Forecast from './Forecast';
import { assetsPath } from '../rootDir';

const DemoComponent = () => (
  <div className="rootContainer">
    <Forecast />
    <img src={`${assetsPath}/28697240.png`} alt="asdas" style={{ height: '500px', width: '500px' }} />
  </div>
);

export default DemoComponent;
