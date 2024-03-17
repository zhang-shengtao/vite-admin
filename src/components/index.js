import Icon from "./Icon/index.vue";
import MyTabel from "./Tabel/index.vue";
import MySearch from "./Search/index.vue";

export default function (app) {
  app.component("Icon", Icon);
  app.component("MyTabel", MyTabel);
  app.component("MySearch", MySearch);
}
