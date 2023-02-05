const profile = {
  state: {
    projects: [
      {
        id: 1,
        title: "Untitled",
        name: "Дипломная работа",
        activity: "2 дня назад",
      },
      {
        id: 2,
        title: "Untitled",
        name: "",
        activity: "2 дня назад",
      },
      {
        id: 3,
        title: "Untitled",
        name: "Дипломная работа",
        activity: "2 дня назад",
      },
      {
        id: 4,
        title: "Untitled",
        name: "",
        activity: "2 дня назад",
      },
      {
        id: 5,
        title: "Untitled",
        name: "Дипломная работа",
        activity: "2 дня назад",
      },
      {
        id: 6,
        title: "Untitled",
        name: "Дипломная работа",
        activity: "2 дня назад",
      },
    ],
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
    REMOVE_PROGECT(state, projectId) {
      state.projects = state.projects.filter((item) => item.id !== projectId);
    },
    SET_CURRENT_COMPONENT(state, component) {
      state.currentComponent = component;
    },
  },
  actions: {
    removeProject({ commit }, projectId) {
      commit("REMOVE_PROGECT", projectId);
    },
    setCurrentComponent(store, component) {
      store.commit("SET_CURRENT_COMPONENT", component.component);
      store.state.componentNavigation.forEach((item) => {
        item.active = item.id === component.id ? true : false;
      });
    },
  },
};

export default profile;
