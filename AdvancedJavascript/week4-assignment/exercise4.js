import { teas } from "./teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";

class Customer {
  constructor(name, email) {
    if (!name || typeof name !== "string") {
      throw new Error("Name is required");
    }
    if (!email || typeof email !== "string") {
      throw new Error("Email is required");
    }

    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    if (!(order instanceof Order)) {
      throw new Error("Must place an Order");
    }

    order.status = "confirmed";
    this.orders.push(order);

    return order;
  }

  totalSpent() {
    return this.orders.reduce((total, order) => total + order.getTotal(), 0);
  }

  getOrderHistory() {
    const lines = [];

    lines.push(
      `${this.name} (${this.email}) - ${this.orders.length} order${this.orders.length !== 1 ? "s" : ""}`,
    );
    lines.push("");

    this.orders.forEach((order, index) => {
      lines.push(
        `Order ${index + 1} (${order.status}) - ${order.items.length} item${order.items.length !== 1 ? "s" : ""}`,
      );

      order.items.forEach((item) => {
        lines.push(`  ${item.describe()}`);
      });

      lines.push(`Total: ${order.getTotal().toFixed(2)} DKK`);
      lines.push("");
    });

    lines.push(`Lifetime total: ${this.totalSpent().toFixed(2)} DKK`);

    return lines.join("\n");
  }
}

const teaInstances = teas.map(Tea.fromObject);

const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100));
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50));
customer.placeOrder(order2);

console.log(customer.getOrderHistory());
console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");
