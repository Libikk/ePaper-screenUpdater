function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
  
    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
 }

 const removeSameDateDuplicates = (array) => {
    const isSameDay = (dateA, dateB) => dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDate() === dateB.getDate();
    const uniqueDates = array.filter((date, index) => !array.some((date2, index2) => index2 > index && isSameDay(date, date2)));
    return uniqueDates
 }
  
module.exports = {
    removeSameDateDuplicates,
    getDatesInRange
}