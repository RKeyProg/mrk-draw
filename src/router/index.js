import { createRouter, createWebHistory } from "vue-router";
import sideBar from "../components/sideBar";

const routes = [
  {
    path: "/",
    name: "main",
    components: {
      default: () => import("../views/main"),
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
  {
    path: "/profile",
    name: "profile",
    components: {
      default: () => import("../views/profile"),
      sideBar: sideBar,
    },
  },
  {
    path: "/project/:id",
    name: "project",
    components: {
      default: () => import("../views/project"),
      sideBar: sideBar,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
