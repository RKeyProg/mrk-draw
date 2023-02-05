<template lang="pug">
.side-bar__container
  section.side-bar
    router-link.side-bar__logo(to="/")
      base-icon.side-bar__logo(name="logo")
    nav.side-bar__nav.nav
      ul.nav__menu
        li(
          v-for="item in navList",
          :key="item.id",
          :class="['nav__item', { active: item.path === this.$route.path }]"
        )
          router-link(:to="item.path")
            base-icon.nav__icon(:name="item.name")
    router-link.side-bar__exit(to="/login")
      base-icon.side-bar__exit(name="exit") 
</template>

<script>
import BaseIcon from "../BaseIcon";
export default {
  components: {
    BaseIcon,
  },
  data() {
    return {
      navList: [
        {
          id: 1,
          name: "home",
          path: "/",
        },
        {
          id: 2,
          name: "contacts",
          path: "/login",
        },
        {
          id: 3,
          name: "user",
          path: "/profile",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped src="./sideBar.scss"></style>
