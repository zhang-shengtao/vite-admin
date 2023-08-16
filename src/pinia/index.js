import { createPinia as _createPinia } from "pinia";
export { default as userPinia } from "./user";

export default function createPinia() {
  return _createPinia();
}
