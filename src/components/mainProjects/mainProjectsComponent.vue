<template lang="pug">
.main-projects
  .main-projects__create
    button.main__new-project(
      v-if="!isNewProjectCreating",
      @click="changeCardView"
    )
      .new-project__circle
      span Новый проект
    mainProjectsNew(v-else, @changeCardView="changeCardView")
  project-list(:projects="getProjects")
</template>

<script>
import projectList from "../projectList";
import mainProjectsNew from "../mainProjectsNew";
import { mapGetters } from "vuex";

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
    ...mapGetters({
      getProjects: "user/getProjects",
    }),
  },
  methods: {
    changeCardView() {
      this.isNewProjectCreating = !this.isNewProjectCreating;
    },
  },
};
</script>

<style lang="scss" scoped src="./mainProjectsComponent.scss"></style>
