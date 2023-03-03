import { createStore } from "vuex";
import user from "./module/user";
import profile from "./module/profile";
import main from "./module/main";
import rappidStore from "./module/rappidStore";

export default createStore({
  modules: {
    user,
    profile,
    main,
    rappidStore,
  },
});
