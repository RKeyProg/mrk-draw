<template lang="pug">
.section-navigation
  nav
    ul.navigation__list
      li(
        v-for="item in navigation",
        :key="item.id",
        :class="['navigation__item', { active: item.active }]"
      ) 
        base-button(
          customType="transparent",
          @click="changeCurrentComponent(item)"
        ) {{ item.title }}
</template>

<script>
import BaseButton from "../BaseButton";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    BaseButton,
  },
  methods: {
    ...mapActions({
      setMainCurrentComponent: "main/setCurrentComponent",
      setProfileCurrentComponent: "profile/setCurrentComponent",
    }),
    changeCurrentComponent(currentComponent) {
      switch (this.$route.name) {
        case "profile":
          this.setProfileCurrentComponent(currentComponent);
          break;
        case "main":
          this.setMainCurrentComponent(currentComponent);
          break;
        default:
          break;
      }
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
