import React from 'react';
import '../styles/lastUpdate.scss';
import { assetsPath } from '../rootDir';

const LastUpdate = () => (
  <div className="last-update">
    <img src="https://cdn.iconscout.com/icon/free/png-256/update-autorenew-refresh-reload-31805.png" alt="Update Icon" width="35" />
    <span>
      {new Date().toLocaleString()}
    </span>
    <div>
      <img src={`${assetsPath}/heart.png`} style={{ marginTop: '150px', width: '210px' }} alt="kurwa" />
    </div>
  </div>
);

export default LastUpdate;
