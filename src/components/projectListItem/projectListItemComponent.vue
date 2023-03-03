<template lang="pug">
.project-item
  base-button.project__remove(
    v-if="editable",
    customType="icon",
    name="trash",
    @click="removeExistedProject"
  )
  .project__file
    .project__preview
      base-icon.project__icon(name="user")
    .project__title {{ project.title }}
  .project__name {{ project.name }}
  .project__last-active {{ project.activity }}
</template>

<script>
import BaseIcon from "../BaseIcon";
import BaseButton from "../BaseButton";
import { mapActions } from "vuex";

export default {
  components: {
    BaseIcon,
    BaseButton,
  },
  props: {
    project: Object,
    editable: Boolean,
  },
  methods: {
    ...mapActions({
      removeProject: "user/removeProject",
    }),
    removeExistedProject() {
      this.removeProject(this.project.id);
    },
  },
};
</script>

<style lang="scss" scoped src="./projectListItemComponent.scss"></style>
