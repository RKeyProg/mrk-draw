<template lang="pug">
.section-title
  h2 {{ title }}
  section-title-nav
</template>

<script>
import sectionTitleNav from "../sectionTitleNav";

export default {
  components: {
    sectionTitleNav,
  },
  props: {
    title: {
      type: String,
      default: "Untitled",
    },
  },
};
</script>
<style lang="scss" scoped src="./sectionTitleComponent.scss"></style>
