import { createPinia as _createPinia } from "pinia";
export { default as userPinia } from "./user";

let pinia;
export default function createPinia() {
  if (pinia) return pinia;
  pinia = _createPinia();
  return pinia;
}
