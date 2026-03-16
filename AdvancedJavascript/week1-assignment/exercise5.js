import { teas } from "./teas.js";

function searchTeas(teas, query) {
  const queryTeasLowerCase = query.toLowerCase();
  const filteredTeas = teas.filter((tea) =>
    tea.name.toLowerCase().includes(queryTeasLowerCase),
  );
  const teaNames = filteredTeas.map((tea) => tea.name);
  return teaNames.sort();
}

console.log(searchTeas(teas, "earl"));

console.log(searchTeas(teas, "dragon"));

console.log(searchTeas(teas, "ch"));
