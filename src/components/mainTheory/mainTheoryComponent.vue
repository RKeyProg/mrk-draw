<template lang="pug">
.main-theory
  .video
    youtube-iframe(video-id="xV9kH0ozcak", width="100%", height="100%")
  ul.files
    li
      base-button.file__btn(
        customType="file",
        @click="openDocument('files/Концептуальное проектирование.docx')"
      ) Концептуальное проектирование
    li
      base-button.file__btn(
        customType="file",
        @click="openDocument('files/Логическое проектирование.docx')"
      ) Логическое проектирование
    li
      base-button.file__btn(
        customType="file",
        @click="openDocument('files/Общая_методология_проектирования.docx')"
      ) Общая методология проектирования
    li
      base-button.file__btn(
        customType="file",
        @click="openDocument('files/Проектирование БД.docx')"
      ) Проектирование БД
    li
      base-button.file__btn(
        customType="file",
        @click="openDocument('files/Физическое проектирование.docx')"
      ) Физическое проектирование
</template>

<script>
import { YoutubeIframe } from "@vue-youtube/component";
import BaseButton from "../BaseButton";
export default {
  components: {
    YoutubeIframe,
    BaseButton,
  },
  methods: {
    openDocument(path) {
      window.open(path, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped src="./mainTheoryComponent.scss"></style>
