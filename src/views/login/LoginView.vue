<template lang="pug">
.login
  base-icon.login__logo(name="logo")
  h4.login__title Вход в аккаунт
  form.authorization
    .authorization__inputs
      base-input.authorization__input(
        v-model="user.login",
        placeholder="Логин"
      )
      base-input.authorization__input(
        placeholder="Пароль",
        v-model="user.password",
        type="password"
      )
    base-button.authorization__btn(type="text") Войти
</template>

<script>
import BaseInput from "./../../components/BaseInput";
import BaseButton from "./../../components/BaseButton";
import BaseIcon from "../../components/BaseIcon";

export default {
  name: "loginView",
  components: {
    BaseInput,
    BaseButton,
    BaseIcon,
  },
  data() {
    return {
      user: {
        login: "Kirill",
        password: "123456789",
      },
    };
  },
};
</script>

<style lang="scss" scoped src="./loginView.scss"></style>
