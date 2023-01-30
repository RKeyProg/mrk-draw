<template lang="pug">
.section-title
  h2 Мой профиль
  app-section-nav
</template>

<script>
import appSectionNav from "../sectionTitleNav";

export default {
  components: {
    appSectionNav,
  },
};
</script>
<style lang="scss" src="./sectionTitleComponent.scss"></style>
