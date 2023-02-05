<template lang="pug">
.avatar-component
  .photo(v-if="photo")
    img.photo__img
  .photo(v-else)
    base-icon.photo__icon(name="camera")
</template>

<script>
import BaseIcon from "../BaseIcon";
export default {
  components: {
    BaseIcon,
  },
  props: {
    photo: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped src="./BaseAvatar.scss"></style>
