import { createRouter, createWebHistory } from "vue-router";
import ProfileView from "../views/profile";

const routes = [
  {
    path: "/",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/login",
    name: "login",
    components: {
      default: () => import("../views/login"),
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
