const btnElement = document.getElementById("btn");
const inputElement = document.getElementById("name");
const resultElement = document.getElementById("result");
const houseImageElement = document.getElementById("houseImage");

houseImageElement.style.visibility = "hidden";
btnElement.addEventListener("click", hogwartsHouseGenerator);

function hogwartsHouseGenerator() {
  const name = inputElement.value;
  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const randomIndex = Math.floor(Math.random() * houses.length);
  const chosenHouse = houses[randomIndex];
  if (name.trim() === "") {
    houseImageElement.style.visibility = "hidden";
    resultElement.innerHTML = "Please enter a name.";
    houseImageElement.src = "";

    btnElement.value = "Try Again";
    return;
  }

  resultElement.innerHTML = `${name} belongs in ${chosenHouse}`;
  houseImageElement.style.visibility = "visible";
  if (chosenHouse === "Gryffindor") {
    houseImageElement.src = "images/gryffindor.jpg";
  } else if (chosenHouse === "Hufflepuff") {
    houseImageElement.src = "images/hufflepuff.jpg";
  } else if (chosenHouse === "Ravenclaw") {
    houseImageElement.src = "images/ravenclaw.jpg";
  } else if (chosenHouse === "Slytherin") {
    houseImageElement.src = "images/slytherin.jpg";
  }

  btnElement.value = "Try Again";
}
