<template lang="pug">
.main
  .section__healine
    section-title(title="Главная")
  .section__container
    component(:is="currentComponent")
</template>

<script>
import sectionTitle from "../../components/sectionTitle";
import mainProjects from "../../components/mainProjects";
import mainSettings from "../../components/mainSettings";
import mainTrash from "../../components/mainTrash";
import { mapState } from "vuex";

export default {
  components: {
    sectionTitle,
    mainProjects,
    mainSettings,
    mainTrash,
  },
  computed: {
    ...mapState({
      currentComponent: (state) => state.main.currentComponent,
    }),
  },
};
</script>
