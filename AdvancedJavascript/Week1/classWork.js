import { teas } from "./teas.js";

//Part1-forEach

//Exercise1
teas.map(function (tea) {
  console.log(`${tea.name}`);
  return tea.name;
});

//Exercise 2
teas.map(function (tea) {
  const displayName = `${tea.name} (${tea.origin})`;
  console.log(displayName);
  return displayName;
});

//Exercise 3

let count = 0;
teas.forEach(function (tea) {
  if (tea.organic) {
    count++;
  }
});
console.log(count);

let count2 = 0;
teas
  .filter(function (tea) {
    return tea.organic;
  })
  .forEach(function (tea) {
    count2++;
  });
console.log(count2);

//Part2-map

//Exercise 4

const teaNames = teas.map(function (tea) {
  return tea.name;
});
console.log(teaNames);

//Price Calculation

function priceCalculation(tea) {
  const price = Math.round(tea.pricePerGram * 100);
  return { ...tea, price };
}

//Exercise 5
const teaWithPrice = teas.map(priceCalculation);
console.log(teaWithPrice);

//Exercise 6

const teaDisplayWithPrice = teas.map(priceCalculation).map(function (tea) {
  return `${tea.name}- ${tea.price} DKK/100g`;
});
console.log(teaDisplayWithPrice);

//Part 3-filter

//Exercise 7

const organicTeas = teas.filter(function (tea) {
  return tea.organic;
});
console.log(
  organicTeas.map(function (tea) {
    return tea.name;
  }),
);

console.log(organicTeas);

//Exercise 8

const teasFromJapan = teas.filter(function (tea) {
  return tea.origin === "Japan";
});
console.log(teasFromJapan);

//Exercise 9

const teasWithHighCaffeine = teas.filter(function (tea) {
  return tea.caffeineLevel === "high";
});
console.log(teasWithHighCaffeine);

console.log(teasWithHighCaffeine.map((teaName) => teaName.name));

//Exercise 10

const teasWithStockAndOrganic = teas.filter(function (tea) {
  return tea.inStock && tea.organic;
});
console.log(teasWithStockAndOrganic);

console.log(teasWithStockAndOrganic.map((tea) => tea.name));

//Part 4- Combining Methods

//Exercise 11

const greenTeas = teas
  .filter(function (tea) {
    return tea.type === "green";
  })
  .map(function (tea) {
    return tea.name;
  });

console.log(greenTeas);

//Exercise 12

const displayOrganicTeasWithPrice = teas
  .filter(function (tea) {
    return tea.organic;
  })
  .map(function (tea) {
    const organicTeaPrice = Math.round(tea.pricePerGram * 100);
    return `${tea.name}-${organicTeaPrice} DKK/100g`;
  });
console.log(displayOrganicTeasWithPrice);

//Exercise 13

const sortJapaneseTeasByPrice = teas
  .filter(function (tea) {
    return tea.origin === "Japan";
  })
  .map(priceCalculation)
  .sort(function (a, b) {
    return a.price - b.price;
  })
  .map(function (tea) {
    return tea.price;
  });
console.log(sortJapaneseTeasByPrice);

//Part 5 - Arrow Functions

//Exercise 14-forEach

teas.forEach((tea) => {
  console.log(tea.name);
});

teas.forEach((tea) => {
  console.log(`${tea.name}- (${tea.origin})`);
});

let countValue = 0;
teas.forEach((tea) => {
  if (tea.organic) {
    countValue++;
  }
});
console.log("OrganicCount:", countValue);

//Exercise 15 - Arrow Functions -map

const teaNameValues = teas.map((tea) => tea.name);
console.log(`Tea Names: ${teaNameValues}`);

const teaPriceValues = teaWithPrice.map((tea) => tea.price);
console.log(`Tea Prices: ${teaPriceValues}`);

//Implicit return (NO curly braces)
console.log(
  teas.map(
    (tea) => `${tea.name} - ${Math.round(tea.pricePerGram * 100)} DKK/100g`,
  ),
);

//Explicit return (WITH curly braces)
console.log(
  teas.map((tea) => {
    return `${tea.name} - ${Math.round(tea.pricePerGram * 100)} DKK/100g`;
  }),
);

//Part 6: Challenge

//Exercise 17

function filterTeas(teas, criteria) {
  return teas
    .filter((tea) => {
      for (const key in criteria) {
        if (tea[key] !== criteria[key]) {
          return false;
        }
      }

      return true;
    })
    .map((tea) => tea.name);
}

//Output logs-Exercise 17
console.log("Organic Teas: ", filterTeas(teas, { organic: true }));

console.log("Japanese Teas: ", filterTeas(teas, { origin: "Japan" }));

console.log(
  "Organic Japanese Teas: ",
  filterTeas(teas, { organic: true, origin: "Japan" }),
);

console.log(
  "Green In-Stock Teas: ",
  filterTeas(teas, { type: "green", inStock: true }),
);
