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
        title: "Настройки",
        active: false,
        component: "mainSettings",
      },
      {
        id: 3,
        title: "Корзина",
        active: false,
        component: "mainTrash",
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
