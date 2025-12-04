const headline = "Interactive TODO CLI by sups";
const homeMenuOptions = [
  `1. Add new task \n`,
  `2. View all incomplete tasks \n`,
  `3. View all complete tasks \n`,
  `4. Exit \n`,
];

const defaultArrowPosition = 0;
const maxArrayPostion = homeMenuOptions.length - 1;

function printHomeMenu(key) {
  let arrowPosition = 0;
  console.clear();
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
