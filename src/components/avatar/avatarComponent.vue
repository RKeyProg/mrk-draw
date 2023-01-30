<template lang="pug">
.avatar-component
  .photo(v-if="photo")
    img.photo__img
  .photo(v-else)
    app-icon(name="camera").photo__icon
</template>

<script>
import appIcon from "../icon";
export default {
  components: {
    appIcon,
  },
  props: {
    photo: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped src="./avatarComponent.scss"></style>
