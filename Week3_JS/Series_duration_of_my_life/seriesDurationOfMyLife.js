const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
  {
  title: "Peppa Pig",
  days: 0,
  hours: 5,
  minutes: 0,
},
{
  title: "The Big Bang theory",
  days: 7,
  hours: 5,
  minutes: 30,
}
];

function logOutSeriesText() {
  let totalPercentage = 0;
  for (let i = 0; i < seriesDurations.length; i++) {
    let total =
      seriesDurations[i].days * 24 +
      seriesDurations[i].hours +
      seriesDurations[i].minutes / 60;

    let totAvgLifeSpanInYears = 80 * 365 * 24;
    let percentage = (total / totAvgLifeSpanInYears) * 100;
    let fixedPercentage = percentage.toFixed(3) + "%";
    totalPercentage += percentage;
    console.log(
      `${seriesDurations[i].title} took ${fixedPercentage} of my life`
    );
  }
  console.log(`In total that is ${totalPercentage.toFixed(3)}% of my life`);
}
let resultText = logOutSeriesText();
console.log(resultText);
