import { teas } from "./teas.js";

function teasByOrigin(teas) {
  const grouped = {};

  teas.forEach((tea) => {
    if (!grouped[tea.origin]) {
      grouped[tea.origin] = [];
    }

    grouped[tea.origin].push(tea.name);
  });

  return grouped;
}

console.log(teasByOrigin(teas));
