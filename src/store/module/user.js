const user = {
  namespaced: true,
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
    photo: {},
    preview: "",
  },
  mutations: {
    REMOVE_PROGECT(state, projectId) {
      state.projects = state.projects.filter((item) => item.id !== projectId);
    },
    SET_USER_PHOTO(state, file) {
      state.photo = file;
    },
    SET_USER_PREVIEW(state, preview) {
      state.preview = preview;
    },
  },
  actions: {
    removeProject({ commit }, projectId) {
      commit("REMOVE_PROGECT", projectId);
    },
    setUserPhoto({ commit }, file) {
      commit("SET_USER_PHOTO", file);
      if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
          commit("SET_USER_PREVIEW", reader.result);
        };
      }
    },
  },
};

export default user;
