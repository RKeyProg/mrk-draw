<template lang="pug">
.login(v-if="isLogin")
  base-icon.login__logo(name="logo")
  h4.login__title Вход в аккаунт
  form.authorization(@submit.prevent="loginSubmit")
    .authorization__inputs
      base-input.authorization__input(
        v-model="loginUser.email",
        placeholder="Логин"
      )
      base-input.authorization__input(
        placeholder="Пароль",
        v-model="loginUser.password",
        type="password"
      )
    base-button.authorization__btn(customType="submit") Войти
  .login__sub
    base-button.login__registration(
      customType="fill",
      @handleClick="changeAuthorizationView()"
    ) Регистрация
.register(v-else)
  base-icon.login__logo(name="logo")
  h4.login__title Регистрация
  form.registration(@submit.prevent="registerSubmit")
    .registration__inputs
      base-input.registration__input(
        v-model="registerUser.email",
        placeholder="Почта",
        :error="validation.firstError('registerUser.email')"
      )
      base-input.registration__input(
        placeholder="Пароль",
        v-model="registerUser.password",
        type="password",
        :error="validation.firstError('registerUser.password')"
      )
    base-button.registration__btn(customType="submit") Зарегистрироваться
  .login__sub
    base-button.login__registration(
      customType="fill",
      @handleClick="changeAuthorizationView()"
    ) Войти
</template>

<script>
import { Validator } from "simple-vue-validator";
import $axios from "../../request";
import BaseInput from "./../../components/BaseInput";
import BaseButton from "./../../components/BaseButton";
import BaseIcon from "../../components/BaseIcon";
import { mapActions } from "vuex";

export default {
  name: "loginView",
  components: {
    BaseInput,
    BaseButton,
    BaseIcon,
  },
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "registerUser.email"(value) {
      return Validator.value(value)
        .required("Введите email")
        .email("Некорректный формат");
    },
    "registerUser.password"(value) {
      return Validator.value(value)
        .required("Введите пароль")
        .minLength(6, "Минимум 6 символов");
    },
  },
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      registerUser: {
        email: "",
        password: "",
      },
      isLogin: true,
    };
  },
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      login: "user/login",
    }),
    async loginSubmit() {
      try {
        const response = await $axios.post("/login", this.loginUser);
        this.login(response.data.user);

        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          text: error.response.data.message,
          type: "error",
        });
      }
    },
    async registerSubmit() {
      if ((await this.$validate()) === false) return;

      try {
        const response = await $axios.post("/register", this.registerUser);

        this.changeAuthorizationView();
        this.showTooltip({
          text: response.data.message,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.response.data.message,
          type: "error",
        });
      }
    },
    changeAuthorizationView() {
      this.isLogin = !this.isLogin;
    },
  },
};
</script>

<style lang="scss" scoped src="./loginView.scss"></style>
