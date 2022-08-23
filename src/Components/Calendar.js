import React, { useEffect, useState } from 'react';
import '../styles/calendar.scss';
import bankHolidaysCalendarEvents from '../data/bankHolidaysCalendarEvents.json' 
import ePaperCalendarEvents from '../data/ePaperCalendarEvents.json' 
import { getDatesInRange, removeSameDateDuplicates } from '../utils';
import { format, isSameDay, isToday } from 'date-fns';

const removeCalendarEventsDuplications = (calendarEvents) => {
  const calendarEventsWithoutDuplicates = calendarEvents.reduce((acc, event) => {
    const isSameSummary = acc.find(({ summary }) => summary === event.summary);
    if (!isSameSummary) return [...acc, event]
    return acc;
  }, [])
  return calendarEventsWithoutDuplicates;
}

const calendarEvents = removeCalendarEventsDuplications([...bankHolidaysCalendarEvents, ...ePaperCalendarEvents])
.sort((a,b) => new Date(b.start.date) - new Date(a.start.date))


var days = removeSameDateDuplicates(calendarEvents.reduce((acc, event) => {
  const { start, end } = event;
  const dates = getDatesInRange(new Date(start.date || start.dateTime), new Date(end.date || end.dateTime));
  return [...acc, ...dates];
},[])).sort((a,b) => new Date(b) - new Date(a)).reverse();

const daysWithEvents = days.map(day => {
  const events = calendarEvents.filter(({ start, end }) => {
    const startDate = new Date(start.date || start.dateTime);
    const endDate = new Date(end.date || end.dateTime);
    return (startDate <= day && endDate >= day) || (isSameDay(day, startDate) || isSameDay(day, endDate));
  } );
  return { day, events };
})

const Calendar = () => {


  return (
    <div className="container">
      {
        daysWithEvents.map(({ day, events }) => (
          <div key={day} className="day-container">
              <div className='day'>
                {isToday(day) ? 
                <span className='today'>Today<span className='today-date'>{format(day, 'do')}</span></span> : 
                format(day, 'do LLL yyyy')}
              </div>
              <div className='event-container'>
                {events.map(event => 
                <div className='event'>{event.summary} 
                  {event.start.dateTime && <span> at <span className='event-time'>{format(new Date(event.start.dateTime), 'H:mm')}</span></span>}
                </div>)}
              </div>
            </div>
        ))
      }
    </div>
  );
};

export default Calendar;
