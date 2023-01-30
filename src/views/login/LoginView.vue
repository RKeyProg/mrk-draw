<template lang="pug">
.login-container
  h4.login__title Вход в аккаунт
  form.authorization
    .authorization__inputs
      app-input.authorization__input(placeholder="Логин")
      app-input.authorization__input(placeholder="Пароль")
    appBtn.authorization__btn Войти
</template>

<script>
import appInput from "./../../components/input";
import appBtn from "./../../components/button";

export default {
  name: "loginView",
  components: {
    appInput,
    appBtn,
  },
};
</script>

<style lang="scss" scoped src="./loginView.scss"></style>
