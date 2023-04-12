<template lang="pug">
.project-list(v-if="projects.length")
  .projects__title
    span Имя файла
    span Вид схемы БД
    span Последняя активность
  ul.project__menu(v-for="project in projects", :key="project.id")
    li.project__item
      router-link.item__link(:to="`/project/${project.id}`")
        project-list-item(:project="project", :editable="editable")
.project-list__not-exist(v-else) Сохраненные проекты не найдены
</template>

<script>
import projectListItem from "../projectListItem";

export default {
  components: {
    projectListItem,
  },
  props: {
    projects: Array,
    editable: Boolean,
  },
};
</script>

<style lang="scss" scoped src="./projectListComponent.scss"></style>
