//Task 1 - Age-ify (A future age calculator)

const yearOfBirth = 1988;
const yearFuture = 2027;
const ageInFuture = yearFuture - yearOfBirth;

console.log(`You will be ${ageInFuture} years old in ${yearFuture}.`);

//Task 2 - Goodboy-Oldboy (A dog age calculator)

const dogYearOfBirth = 2017;
const dogYearFuture = 2027;
const dogYear = dogYearFuture - dogYearOfBirth;

const shouldShowResultInDogYears = true;
if (shouldShowResultInDogYears) {
  const ageInDogYears = dogYear * 7;
  console.log(
    `Your dog will be ${ageInDogYears} dog years old in ${dogYearFuture}.`
  );
} else {
  console.log(
    `Your dog will be ${dogYear} human years old in ${dogYearFuture}.`
  );
}

//Task 3 - Housey pricey (A house price estimator)

// Function to calculate the house price and compare with estimated cost

function checkHousePrice(
  name,
  width,
  depth,
  height,
  gardenSize,
  estimatedCost
) {
  // Calculate the actual price
  const actualPrice = width * depth * height * 2.5 * 1000 + gardenSize * 300;

  // Compare estimated vs actual and print result
  if (estimatedCost < actualPrice) {
    console.log(`${name} is paying too much for the house.`);
  } else {
    console.log(`${name} is paying too little for the house.`);
  }
}

// Call the function for Peter
checkHousePrice("Peter", 8, 10, 10, 100, 2500000);

// Call the function for Julia
checkHousePrice("Julia", 5, 11, 8, 70, 1000000);

//Task 4 - Ez Namey (Startup name generator)

const firstWords = [
  "Easy",
  "Awesome",
  "Corporate",
  "Super",
  "Bright",
  "Next",
  "Creative",
  "Tech",
  "Smart",
  "Happy",
];
const secondWords = [
  "Solutions",
  "Corp",
  "Labs",
  "Studios",
  "Works",
  "Systems",
  "Innovations",
  "Ventures",
  "Hub",
  "Factory",
];

const randomIndex1 = Math.floor(Math.random() * firstWords.length);
const randomIndex2 = Math.floor(Math.random() * secondWords.length);

const startupName = `${firstWords[randomIndex1]} ${secondWords[randomIndex2]}`;
const nameLength = startupName.length;

console.log(`The startup: "${startupName}" contains ${nameLength} characters.`);
