<template lang="pug">
.profile
  .section__healine
    section-title(title="Мой профиль")
  .profile__container
    component(:is="currentComponent")
</template>

<script>
import sectionTitle from "./../../components/sectionTitle";
import profileUser from "./../../components/profileUserComponent";
import profilePrivacy from "./../../components/profilePrivacyComponent";
import { mapState } from "vuex";

export default {
  name: "ProfileView",
  components: {
    sectionTitle,
    profileUser,
    profilePrivacy,
  },
  computed: {
    ...mapState({
      currentComponent: (state) => state.profile.currentComponent,
    }),
  },
};
</script>

<style lang="scss" scoped src="./ProfileView.scss"></style>
