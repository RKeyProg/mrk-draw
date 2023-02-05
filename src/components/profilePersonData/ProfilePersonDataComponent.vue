<template lang="pug">
.person
  .person__content
    label
      base-avatar.person__avatar
    .person__data
      div 
        h3 Радкевич Анна Сергеевна
      div
        span Почта:
        span anna_radk@mail.ru
      div
        span Группа:
        span 144691
  .person__settings
    base-button.person__btn(transparent) Редактировать профиль
    base-button.person__btn(transparent) Изменить пароль
</template>

<script>
import BaseAvatar from "../BaseAvatar";
import BaseButton from "../BaseButton";

export default {
  name: "profilePersonData",
  components: {
    BaseAvatar,
    BaseButton,
  },
};
</script>

<style lang="scss" src="./ProfilePersonDataComponent.scss" scoped></style>
