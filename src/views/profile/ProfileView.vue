<template lang="pug">
.profile
  .section__healine
    section-title(title="Мой профиль", simply)
  .section__container
    component(:is="currentComponent")
</template>

<script>
import sectionTitle from "./../../components/sectionTitle";
import profileUser from "./../../components/profileUser";
import { mapState } from "vuex";

export default {
  name: "ProfileView",
  components: {
    sectionTitle,
    profileUser,
  },
  computed: {
    ...mapState({
      currentComponent: (state) => state.profile.currentComponent,
    }),
  },
};
</script>
