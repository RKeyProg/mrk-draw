const profile = {
  namespaced: true,
  state: {
    componentNavigation: [
      {
        id: 1,
        title: "Мой профиль",
        active: true,
        component: "profileUser",
      },
      {
        id: 2,
        title: "Приватность",
        active: false,
        component: "profilePrivacy",
      },
    ],
    currentComponent: "profileUser",
  },
  mutations: {
    SET_CURRENT_COMPONENT(state, component) {
      state.currentComponent = component.component;
      state.componentNavigation.forEach((item) => {
        item.active = item.id === component.id ? true : false;
      });
    },
  },
  actions: {
    setCurrentComponent({ commit }, component) {
      commit("SET_CURRENT_COMPONENT", component);
    },
  },
};

export default profile;
