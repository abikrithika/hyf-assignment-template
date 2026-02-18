//Event Application
function getEventWeekday(daysFromToday) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  console.log(today);

  const dayIndex = today.getDay();
  console.log(dayIndex);

  const eventDayIndex = (dayIndex + daysFromToday) % 7;
  return weekDays[eventDayIndex];
}

console.log("Event day is : " + getEventWeekday(6));
