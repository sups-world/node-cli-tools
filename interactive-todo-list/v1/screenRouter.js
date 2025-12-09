import { screenOne } from "./screenOne.js";
import { homeMenuLength, screenZero } from "./screenZero.js";

export const state = {
  currentScreen: 0,
  scrollPosition: 0,
  isTyping: false,
};

export function screenRouter(key) {
  console.log("let's check", key);
  if (key.name === "left") {
    state.currentScreen = 1;
  }
  if (key.name === "right") {
    state.currentScreen = 2;
  }

  if (key.name === "up" || key.name === "down") {
    //home menu
    if (state.currentScreen === 1) {
      if (0 > state.scrollPosition < homeMenuLength) {
        if (key.name === "down") {
          state.scrollPosition = state.scrollPosition + 1;
        }
        if (key.name === "up") {
          state.scrollPosition = state.scrollPosition - 1;
        }
        screenZero(key);
        return;
      }
    }
  }

  render();
}

export function render() {
  if (state.currentScreen === 1) screenZero();
  if (state.currentScreen === 2) screenOne();
}
