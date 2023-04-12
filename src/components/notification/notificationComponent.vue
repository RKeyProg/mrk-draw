<template lang="pug">
div(:class="['inner-tooltip-container', type]")
  .tooltip__text {{ text }}
  base-icon.tooltip__close(name="cross")
</template>

<script>
import BaseIcon from "../BaseIcon";
export default {
  components: {
    BaseIcon,
  },
  props: {
    type: {
      type: String,
      default: "success",
    },
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped src="./notificationComponent.scss"></style>
