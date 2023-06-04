<template lang="pug">
.main
  .section__healine
    section-title(title="Главная", simply)
  .section__container
    component(:is="currentComponent")
</template>

<script>
import sectionTitle from "../../components/sectionTitle";
import mainProjects from "../../components/mainProjects";
import mainTheory from "../../components/mainTheory";
import mainTrash from "../../components/mainTrash";
import { mapState } from "vuex";

export default {
  components: {
    sectionTitle,
    mainProjects,
    mainTheory,
    mainTrash,
  },
  computed: {
    ...mapState({
      currentComponent: (state) => state.main.currentComponent,
    }),
  },
};
</script>
