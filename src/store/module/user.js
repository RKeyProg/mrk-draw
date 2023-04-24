const user = {
  namespaced: true,
  state: {
    user: {},
    projects: [],
    preview: "",
    currentProject: {
      id: 0,
      json: {},
    },
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
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    SET_CURRENT_PROJECT(state, currentProject) {
      state.currentProject = currentProject;
    },
    UNSET_CURRENT_PROJECT(state) {
      state.currentProjectJson = {};
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
      return state.projects.map((item) => {
        let activity = item.activity;
        let thisDay = new Date();

        let calculateDay = Math.floor((thisDay - activity) / 86400000);
        if (calculateDay < 1) {
          activity = "Сегодня";
        } else if (calculateDay === 1) {
          activity = `${calculateDay} день назад`;
        } else if (
          (calculateDay % 10 === 2 ||
            calculateDay % 10 === 3 ||
            calculateDay % 10 === 4) &&
          (calculateDay < 12 || calculateDay > 14)
        ) {
          activity = `${calculateDay} дня назад`;
        } else {
          activity = `${calculateDay} дней назад`;
        }

        const newItem = { ...item, activity };
        return newItem;
      });
    },
  },
  actions: {
    setProjects({ commit }, projects) {
      commit("SET_PROJECTS", projects);
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
    login({ commit, dispatch }, user) {
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
    async addProject({ commit, dispatch }, project) {
      let newProject = {
        title: project.title,
        DBSheme: project.DBSheme,
        activity: new Date(),
      };

      try {
        const response = await this.$axios.post("/addProject", newProject);

        dispatch(
          "tooltips/show",
          {
            text: response.data.message,
            type: "success",
          },
          { root: true }
        );

        const projects = response.data.projects.map(
          ({ id, title, DBSheme, activity }) => ({
            id,
            title,
            DBSheme,
            activity: new Date(activity),
          })
        );

        commit("SET_PROJECTS", projects);
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
    async removeProject({ commit, dispatch }, projectId) {
      try {
        const response = await this.$axios.post("/removeProject", {
          projectId,
        });

        dispatch(
          "tooltips/show",
          {
            text: response.data.message,
            type: "success",
          },
          { root: true }
        );

        commit("REMOVE_PROGECT", projectId);
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
    setCurrentProject({ commit }, currentProject) {
      commit("SET_CURRENT_PROJECT", currentProject);
    },
    async saveProject({ commit, dispatch }, currentProject) {
      try {
        const response = await this.$axios.post("/saveProject", {
          currentProject,
        });

        dispatch(
          "tooltips/show",
          {
            text: response.data.message,
            type: "success",
          },
          { root: true }
        );

        commit("UNSET_CURRENT_PROJECT");
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
