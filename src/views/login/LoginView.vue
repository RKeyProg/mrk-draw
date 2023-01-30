<template lang="pug">
.login
  .login__container
    app-icon(name="logo").login__logo
    h4.login__title Вход в аккаунт
    form.authorization
      .authorization__inputs
        app-input.authorization__input(placeholder="Логин")
        app-input.authorization__input(placeholder="Пароль" type="password")
      appBtn.authorization__btn Войти
</template>

<script>
import appInput from "./../../components/input";
import appBtn from "./../../components/button";
import appIcon from "../../components/icon";

export default {
  name: "loginView",
  components: {
    appInput,
    appBtn,
    appIcon,
  },
};
</script>

<style lang="scss" scoped src="./loginView.scss"></style>
