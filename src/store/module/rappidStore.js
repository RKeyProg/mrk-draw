const rappidStore = {
  namespaced: true,
  state: {
    isShowStencil: false,
    isProjectOpen: false,
  },
  mutations: {
    CHANGE_IS_SHOW_STENCIL(state) {
      state.isShowStencil = !state.isShowStencil;
    },
    CHANGE_IS_PROJECT_OPEN(state) {
      state.isProjectOpen = !state.isProjectOpen;
    },
  },
  actions: {
    changeIsShowStencil({ commit }) {
      commit("CHANGE_IS_SHOW_STENCIL");
    },
    changeIsProjectOpen({ commit }) {
      commit("CHANGE_IS_PROJECT_OPEN");
    },
  },
};

export default rappidStore;
