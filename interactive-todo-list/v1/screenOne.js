import readline from "node:readline";

import { addItem, listItems } from "./fileRelated.js";
import { state } from "./screenRouter.js";

function addNewTask() {
  if (state.isTyping) return;
  state.isTyping = true;
  // Raw mode needs to turned off to allow typing
  process.stdin.setRawMode(false);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.clear();
  console.log("Enter your new task");

  rl.question("> ", (answer) => {
    addItem(answer); // save the task
    rl.close();

    // Restore raw mode so key navigation works again
    process.stdin.setRawMode(true);

    state.isTyping = false;

    console.log(
      "\n Task added! Use arrow keys to continue.Please press left to go back"
    );
  });
}

export function screenOne() {
  if (state.scrollPosition === 0) {
    console.clear();
    console.log("Enter task here ");
    addNewTask();
  } else if (state.scrollPosition === 1) {
    console.clear();
    console.log("Listing all incomplete tasks");
    listItems("incomplete");
  } else if (state.scrollPosition === 2) {
    console.clear();
    console.log("Listing all complete tasks");
    listItems("complete");
  } else if (state.scrollPosition === 3) {
    console.clear();
    console.log("Exiting...");
    process.exit();
  } else {
    console.clear();
    console.log("Not defined please press left key to return");
  }
}
