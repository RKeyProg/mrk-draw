<template lang="pug">
.app__container
  router-view(name="sideBar")
  div(:class="['page', { page__login: routeName }]")
    router-view.page__content
</template>

<script>
export default {
  computed: {
    routeName() {
      return this.$route.name === "login" ? true : false;
    },
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}

.app__container {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
}

.page {
  width: calc(100% - 100px);
  position: relative;
  background: #f4f4fc;
  border-radius: 20px 0px 0px 20px;
  overflow: hidden;
  padding: 35px;
  padding-top: 20px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.02;
    background: url("./assets/bg/appBG.jpg");
    z-index: 1;
  }

  &__login {
    width: 100%;
    border-radius: 0px;
  }
}

.page__content {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
}
</style>

<style lang="scss" src="./App.scss"></style>
