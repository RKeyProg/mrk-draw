import { createStore } from "vuex";
import user from "./module/user";
import profile from "./module/profile";
import main from "./module/main";

export default createStore({
  modules: {
    user,
    profile,
    main,
  },
});
