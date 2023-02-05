<template lang="pug">
.btn-component
  button.btn.btn_type_icon(
    v-if="type === 'delete'",
    v-bind="$attrs",
    @click="$emit('handleClick')",
    :disabled="disabled"
  )
    base-icon.btn__icon(name="trash")
  button(
    v-else-if="type === 'text'",
    v-bind="$attrs",
    @click="$emit('handleClick')",
    :disabled="disabled",
    :class="['btn', 'btn__default', { btn_bg_transparent: transparent }]"
  )
    slot
</template>

<script>
import BaseIcon from "../BaseIcon";
export default {
  components: {
    BaseIcon,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style lang="scss" scoped src="./BaseButton.scss"></style>
