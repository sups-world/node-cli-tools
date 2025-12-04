#!/usr/bin/env node
import fs from "fs";

import readline from "node:readline";
//enable keypress
readline.emitKeypressEvents(process.stdin);
//set stdin to raw mode to handle keypresses directly
process.stdin.setRawMode(true);

const headline = "Interactive TODO CLI by sups";
const homeMenuOptions = [
  `1. Add new task \n`,
  `2. View all incomplete tasks \n`,
  `3. View all complete tasks \n`,
  `4. Exit \n`,
];
const defaultArrowPosition = 0;
const maxArrayPostion = homeMenuOptions.length - 1;

//Related to file
const DB_FILE = "./todos.json";

function loadCurrentItems() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}
function listItems(listType) {
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

//Ends related to file

async function keyPressListener() {
  let arrayPostion = 0;
  console.log(headline);
  printHomeMenu(arrayPostion);
  return new Promise((resolve) => {
    process.stdin.on("keypress", (str, key) => {
      if (key.sequence === "\u0003") {
        // \u0003 is the ASCII code for Ctrl+C
        console.log("Exiting...");
        process.exit();
      }

      if (key.name === "right") {
        if (arrayPostion === maxArrayPostion) {
          console.clear();
          console.log("Exiting...");
          process.exit();
        }
        if (arrayPostion === 1) {
          console.clear();
          listIncompleteTasks();
          return;
        }
        if (arrayPostion === 2) {
          console.clear();
          listCompleteTasks();
          return;
        }
      }
      if (key.name === "down") {
        arrayPostion++;
        if (arrayPostion > maxArrayPostion) {
          arrayPostion = 0;
        }
        printHomeMenu(arrayPostion);
      }

      if (key.name === "up") {
        arrayPostion--;
        if (arrayPostion < defaultArrowPosition) {
          arrayPostion = maxArrayPostion;
        }
        printHomeMenu(arrayPostion);
      }
    });
    resolve();
  });
}

function printHomeMenu(arrowPosition) {
  console.clear();
  console.log(headline);
  homeMenuOptions.map((item, index) => {
    if (index === arrowPosition) {
      process.stdout.write(`\r >${item}`);
    } else {
      process.stdout.write(`\r  ${item}`);
    }
  });
}

async function homeMenu() {
  await keyPressListener();
}

function listIncompleteTasks() {
  console.clear();
  listItems("incomplete");
  // TODO::: menu return;
  return;
}
function listCompleteTasks() {
  console.clear();
  listItems("complete");
  // TODO::: menu return;
  return;
}

homeMenu();

// IDEA:Screen Menu array to toggle back and forth
// TODO: lower menu to toggle screen array
