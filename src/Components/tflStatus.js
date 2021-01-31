import React, { useEffect, useState } from 'react';
import '../styles/tflStatus.scss';
import axios from 'axios';
import { assetsPath } from '../rootDir';

const TflStatus = () => {
  const [tflData, setTflData] = useState(null);

  const getTflStatus = () => axios.get('https://api.tfl.gov.uk/line/mode/tube/status').then((r) => setTflData(r.data));

  useEffect(() => {
    getTflStatus();
  }, []);

  if (!tflData) return <div />;

  const statuses = [
    { key: 'jubilee' },
    { key: 'metropolitan' },
  ];

  return (
    <div className="tflstatuses">
      <div className="tflstatuses-title">
        <img src={`${assetsPath}/TFL-logo.png`} alt="kurwa" />
      </div>
      {
          statuses.map((singleStatus) => {
            const lineData = tflData.find(({ id }) => id === singleStatus.key);
            const statusDescription = lineData.lineStatuses[0].statusSeverityDescription;
            return (
              <div className="tflstatuses__status" key={singleStatus.key}>
                <div className="status__name">{lineData.name}</div>
                <div className="status__description">{statusDescription}</div>
              </div>
            );
          })
      }
    </div>
  );
};

export default TflStatus;
