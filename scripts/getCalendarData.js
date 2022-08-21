const { google } = require('googleapis');
const fs = require('fs/promises')
require('dotenv').config();

const CREDENTIALS = {
    client_email: process.env.CLIENT_EMAIL,
    private_key: JSON.parse(`"${process.env.PRIVATE_KEY}"`)
}
  
const calendarId = process.env.CALENDAR_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        const response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
        });
    
        const items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};


const getAllEvents = async (start, end) => {
    try {
        const res = await getEvents(start, end);
        await fs.writeFile('./calendarEvents.json', JSON.stringify(res, null, 4))
        console.log(res)
    } catch (error) {
        console.log(error);
    }
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