import { teas } from "./teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";
import { Customer } from "./exercise4.js";
import { Inventory } from "./exercise3.js";

class TeaCatalog {
  constructor(teasData) {
    this.teas = teasData.map(Tea.fromObject);
  }

  findTea(name) {
    return this.teas.find((t) => t.name === name);
  }
}

class TeaShop {
  constructor(teasData) {
    this.catalog = new TeaCatalog(teasData);
    this.inventory = new Inventory();

    teasData.forEach((teaObj) => {
      const tea = Tea.fromObject(teaObj);
      this.inventory.add(tea, teaObj.stockCount);
    });

    this.customers = [];
  }

  registerCustomer(name, email) {
    const customer = new Customer(name, email);
    this.customers.push(customer);
    return customer;
  }

  createOrder(customer, items) {
    const order = new Order();

    items.forEach(({ teaName, grams }) => {
      const tea = this.catalog.findTea(teaName);
      if (!tea) throw new Error(`Tea not found: ${teaName}`);
      if (this.inventory.getStock(teaName) < grams)
        throw new Error(`Insufficient stock for ${teaName}`);

      const orderItem = new OrderItem(tea, grams);
      order.addItem(orderItem);

      this.inventory.sell(teaName, grams);
    });

    customer.placeOrder(order);
    return order;
  }

  getReport() {
    const totalCustomers = this.customers.length;
    const totalOrders = this.customers.reduce(
      (sum, customer) => sum + customer.orders.length,
      0,
    );
    const totalRevenue = this.customers.reduce(
      (sum, customer) => sum + customer.totalSpent(),
      0,
    );
    const lowStockItems = this.inventory.getLowStock(50);

    return {
      totalCustomers,
      totalOrders,
      totalRevenue,
      lowStockItems,
    };
  }
}

const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

const order1 = shop.createOrder(alex, [
  { teaName: "Sencha", grams: 100 },
  { teaName: "Matcha", grams: 50 },
]);
console.log("Alex's Order:\n", order1.getSummary());

const order2 = shop.createOrder(maria, [{ teaName: "Earl Grey", grams: 200 }]);
console.log("Maria's Order:\n", order2.getSummary());

const report = shop.getReport();
console.log("\n--- Tea Shop Report ---");
console.log("Total customers:", report.totalCustomers);
console.log("Total orders:", report.totalOrders);
console.log("Total revenue:", report.totalRevenue.toFixed(2), "DKK");
console.log("Low stock items (<50g):");
report.lowStockItems.forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log("\nCustomer Totals:");
shop.customers.forEach((c) => {
  console.log(`${c.name} spent: ${c.totalSpent().toFixed(2)} DKK`);
});
