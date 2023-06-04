const main = {
  namespaced: true,
  state: {
    componentNavigation: [
      {
        id: 1,
        title: "Проекты",
        active: true,
        component: "mainProjects",
      },
      {
        id: 2,
        title: "Теория",
        active: false,
        component: "mainTheory",
      },
    ],
    currentComponent: "mainProjects",
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

export default main;
