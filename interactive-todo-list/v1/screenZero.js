import { state } from "./screenRouter.js";

const headline = "Interactive TODO CLI by sups";
const homeMenuOptions = [
  `1. Add new task \n`,
  `2. View all incomplete tasks \n`,
  `3. View all complete tasks \n`,
  `4. Exit \n`,
];

export const homeMenuLength = homeMenuOptions.length;

function printHomeMenu() {
  let arrowPosition = state.scrollPosition;
  if (arrowPosition >= homeMenuLength) {
    arrowPosition = 0;
    state.scrollPosition = 0;
  } else if (arrowPosition < 0) {
    arrowPosition = homeMenuLength - 1;
    state.scrollPosition = arrowPosition;
  }
  console.clear();
  console.log("current ", state);
  console.log(headline + "\n");
  homeMenuOptions.map((item, index) => {
    if (index === arrowPosition) {
      process.stdout.write(`\r >${item}`);
    } else {
      process.stdout.write(`\r  ${item}`);
    }
  });

  console.log("Press right to enter sub-menu, left to return to home menu");
}
export function screenZero(key) {
  printHomeMenu(key);
}
