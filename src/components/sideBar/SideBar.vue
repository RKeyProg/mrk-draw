<template lang="pug">
div(:class="['side-bar__container', { stencil: isShowStencil }]")
  section.side-bar(v-if="!isProjectOpen")
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
  section.side-bar.project__toolbar(v-else)
    router-link.side-bar__logo(to="/")
      base-icon.side-bar__logo(name="logo")
    transition(name="fade", mode="out-in")
      .toolbar(v-if="!isShowStencil")
        base-button.toolbar__btn(customType="icon", name="exportsvg")
        base-button.toolbar__btn(customType="icon", name="exportpng")
        base-button.toolbar__btn(customType="icon", name="print")
      #stencil__container(v-else)
    base-button.project__wrench(
      customType="icon",
      name="wrench",
      @handleClick="changeIsShowStencil()"
    )
</template>

<script>
import BaseIcon from "../BaseIcon";
import BaseButton from "../BaseButton";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    BaseIcon,
    BaseButton,
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
  methods: {
    ...mapActions({
      changeIsShowStencil: "rappidStore/changeIsShowStencil",
    }),
  },
  computed: {
    ...mapState({
      isShowStencil: (state) => state.rappidStore.isShowStencil,
      isProjectOpen: (state) => state.rappidStore.isProjectOpen,
    }),
  },
};
</script>

<style lang="scss" scoped src="./sideBar.scss"></style>
