<template lang="pug">
.profile-user
  profile-person-data.profile__person
  project-list(:projects="getProjects", editable)
</template>

<script>
import profilePersonData from "../profilePersonData";
import projectList from "../projectList";
import { mapGetters } from "vuex";

export default {
  components: {
    profilePersonData,
    projectList,
  },
  computed: {
    ...mapGetters({
      getProjects: "user/getProjects",
    }),
  },
};
</script>

<style lang="scss" scoped src="./profileUserComponent.scss"></style>
