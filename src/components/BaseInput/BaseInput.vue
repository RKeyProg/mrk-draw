<template lang="pug">
.input-component
  input.input(
    v-if="type !== 'file'",
    v-bind="$attrs",
    :type="type",
    :value="modelValue",
    @input="$emit('update:modelValue', $event.target.value)"
  )
  input.input(
    v-else-if="type === 'file'",
    v-bind="$attrs",
    :type="type",
    @change="$emit('handleChange', $event.target.files[0])"
  )
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped src="./BaseInput.scss"></style>
