<template lang="pug">
.input-component
  input.input(
    v-if="type !== 'file'",
    v-bind="$attrs",
    :type="type",
    @input="$emit('input', $event.target.value)"
  )
  input.input(
    v-else-if="type === 'file'",
    v-bind="$attrs",
    :type="type",
  )
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style lang="scss" scoped src="./InputComponent.scss"></style>
