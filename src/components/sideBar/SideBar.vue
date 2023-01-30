<template lang="pug">
.side-bar__container
  section.side-bar
    router-link.side-bar__logo(to="/")
      appIcon.side-bar__logo(name="logo")
    nav.side-bar__nav.nav
      ul.nav__menu
        li(
          v-for="item in navList",
          :key="item.id",
          :class="['nav__item', { active: item.isActive }]"
        )
          router-link(to="/login")
            appIcon.nav__icon(:name="item.name")
    router-link.side-bar__exit(to="/login")
      appIcon.side-bar__exit(name="exit") 
</template>

<script>
import appIcon from "../icon";
export default {
  components: {
    appIcon,
  },
  data() {
    return {
      navList: [
        {
          id: 1,
          name: "home",
          isActive: true,
        },
        {
          id: 2,
          name: "contacts",
          isActive: false,
        },
        {
          id: 3,
          name: "user",
          isActive: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./sideBar.scss"></style>
