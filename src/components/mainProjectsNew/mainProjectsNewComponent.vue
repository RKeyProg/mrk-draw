<template lang="pug">
.new-project
  .new-project__title Новый проект
  .new-project__controls
    .new-project__inputs
      base-input.new-project__input(
        placeholder="Имя файла",
        v-model="this.project.title",
        :error="validation.firstError('project.title')"
      )
      base-input.new-project__input(
        placeholder="Вид схемы БД",
        v-model="this.project.DBSheme",
        :error="validation.firstError('project.DBSheme')"
      )
    .new-project__send
      base-button.send__btn(customType="fill", @click="saveProject") Создать
      base-button.send__btn(
        customType="fill",
        @click="$emit('changeCardView')"
      ) Отмена
</template>

<script>
import { Validator } from "simple-vue-validator";
import BaseInput from "../BaseInput";
import BaseButton from "../BaseButton";
import { mapActions } from "vuex";

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "project.title"(value) {
      return Validator.value(value).required("Введите название");
    },
    "project.DBSheme"(value) {
      return Validator.value(value).required("Введите вид схемы");
    },
  },
  data() {
    return {
      project: {
        title: "",
        DBSheme: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addProject: "user/addProject",
    }),
    async saveProject() {
      if ((await this.$validate()) === false) return;

      this.addProject(this.project);
      this.$emit("changeCardView");
    },
  },
};
</script>

<style lang="sss" scoped src="./mainProjectsNewComponent.scss"></style>
