<template lang="pug">
.section-title
  h2 {{ title }}
  section-title-nav(v-if="simply && !isProjectPage")
  .rappid__toolbar-container(v-else)
</template>

<script>
import sectionTitleNav from "../sectionTitleNav";
import { mapState } from "vuex";

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
  computed: {
    ...mapState({
      isProjectPage: (state) => state.rappidStore.isProjectOpen,
    }),
  },
};
</script>
<style lang="scss" scoped src="./sectionTitleComponent.scss"></style>
