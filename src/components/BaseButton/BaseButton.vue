<template lang="pug">
.btn-component
  button.btn.btn_type_fill(
    v-if="customType === 'fill'",
    @click="$emit('handleClick')",
    :disabled="disabled"
  )
    slot
  button.btn.btn_type_transparent(
    v-else-if="customType === 'transparent'",
    @click="$emit('handleClick')",
    :disabled="disabled"
  )
    slot
  button.btn.btn_type_icon(
    v-if="customType === 'trash'",
    @click="$emit('handleClick')",
    :disabled="disabled"
  )
    base-icon.btn__icon(:name="customType")
</template>

<script>
import BaseIcon from "../BaseIcon";
export default {
  components: {
    BaseIcon,
  },
  props: {
    disabled: Boolean,
    transparent: {
      type: Boolean,
      default: false,
    },
    customType: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style lang="scss" scoped src="./BaseButton.scss"></style>
