const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

// Write some code here
//names.splice(1,1);
const index = names.indexOf(nameToRemove);
//console.log(names[index]);
if (index !== -1) {
  names.splice(index, 1);
} else {
  console.log("Names Not found in an array");
}
// Code done

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'Katrine', 'Tala']
