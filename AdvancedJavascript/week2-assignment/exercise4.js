import fs from "fs";
import { teas } from "./teas.js";

function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    try {
      const updates = JSON.parse(data);

      const netChanges = updates.reduce((acc, update) => {
        if (!acc[update.teaId]) {
          acc[update.teaId] = 0;
        }
        acc[update.teaId] += update.change;
        return acc;
      }, {});

      const report = teas.map((tea) => {
        const change = netChanges[tea.id] || 0;
        const newStock = tea.stockCount + change;
        return {
          name: tea.name,
          was: tea.stockCount,
          change: change,
          now: newStock,
          note: newStock < 0 ? "(NEGATIVE!)" : "",
        };
      });

      callback(null, report);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }

  console.log("Inventory Report:");
  report.forEach((item) => {
    console.log(
      `- ${item.name}: was ${item.was}, change ${item.change >= 0 ? "+" : ""}${item.change}, now ${item.now} ${item.note}`,
    );
  });
});
