import { format } from 'date-fns';
import React from 'react';
import '../styles/lastUpdate.scss';

const LastUpdate = () => (
  <div className="last-update">
    <span>
      {format(new Date(), 'kk:mm:ss MM/dd/yyyy')}
    </span>
  </div>
);

export default LastUpdate;
