<template lang="pug">
.main-projects
  .main-projects__create
    button.main__new-project(
      v-if="!isNewProjectCreating",
      @click="changeCardView"
    )
      .new-project__circle
      span Новый проект
    mainProjectsNew(v-else, @changeCardView="changeCardView")
  project-list(:projects="getProjects")
</template>

<script>
import projectList from "../projectList";
import mainProjectsNew from "../mainProjectsNew";
import { mapState } from "vuex";

export default {
  components: {
    projectList,
    mainProjectsNew,
  },
  data() {
    return {
      isNewProjectCreating: false,
    };
  },
  computed: {
    ...mapState({
      projects: (state) => state.user.projects,
    }),
    getProjects() {
      return this.projects.map((item) => {
        let activity = item.activity;
        let thisDay = new Date();
        let calculateDay = Math.floor((thisDay - activity) / 86400000);
        if (calculateDay < 1) {
          activity = "Сегодня";
        } else if (calculateDay === 1) {
          activity = `${calculateDay} день назад`;
        } else if (
          (calculateDay % 10 === 2 ||
            calculateDay % 10 === 3 ||
            calculateDay % 10 === 4) &&
          (calculateDay < 12 || calculateDay > 14)
        ) {
          activity = `${calculateDay} дня назад`;
        } else {
          activity = `${calculateDay} дней назад`;
        }

        // создаем новый объект с помощью оператора spread
        const newItem = { ...item, activity };
        return newItem;
      });
    },
  },
  methods: {
    changeCardView() {
      this.isNewProjectCreating = !this.isNewProjectCreating;
    },
  },
};
</script>

<style lang="scss" scoped src="./mainProjectsComponent.scss"></style>
