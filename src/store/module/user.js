const user = {
  namespaced: true,
  state: {
    user: {},
    projects: [
      {
        id: 1,
        title: "Первая",
        DBSheme: "Концептуальная",
        activity: new Date(),
      },
      {
        id: 2,
        title: "Вторая",
        DBSheme: "Физическая",
        activity: new Date(),
      },
      {
        id: 3,
        title: "Третья",
        DBSheme: "Логическая",
        activity: new Date(2023, 3, 11),
      },
      {
        id: 4,
        title: "Четвертая",
        DBSheme: "",
        activity: new Date(),
      },
      {
        id: 5,
        title: "Пятая",
        DBSheme: "Дипломная работа",
        activity: new Date(),
      },
      {
        id: 6,
        title: "",
        DBSheme: "Шестая",
        activity: new Date(),
      },
    ],
    preview: "",
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
    REMOVE_USER: (state) => {
      state.user = {};
      state.preview = "";
    },
    SET_USER_PREVIEW(state, preview) {
      state.preview = preview;
    },
    REMOVE_PROGECT(state, projectId) {
      state.projects = state.projects.filter((item) => item.id !== projectId);
    },
    ADD_PROJECT(state, project) {
      state.projects.push(project);
    },
  },
  getters: {
    getCurrentProject: (state) => (id) => {
      return state.projects.filter((item) => item.id === id);
    },
    userIsLoggedIn: (state) => {
      const userObj = state.user;

      const userObjIsEmpty =
        Object.keys(userObj).length === 0 && userObj.constructor === Object;

      return userObjIsEmpty === false;
    },
    getProjects: (state) => {
      state.projects.filter((item) => {
        let thisDay = new Date();
        let calculateDay = Math.floor((thisDay - item.activity) / 86400000);
        if (calculateDay < 1) {
          item.activity = "Сегодня";
        } else if (calculateDay === 1) {
          item.activity = `${calculateDay} день назад`;
        } else if (
          (calculateDay % 10 === 2 ||
            calculateDay % 10 === 3 ||
            calculateDay % 10 === 4) &&
          (calculateDay < 12 || calculateDay > 14)
        ) {
          item.activity = `${calculateDay} дня назад`;
        } else {
          item.activity = `${calculateDay} дней назад`;
        }
      });
      console.log(state.project);
      return state.projects;
    },
  },
  actions: {
    addProject({ commit, state }, project) {
      let newProject = {
        id: state.projects.length + 1,
        title: project.title,
        DBSheme: project.DBSheme,
        activity: new Date(),
      };
      commit("ADD_PROJECT", newProject);
    },
    removeProject({ commit }, projectId) {
      commit("REMOVE_PROGECT", projectId);
    },
    renderPhoto({ commit }, photo) {
      const reader = new FileReader();

      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        commit("SET_USER_PREVIEW", reader.result);
      };
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("REMOVE_USER");
    },
    async login({ commit, dispatch }, user) {
      if (!user.name) {
        user.name = "Имя пользователя";
      }
      if (user.photo) {
        const photoBlob = new Blob([new Uint8Array(user.photo.data)], {
          type: user.photo.contentType,
        });

        const photoFile = new File([photoBlob], "avatar", {
          type: user.photo.contentType,
        });

        user.photo = photoFile;

        dispatch("renderPhoto", photoFile);
      }
      commit("SET_USER", user);
    },
    async editData({ commit, dispatch }, newData) {
      const formData = new FormData();

      Object.keys(newData).forEach((item) => {
        formData.append(item, newData[item]);
      });

      try {
        const response = await this.$axios.post("/edit", formData);

        if (response.data.user.photo) {
          const photoBlob = new Blob(
            [new Uint8Array(response.data.user.photo.data)],
            {
              type: response.data.user.photo.contentType,
            }
          );

          const photoFile = new File([photoBlob], "avatar", {
            type: response.data.user.photo.contentType,
          });

          response.data.user.photo = photoFile;
        }

        dispatch(
          "tooltips/show",
          {
            text: response.data.message,
            type: "success",
          },
          { root: true }
        );

        commit("SET_USER", response.data.user);
      } catch (error) {
        dispatch(
          "tooltips/show",
          {
            text: error.response.data.message,
            type: "error",
          },
          { root: true }
        );
      }
    },
  },
};

export default user;
