<template lang="pug">
.profile
  .section__healine
    app-section-title
  form.profile__content
    label.profile__photo
      avatar.profile__avatar
      app-input(type="file")
    .profile__rows
      app-input.profile__input(placeholder="Имя")
      app-input.profile__input(value="Радкевич")
    .profile__rows
      app-input.profile__input(value="8к2411")
      app-input.profile__input(placeholder="Телефон")
</template>

<script>
import avatar from "./../../components/avatar";
import appInput from "./../../components/input";
import appSectionTitle from "./../../components/sectionTitle";

export default {
  name: "ProfileView",
  components: {
    avatar,
    appInput,
    appSectionTitle,
  },
};
</script>

<style lang="scss" src="./ProfileView.scss"></style>
