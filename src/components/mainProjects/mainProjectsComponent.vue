<template lang="pug">
.main-projects
  .main-projects__create
    button.main__new-project(
      v-if="!isNewProjectCreating",
      @click="handleClick"
    )
      .new-project__circle
      span Новый проект
    mainProjectsNew(v-else, @handleClick="handleClick")
  project-list(:projects="projects")
</template>

<script>
import projectList from "../projectList";
import mainProjectsNew from "../mainProjectsNew";
import { mapState } from "vuex";

export default {
  components: {
    projectList,
    mainProjectsNew,
  },
  data() {
    return {
      isNewProjectCreating: false,
    };
  },
  computed: {
    ...mapState({
      projects: (state) => state.user.projects,
    }),
  },
  methods: {
    handleClick() {
      this.isNewProjectCreating = !this.isNewProjectCreating;
    },
  },
};
</script>

<style lang="scss" scoped src="./mainProjectsComponent.scss"></style>
