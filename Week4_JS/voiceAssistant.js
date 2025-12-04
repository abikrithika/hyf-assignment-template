const user = {
  name: "",
  todos: []
};

function getReply(command) {
  // Validate input
  if (typeof command !== "string") return "Command must be a string.";
  if (!command.trim()) return "Empty commands are no bueno!";

  const lower = command.toLowerCase().trim();

  // ===========================
  // My name is ...
  // ===========================
  if (lower.startsWith("my name is")) {
    const name = command.slice("my name is".length).trim();

    if (!name) return "I didn't catch your name.";

    if (user.name && user.name === name.toLowerCase()) {
      return `You already introduced yourself as ${name}`;
    }

    user.name = name.toLowerCase();
    return `Nice to meet you ${name}`;
  }

  // ===========================
  // What is my name?
  // ===========================
  if (lower === "what is my name?" || lower === "what is my name") {
    return user.name
      ? `Your name is ${user.name}`
      : "You haven’t told me your name yet.";
  }

  // ===========================
  // Add to my todo
  // ===========================
  if (lower.startsWith("add") && lower.includes("to my todo")) {
    const item = command
      .slice(command.toLowerCase().indexOf("add") + 3, command.toLowerCase().indexOf("to my todo"))
      .trim();

    if (!item) return "I can't add an empty todo.";

    user.todos.push(item);

    return `${item} added to your todo.`;
  }

  // ===========================
  // Remove from my todo
  // ===========================
  if (lower.startsWith("remove") && lower.includes("from my todo")) {
    const item = command
      .slice(command.toLowerCase().indexOf("remove") + 6, command.toLowerCase().indexOf("from my todo"))
      .trim();

    const index = user.todos.indexOf(item);

    if (index === -1) return "Item not found.";

    user.todos.splice(index, 1);
    return `Removed ${item} from your todo.`;
  }

  // ===========================
  // What is on my todo?
  // ===========================
  if (lower === "what is on my todo?" || lower === "what is on my todo") {
    return `You have ${user.todos.length} todos: ${user.todos.join(", ")}`;
  }

  // ===========================
  // What day is it today?
  // Cleaner method using toLocaleDateString
  // ===========================
  if (lower === "what day is it today?" || lower === "what day is it today") {
    return new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  // ===========================
  // Simple Math (using switch)
  // ===========================
  if (lower.startsWith("what is ")) {
    const operation = lower.replace("what is ", "").trim();
    const operators = ["+", "-", "*", "/", "%"];

    let operator = operators.find(op => operation.includes(op));
    if (!operator) return "Invalid math command.";

    const parts = operation.split(operator);
    if (parts.length < 2) return "Invalid math command.";

    const number1 = Number(parts[0].trim());
    const number2 = Number(parts[1].trim());

    if (isNaN(number1)) return "First number is invalid.";
    if (isNaN(number2)) return "Second number is invalid.";

    switch (operator) {
      case "+":
        return number1 + number2;
      case "-":
        return number1 - number2;
      case "*":
        return number1 * number2;
      case "/":
        return number2 !== 0 ? number1 / number2 : "Cannot divide by zero.";
      case "%":
        return number2 !== 0 ? number1 % number2 : "Cannot get remainder when divisor is zero.";
    }
  }

  // ===========================
  // Set a timer
  // ===========================
  if (lower.startsWith("set a timer for")) {
    // handles both minute/minutes
    const minText = lower.includes("minutes")
      ? "minutes"
      : lower.includes("minute")
      ? "minute"
      : null;

    if (!minText) return "Invalid timer format.";

    const timeStr = lower.replace("set a timer for", "").replace(minText, "").trim();
    const minutes = Number(timeStr);

    if (isNaN(minutes)) return "Invalid timer value.";

    setTimeout(() => {
      console.log("Timer done!");
    }, minutes * 60 * 1000);

    return `Timer set for ${minutes} minute${minutes > 1 ? "s" : ""}.`;
  }

  // No match
  return "I don't understand that command.";
}


