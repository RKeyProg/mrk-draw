<template lang="pug">
.section-title
  h2 {{ title }}
  section-title-nav(v-if="simply")
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
    simply: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped src="./sectionTitleComponent.scss"></style>
