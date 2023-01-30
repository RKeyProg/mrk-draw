<template lang="pug">
.avatar-component
  .photo(v-if="photo")
    img.photo__img
  .photo(v-else)
    svg.photo__icon(viewBox="0 0 512.001 512.001", preserveAspectRatio="none")
      use(xlink:href="../../assets/icons/camera.svg#camera")
</template>

<script>
export default {
  props: {
    photo: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped src="./avatarComponent.scss"></style>
