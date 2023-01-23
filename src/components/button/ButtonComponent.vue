<template lang="pug">
.btn-component
  button.button(v-bind="$attrs", @click="$emit('handleClick')", :disabled="disabled")
    slot
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped src="./ButtonComponent.scss"></style>
