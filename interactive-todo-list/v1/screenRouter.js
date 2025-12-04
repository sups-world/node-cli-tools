import { screenOne } from "./screenOne.js";
import { screenZero } from "./screenZero.js";

export const state = {
  currentScreen: 0,
};

export function screenRouter(key) {
  if (key.name === "left") {
    state.currentScreen = 1;
  }
  if (key.name === "right") {
    state.currentScreen = 2;
  }

  render();
}

export function render() {
  if (state.currentScreen === 1) screenZero();
  if (state.currentScreen === 2) screenOne();
}
