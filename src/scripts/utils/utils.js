import { spinner } from "./constants.js";

export function addSpinner(elem) {
  elem.textContent = "Сохранение...";
  elem.append(spinner);
}

export function removeSpinner(elem) {
  elem.textContent = "Сохранить";
}
