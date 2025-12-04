//Related to file
import fs from "fs";
export const DB_FILE = "./todos.json";

export function loadCurrentItems() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}
export function saveTodos(todos) {
  fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
}

export function listItems(listType = "incomplete") {
  const todos = loadCurrentItems();

  if (todos.length === 0) {
    console.log("No lists found");
    return;
  }

  if (listType === "incomplete") {
    console.log(`\nYour incomplete tasks: \n`);
    todos.forEach((t) => {
      // const status = t.done ? "✔" : "✖";
      if (!t.done) {
        console.log(`${t.id} ✖  ${t.text}`);
      }
    });
    console.log("");
  } else if (listType === "complete") {
    console.log(`\nYour incomplete tasks: \n`);
    todos.forEach((t) => {
      if (t.done) {
        console.log(`${t.id} ✔  ${t.text}`);
      }
    });
    console.log("");
  } else {
    console.log(`\nYour todo list: \n`);
    todos.forEach((t) => {
      const status = t.done ? "✔" : "✖";
      console.log(`${t.id}.[${status}] ${t.text}`);
    });
    console.log("");
  }
}

export function addItem(text) {
  if (!text) {
    console.log("Please provide a text item to add");
    return;
  }

  const todos = loadCurrentItems();
  const newTodo = {
    id: todos.length + 1,
    text,
    done: false,
  };

  todos.push(newTodo);
  saveTodos(todos);

  console.log(`Added: ${text}`);
}
