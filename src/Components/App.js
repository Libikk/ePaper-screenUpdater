import React from 'react';
import './App.scss';
import Forecast from './Forecast';
import TflStatus from './tflStatus';
import LastUpdate from './LastUpdate';

const DemoComponent = () => {
  const setCssVars = ({ red, black }) => {
    const rootContainer = document.querySelector('.rootContainer');
    rootContainer.classList[red ? 'add' : 'remove']('red');
    rootContainer.classList[black ? 'add' : 'remove']('black');
  };

  return (
    <div>
      <div className="rootContainer red black">
        <Forecast />
        <TflStatus />
        <LastUpdate />
      </div>
      <button type="button" onClick={() => setCssVars({ red: true, black: false })}>red</button>
      <button type="button" onClick={() => setCssVars({ red: false, black: true })}>black</button>
      <button type="button" onClick={() => setCssVars({ red: false, black: false })}>both</button>
    </div>
  );
};

export default DemoComponent;
