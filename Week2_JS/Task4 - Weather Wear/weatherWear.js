//Weather Wear
function weatherWear(temperature) {
  if (temperature <= 10) {
    return "Snow Jackets,Heavy cloths,Winter boots,gloves";
  } else if (temperature >= 20) {
    return "Shorts and T-Shirts";
  } else {
    return "Sweater or light jacket";
  }
}
const clothsToWear = weatherWear(16);
console.log(clothsToWear);
