let activities = [];

const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();
const formattedDate = `${day}/${month}-${year}`;
console.log(formattedDate);

function addActivity(activity, duration, category) {
  activities.push({
    Date: formattedDate,
    Activity: activity,
    Duration: duration,
    Category: category,
  });
}
addActivity("Youtube", 15, "Entertainment");
addActivity("Facebook", 25, "Social Media");
addActivity("Instagram", 20, "Entertainment");
addActivity("LinkedIn", 30, "Job Search");
addActivity("Email", 20, "Check Email");
addActivity("Twitter", 20, "Social Media");

console.log(activities);

function showStatus() {
  const setLimitForScreenTime = 30;
  let sum = 0;
  if (activities.length === 0) {
    console.log("Add some activities before calling showStatus");
  } else {
    for (let i = 0; i < activities.length; i++) {
      sum += activities[i].Duration;
      if (sum > setLimitForScreenTime) {
        console.log(
          "You have reached your limit, no more smart phoning for you!"
        );
      }
    }

    console.log(
      `You have added ${activities.length} activities. They amount to ${sum} min of usage `
    );
  }
}
showStatus();

// Finding the time spent for each category
let categoryTimes = {};
function showCategoryTime() {
  for (let i = 0; i < activities.length; i++) {
    const activityValue = activities[i];

    if (!categoryTimes[activityValue.Category]) {
      categoryTimes[activityValue.Category] = 0;
    }
    categoryTimes[activityValue.Category] += activityValue.Duration;
  }
  const categoriesKeys = Object.keys(categoryTimes);

  console.log("Time spent per category:");
  for (let i = 0; i < categoriesKeys.length; i++) {
    const categories = categoriesKeys[i];

    const timeSpent = categoryTimes[categories];
    console.log(`${categories}: ${timeSpent} minutes`);
  }
}
showCategoryTime();

// Calculate the time for the user spent mostly on

function timeSpentMostlyOn() {
  let valuesOfTimeSpentByCategory = Object.values(categoryTimes);
  console.log(valuesOfTimeSpentByCategory);
  let findMaxTimeSpent = Math.max(...valuesOfTimeSpentByCategory);
  let category;
  for (let i = 0; i < valuesOfTimeSpentByCategory.length; i++) {
    if (valuesOfTimeSpentByCategory[i] === findMaxTimeSpent) {
      category = Object.keys(categoryTimes)[i];
    }
  }
  console.log(
    `You spent the most time on: ${category} with ${findMaxTimeSpent} minutes`
  );
}
timeSpentMostlyOn();
