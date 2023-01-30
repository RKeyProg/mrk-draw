<template lang="pug">
.side-bar__container
  section.side-bar
    router-link.side-bar__logo(to="/")
      appIcon(name="logo").side-bar__logo
    nav
      ul
        li.nav__item(v-for="item in navList", :key="item.id")
          router-link.side-bar__exit(to="/login")
            appIcon(name="home")
    router-link.side-bar__exit(to="/login")
      appIcon(name="exit").side-bar__exit 
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
          viewBox: "0 0 512.001 512.001",
          path: "user",
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./sideBar.scss"></style>
