<template lang="pug">
.person-component
  .person(v-if="!isDataProfileEditing")
    .person__content
      base-avatar.person__avatar
      .person__data
        div 
          h3 Радкевич Анна Сергеевна
        div
          span Почта:
          span anna_radk@mail.ru
        div
          span Телефон:
          span +375292799704
    .person__settings
      base-button.person__btn(
        customType="transparent",
        @handleClick="isDataProfileEditing = true"
      ) Редактировать профиль
      base-button.person__btn(customType="transparent") Изменить пароль
  .person(v-else)
    .person__content
      label(:class="['person__avatar_editing', { hovered: avatarIsHovered }]")
        base-avatar.person__avatar(
          @dragover.prevent="avatarIsHovered = true",
          @dragleave.prevent="avatarIsHovered = false",
          @dragstart.prevent,
          @drop.prevent="handleDrop($event.dataTransfer.files[0])"
        )
        base-input.person__file(type="file", @handleChange="setUserPhoto")
      form.person__form
        .person__inputs
          base-input.person__input(placeholder="Фамилия")
          base-input.person__input(placeholder="Почта")
          base-input.person__input(placeholder="Телефон")
        base-button.person__btn.person__btn_editing(
          customType="fill",
          @handleClick="setPersonData"
        ) Сохранить
</template>

<script>
import BaseAvatar from "../BaseAvatar";
import BaseButton from "../BaseButton";
import BaseInput from "../BaseInput";
import { mapActions } from "vuex";

export default {
  name: "profilePersonData",
  components: {
    BaseAvatar,
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      isDataProfileEditing: false,
      avatarIsHovered: false,
    };
  },
  methods: {
    ...mapActions({
      setUserPhoto: "user/setUserPhoto",
    }),
    handleDrop(file) {
      this.avatarIsHovered = false;
      this.setUserPhoto(file);
    },
    setPersonData() {
      this.isDataProfileEditing = false;
    },
  },
};
</script>

<style lang="scss" src="./ProfilePersonDataComponent.scss" scoped></style>
