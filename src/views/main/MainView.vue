<template lang="pug">
.main 
  section-title(title="Главная", :navigation="navList")
</template>

<script>
import sectionTitle from "./../../components/sectionTitle";
export default {
  components: {
    sectionTitle,
  },
  data() {
    return {
      navList: [
        {
          id: 1,
          title: "Проекты",
          active: true,
        },
        {
          id: 2,
          title: "Настройки",
          active: false,
        },
        {
          id: 2,
          title: "Корзина",
          active: false,
        },
      ],
    };
  },
};
</script>
