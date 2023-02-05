<template lang="pug">
.profile-user
  profile-person-data.profile__person
  project-list(v-if="projects.length", :projects="projects")
  .project-list__not-exist(v-else) Сохраненные проекты не найдены
</template>

<script>
import profilePersonData from "../profilePersonData";
import projectList from "../projectList";
import { mapState } from "vuex";

export default {
  components: {
    profilePersonData,
    projectList,
  },
  computed: {
    ...mapState({
      projects: (state) => state.profile.projects,
    }),
  },
};
</script>

<style lang="scss" scoped src="./profileUserComponent.scss"></style>
