<template lang="pug">
.person-component
  .person(v-if="!isDataProfileEditing")
    .person__content
      base-avatar.person__avatar
      .person__data
        div
          h3 {{ personalData.name }}
        div
          span Почта:
          span {{ personalData.email }}
        div
          span Телефон:
          span {{ personalData.phone_number }}
    .person__settings
      base-button.person__btn(
        customType="transparent",
        @handleClick="changePersonalData"
      ) Редактировать профиль
  .person(v-else)
    .person__content
      label(:class="['person__avatar_editing', { hovered: avatarIsHovered }]")
        base-avatar.person__avatar(
          @dragover.prevent="avatarIsHovered = true",
          @dragleave.prevent="avatarIsHovered = false",
          @dragstart.prevent,
          @drop.prevent="setPhoto($event.dataTransfer.files[0])"
        )
        base-input.person__file(type="file", @handleChange="setPhoto")
      form.person__form(@submit.prevent="setPersonData")
        .person__inputs
          base-input.person__input(
            placeholder="Имя",
            v-model="newPersonalData.name"
          )
          base-input.person__input(
            placeholder="Телефон",
            v-model="newPersonalData.phone_number"
          )
          base-input.person__input(
            placeholder="Новый пароль",
            type="password",
            v-model="newPersonalData.password"
          )
        .person__buttons
          base-button.person__btn.person__btn_editing(
            customType="fill",
            @handleClick="resetChanges()"
          ) Отмена
          base-button.person__btn.person__btn_editing(customType="submit") Сохранить
</template>

<script>
import BaseAvatar from "../BaseAvatar";
import BaseButton from "../BaseButton";
import BaseInput from "../BaseInput";
import { mapActions, mapState } from "vuex";

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
      newPersonalData: {},
    };
  },
  methods: {
    ...mapActions({
      setUserPreview: "user/setUserPreview",
      editData: "user/editData",
      renderPhoto: "user/renderPhoto",
    }),
    setPhoto(file) {
      this.avatarIsHovered = false;
      this.newPersonalData.photo = file;
      this.renderPhoto(file);
    },
    resetChanges() {
      this.isDataProfileEditing = false;
      if (this.personalData.photo) {
        this.renderPhoto(this.personalData.photo);
      }
    },
    setPersonData() {
      this.editData(this.newPersonalData);
      this.isDataProfileEditing = false;
    },
    changePersonalData() {
      this.newPersonalData = Object.assign({}, this.personalData);
      this.newPersonalData.password = "";
      this.isDataProfileEditing = true;
    },
  },
  computed: {
    ...mapState("user", {
      personalData: (state) => state.user,
    }),
  },
};
</script>

<style lang="scss" src="./ProfilePersonDataComponent.scss" scoped></style>
