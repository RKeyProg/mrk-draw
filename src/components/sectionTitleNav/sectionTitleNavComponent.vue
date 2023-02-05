<template lang="pug">
.section-navigation
  nav
    ul.navigation__list
      li(
        v-for="item in navigation",
        :key="item.id",
        :class="['navigation__item', { active: item.active }]"
      ) 
        base-button(transparent, @handleClick="changePage(item)") {{ item.title }}
</template>

<script>
import BaseButton from "../BaseButton";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    BaseButton,
  },
  methods: {
    ...mapActions(["setCurrentComponent"]),
    changePage(currentComponent) {
      currentComponent.active = true;
      this.setCurrentComponent(currentComponent);
      console.log(currentComponent);
    },
  },
  computed: {
    ...mapState({
      navigation: function (state) {
        return state[this.$route.name].componentNavigation;
      },
    }),
  },
};
</script>

<style lang="scss" scoped src="./sectionTitleNavComponent.scss"></style>
