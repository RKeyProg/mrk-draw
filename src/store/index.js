import { createStore } from "vuex";
import profile from "./module/profile";
import main from "./module/main";

export default createStore({
  modules: {
    profile,
    main,
  },
});
