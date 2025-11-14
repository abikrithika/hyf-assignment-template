// Formal fullname

function getFullName(firstName, surname, useFormalName, gender) {
  if (!firstName || !surname) {
    return "Please provide the both firstname and surname";
  }
  if (useFormalName) {
    if (gender === "male") {
      return "Lord" + " " + firstName + " " + surname;
    } else if (gender === "female") {
      return "Lady" + " " + firstName + " " + surname;
    }
  }

  return firstName + " " + surname;
}

console.log(getFullName("Benjamin", "Hughes", true, "male"));
console.log(getFullName("Abirame", "Ramachandran", true, "female"));
console.log(getFullName("Benjamin", "Hughes"));
console.log(getFullName("", "Hughes"));
console.log(getFullName("Benjamin", ""));
