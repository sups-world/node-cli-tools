#!/usr/bin/env node
// Enable keypress listener
import readline from "node:readline";
//enable keypress
readline.emitKeypressEvents(process.stdin);
//set stdin to raw mode to handle keypresses directly
process.stdin.setRawMode(true);
// ---end of enable key press listener--

import { render, screenRouter, state } from "./screenRouter.js";

state.currentScreen = 1;

async function keyPressListener() {
  return new Promise((resolve) => {
    process.stdin.on("keypress", (str, key) => {
      if (key.sequence === "\u0003") {
        // \u0003 is the ASCII code for Ctrl+C
        console.log("Exiting...");
        process.exit();
      }
      // console.log("now ::", key.name);
      if (
        key.name === "left" ||
        key.name === "right" ||
        key.name === "up" ||
        key.name === "down"
      ) {
        screenRouter(key);
      }
    });
    resolve();
  });
}

async function main() {
  await keyPressListener();
  render();
}

console.log("Press enter to begin");
main();
