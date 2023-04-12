import { createStore } from "vuex";
import user from "./module/user";
import profile from "./module/profile";
import main from "./module/main";
import rappidStore from "./module/rappidStore";
import tooltips from "./module/tooltips";

export default createStore({
  modules: {
    user,
    profile,
    main,
    rappidStore,
    tooltips,
  },
});
