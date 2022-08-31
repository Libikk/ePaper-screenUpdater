const { google } = require('googleapis');
const fs = require('fs/promises')
require('dotenv').config();

const CREDENTIALS = {
    client_email: process.env.CLIENT_EMAIL,
    private_key: JSON.parse(`"${process.env.PRIVATE_KEY}"`)
}
  
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const calendars = [
    { id: process.env.CALENDAR_ID_EPAPER, outputFileName: 'ePaperCalendarEvents.json' },
    { id: process.env.CALENDAR_ID_BANK_HOLIDAYS_GOV, outputFileName: 'bankHolidaysCalendarEvents.json' }
]

const getEvents = async (dateTimeStart, dateTimeEnd, calendarId) => {
console.log("🚀 ~ file: getCalendarData.js ~ line 26 ~ getEvents ~ dateTimeStart", dateTimeStart)

    try {
        const response = await calendar.events.list({
            
            auth: auth,
            calendarId,
            maxResults: 99,
            dateTimeStart: '2022-05-14T17:00:00.0000000',
            dateTimeEnd: '2023-05-14T17:00:00.0000000',
        });
    
        const items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};


const getAllEvents = async (start, end) => {
    calendars.forEach(async (calendar) => {
        try {
            const res = await getEvents(start, end, calendar.id);
            await fs.writeFile(`./src/data/${calendar.outputFileName}`, JSON.stringify(res, null, 4))
            res.forEach((event) => console.log(event.summary, event.start.date));
        } catch (error) {
            console.log(error);
        }
    })
}




const getRangeYearFromNow = () => {
    const setTime = (date, hours, minutes, seconds) => {
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
    };

    const startDate = new Date();
    setTime(startDate, 0, 0, 0);
    const endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1);
    setTime(endDate, 23, 59, 59);
    return { endDate, startDate };
};

const { endDate, startDate } = getRangeYearFromNow()
const start = startDate.toISOString()
const end = endDate.toISOString()



module.exports = {
    getAllEvents: () => getAllEvents(start, end)
}