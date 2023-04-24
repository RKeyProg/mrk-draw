<template lang="pug">
.project-list(v-if="projects.length")
  .projects__title
    span Имя файла
    span Вид схемы БД
    span Последняя активность
  ul.project__menu(v-for="project in projects", :key="project.id")
    li.project__item
      .item__link(@click="openProject(project.id)")
        project-list-item(:project="project", :editable="editable")
.project-list__not-exist(v-else) Сохраненные проекты не найдены
</template>

<script>
import projectListItem from "../projectListItem";
import { mapActions } from "vuex";
import $axios from "../../request";

export default {
  components: {
    projectListItem,
  },
  props: {
    projects: Array,
    editable: Boolean,
  },
  methods: {
    ...mapActions({
      setCurrentProjectId: "user/setCurrentProject",
      setCurrentProject: "user/setCurrentProject",
      showTooltip: "tooltips/show",
    }),
    async openProject(projectId) {
      try {
        const response = await $axios.post("/getProjectSave", { projectId });

        const currentProject = {
          id: projectId,
          json: JSON.stringify(response.data),
        };

        this.setCurrentProject(currentProject);

        this.$nextTick(() => {
          this.$router.replace(`/project/${projectId}`);
        });
      } catch (error) {
        this.showTooltip({
          text: error.response.data.message,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./projectListComponent.scss"></style>
