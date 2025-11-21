#!/usr/bin/env node

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

homeMenu();
