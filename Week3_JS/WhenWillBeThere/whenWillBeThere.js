const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};
function arrivalTime(travelInformation) {

  const hoursInDecimal =
    travelInformation.destinationDistance / travelInformation.speed;

  const hours = Math.floor(hoursInDecimal);
  console.log("Hours in decimal: ", hoursInDecimal);

  console.log("Hours: ", hours);
  const minutes = Math.round((hoursInDecimal - hours) * 60);
  
  console.log("Minutes: ", minutes);

  return `${hours} hours and ${minutes} minutes`;
}
const travelTime = arrivalTime(travelInformation);
console.log(travelTime);
