import React, { useEffect, useState } from 'react';
import '../styles/tflStatus.scss';
import bankHolidaysCalendarEvents from '../data/bankHolidaysCalendarEvents.json' 
import ePaperCalendarEvents from '../data/ePaperCalendarEvents.json' 
import { getDatesInRange, removeSameDateDuplicates } from '../utils';

const calendarEvents = [...bankHolidaysCalendarEvents, ...ePaperCalendarEvents]
.sort((a,b) => new Date(b.start.date) - new Date(a.start.date));

var days = calendarEvents.reduce((acc, event) => {
  const { start, end } = event;
  const dates = getDatesInRange(new Date(start.date || start.dateTime), new Date(end.date || end.dateTime));
  return [...acc, ...dates];
},[])
console.log("🚀 ~ file: Calendar.js ~ line 15 ~ days ~ days", removeSameDateDuplicates(days))
console.log("🚀 ~ file: Calendar.js ~ line 8 ~ calendarEvents", calendarEvents.map(({ start, end }) => ({ start: start.date || start.dateTime, end: end.date || end.dateTime })))
console.log("🚀 ~ file: Calendar.js ~ line 17 ~ calendarEvents", calendarEvents)


// assign each date to an array of events

const Calendar = () => {


  return (
    <div className="tflstatuses">
      {
          // statuses.map((singleStatus) => {
          //   const lineData = tflData.find(({ id }) => id === singleStatus.key);
          //   const statusDescription = lineData.lineStatuses[0].statusSeverityDescription;
          //   return (
          //     <div className="tflstatuses__status" key={singleStatus.key}>
          //       <div className="status__name">{lineData.name}</div>
          //       <div className="status__description">{statusDescription}</div>
          //     </div>
          //   );
          // })
      }
    </div>
  );
};

export default Calendar;
