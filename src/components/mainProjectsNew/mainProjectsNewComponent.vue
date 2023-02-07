<template lang="pug">
.new-project
  .new-project__title Новый проект
  .new-project__inputs
    base-input.new-project__input(
      placeholder="Имя файла",
      v-model="this.project.title"
    )
    base-input.new-project__input(
      placeholder="Проект",
      v-model="this.project.name"
    )
    base-input.new-project__input(placeholder="Тип файла")
  .new-project__send
    base-button(customType="fill", @click="$emit('handleClick')") Создать
</template>

<script>
import BaseInput from "../BaseInput";
import BaseButton from "../BaseButton";
export default {
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      project: {
        title: "",
        name: "",
      },
    };
  },
};
</script>

<style lang="sss" scoped src="./mainProjectsNewComponent.scss"></style>
