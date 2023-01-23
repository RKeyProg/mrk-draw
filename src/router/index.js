import { createRouter, createWebHistory } from "vue-router";
import ProfileView from "../views/profile";
import sideBar from "../components/sideBar";

const routes = [
  {
    path: "/",
    name: "profile",
    components: {
      default: ProfileView,
      sideBar: sideBar,
    },
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
