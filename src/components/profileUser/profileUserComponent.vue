<template lang="pug">
.profile-user
  profile-person-data.profile__person
  project-list(:projects="projects", editable)
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
      projects: (state) => state.user.projects,
    }),
  },
};
</script>

<style lang="scss" scoped src="./profileUserComponent.scss"></style>
