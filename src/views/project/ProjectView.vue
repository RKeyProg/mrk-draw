<template lang="pug">
.project
  .section__headline
    section-title(:title="currentProject.title")
  work-space.project__work-space
</template>

<script>
import sectionTitle from "../../components/sectionTitle";
import workSpace from "../../components/workSpace";
import { mapGetters } from "vuex";

export default {
  name: "ProjectView",
  components: {
    sectionTitle,
    workSpace,
  },
  data() {
    return {
      currentProject: {},
    };
  },
  computed: {
    ...mapGetters({
      getCurrentProject: "user/getCurrentProject",
    }),
  },
  mounted() {
    const id = Number(this.$route.params.id);
    this.currentProject = this.getCurrentProject(id)[0];
  },
};
</script>
