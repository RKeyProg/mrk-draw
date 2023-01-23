<template lang="pug">
.input-component
  label
    input(
      :placeholder="title",
      v-bind="$attrs",
      :type="fieldType",
      :value="value",
      @input="$emit('input', $event.target.value)"
    ).input
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    fieldType: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped src="./InputComponent.scss"></style>
