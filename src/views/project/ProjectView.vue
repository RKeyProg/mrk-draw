<template lang="pug">
.project
  .section__headline
    section-title(:title="currentProject.title")
  work-space.project__work-space
</template>

<script>
import sectionTitle from "../../components/sectionTitle";
import workSpace from "../../components/workSpace";
import { mapGetters, mapActions } from "vuex";

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
  methods: {
    ...mapActions({
      changeIsShowStencil: "rappidStore/changeIsShowStencil",
      changeIsProjectOpen: "rappidStore/changeIsProjectOpen",
    }),
  },
  computed: {
    ...mapGetters({
      getCurrentProject: "user/getCurrentProject",
    }),
  },
  mounted() {
    this.changeIsProjectOpen();
    const id = Number(this.$route.params.id);
    this.currentProject = this.getCurrentProject(id)[0];
  },
  unmounted() {
    this.changeIsProjectOpen();
  },
};
</script>
