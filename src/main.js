import { createManager } from "@vue-youtube/core";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import $axios from "./request.js";

store.$axios = $axios;

createApp(App).use(createManager()).use(store).use(router).mount("#app");
