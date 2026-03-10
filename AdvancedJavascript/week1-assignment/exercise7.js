import { teas } from "./teas.js";

const countByType = teas.reduce((counts, tea) => {
  if (counts[tea.type]) {
    counts[tea.type]++;
  } else {
    counts[tea.type] = 1;
  }
  return counts;
}, {});

console.log(countByType);
