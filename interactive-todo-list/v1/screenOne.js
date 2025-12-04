import { addItem, listItems } from "./fileRelated.js";
import { state } from "./screenRouter.js";

export function screenOne() {
  if (state.scrollPosition === 0) {
    console.clear();
    console.log("Enter task here ");
    addItem();
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
