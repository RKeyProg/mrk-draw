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
            v-model="newPersonalData.name",
            :error="validation.firstError('newPersonalData.name')"
          )
          base-input.person__input(
            placeholder="Телефон",
            v-model="newPersonalData.phone_number",
            :error="validation.firstError('newPersonalData.phone_number')"
          )
          base-input.person__input(
            placeholder="Новый пароль",
            type="password",
            v-model="newPersonalData.password",
            :error="validation.firstError('newPersonalData.password')"
          )
        .person__buttons
          base-button.person__btn.person__btn_editing(customType="submit") Сохранить
          base-button.person__btn.person__btn_editing(
            customType="fill",
            @handleClick="resetChanges()"
          ) Отмена
</template>

<script>
import { Validator } from "simple-vue-validator";
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
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "newPersonalData.name"(value) {
      return Validator.value(value).required("Введите имя");
    },
    "newPersonalData.phone_number"(value) {
      return Validator.value(value)
        .required("Введите телефон")
        .regex(
          /^(\+375|80)(25|29|33|44)(\d{3})(\d{2})(\d{2})$/,
          "Некорректный формат телефона"
        );
    },
    "newPersonalData.password"(value) {
      return Validator.value(value).minLength(6, "Минимум 6 символов");
    },
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
    async setPersonData() {
      if ((await this.$validate()) === false) return;

      if (!this.newPersonalData.password) {
        this.newPersonalData.password = this.personalData.password;
      }

      if (
        JSON.stringify(this.newPersonalData) !==
        JSON.stringify(this.personalData)
      ) {
        this.editData(this.newPersonalData);
      }

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
