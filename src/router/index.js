import { createRouter, createWebHistory } from "vue-router";
import sideBar from "../components/sideBar";
import store from "../store";
import axios from "axios";

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
    meta: {
      public: true,
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

const guard = axios.create({
  baseURL: "http://localhost:3000",
});

router.beforeEach(async (to, from, next) => {
  const isPublicRoute = to.matched.some((route) => route.meta.public);
  const isUserLoggedIn = store.getters["user/userIsLoggedIn"];

  if (isPublicRoute === false && isUserLoggedIn === false) {
    const token = localStorage.getItem("token");

    guard.defaults.headers["Authorization"] = `Bearer ${token}`;

    try {
      const response = await guard.get("/user");
      store.dispatch("user/login", await response.data.user);
      next();
    } catch (error) {
      store.dispatch(
        "tooltips/show",
        {
          text: error.response.data.message,
          type: "error",
        },
        { root: true }
      );
      router.replace("/login");
      localStorage.removeItem("token");
    }
  } else {
    next();
  }
});

export default router;
