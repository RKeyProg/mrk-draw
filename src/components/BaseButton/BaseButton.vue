<template lang="pug">
.btn-component
  button.btn.btn_type_fill(
    v-if="customType === 'submit'",
    type="submit",
    :disabled="disabled"
  )
    slot
  button.btn.btn_type_fill(
    v-if="customType === 'fill'",
    @click="$emit('handleClick')",
    type="button",
    :disabled="disabled"
  )
    slot
  button.btn.btn_type_transparent(
    v-else-if="customType === 'transparent'",
    @click="$emit('handleClick')",
    type="button",
    :disabled="disabled"
  )
    slot
  button.btn.btn_type_icon(
    v-if="customType === 'icon'",
    @click="$emit('handleClick')",
    type="button",
    :disabled="disabled"
  )
    base-icon.btn__icon(:name="name")
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
    name: {
      type: String,
      default: "trash",
    },
  },
};
</script>

<style lang="scss" scoped src="./BaseButton.scss"></style>
