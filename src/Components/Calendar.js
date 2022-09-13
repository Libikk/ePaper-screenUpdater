import React from 'react';
import '../styles/calendar.scss';
import bankHolidaysCalendarEvents from '../data/bankHolidaysCalendarEvents.json' 
import ePaperCalendarEvents from '../data/ePaperCalendarEvents.json' 
import { getDatesInRange, removeSameDateDuplicates } from '../utils';
import { format, isBefore, isSameDay, isToday } from 'date-fns';

const removeCalendarEventsDuplications = (calendarEvents) => {
  const calendarEventsWithoutDuplicates = calendarEvents.reduce((acc, event) => {
    const isSameSummary = acc.find(({ summary }) => summary === event.summary);
    if (!isSameSummary) return [...acc, event]
    return acc;
  }, [])
  return calendarEventsWithoutDuplicates;
}

const getEventsFromToday = (calendarEvents) => {
  const today = new Date();
  const eventsFromToday = calendarEvents.filter(({ day }) =>  isBefore(today, day));
  return eventsFromToday;
}

const calendarEvents = removeCalendarEventsDuplications([...bankHolidaysCalendarEvents, ...ePaperCalendarEvents])
.sort((a,b) => new Date(b.start.date) - new Date(a.start.date))


var days = removeSameDateDuplicates(calendarEvents.reduce((acc, event) => {
  const { start, end } = event;
  const dates = getDatesInRange(new Date(start.date || start.dateTime), new Date(end.date || end.dateTime));
  return [...acc, ...dates];
},[])).sort((a,b) => new Date(b) - new Date(a)).reverse();

const daysWithEvents = getEventsFromToday(days.map(day => {
  const events = calendarEvents.filter(({ start, end }) => {
    const startDate = new Date(start.date || start.dateTime);
    const endDate = new Date(end.date || end.dateTime);
    return (startDate <= day && endDate >= day) || (isSameDay(day, startDate) || isSameDay(day, endDate));
  } );
  return { day, events };
}))
console.log("🚀 ~ file: Calendar.js ~ line 43 ~ daysWithEvents ~ daysWithEvents", daysWithEvents)

const Calendar = () => {


  return (
    <div className="container">
      <div className='icon-container'>
        <svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      </div>
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
                <div className='event' key={event.summary}>{event.summary} 
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
