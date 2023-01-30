<template lang="pug">
.section-navigation
  nav
    ul.navigation__list
      li(
        v-for="item in navList",
        :key="item.id",
        :class="['navigation__item', { active: item.active }]"
      ) 
        a {{ item.title }}
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          id: 1,
          title: "Мой профиль",
          active: true,
        },
        {
          id: 1,
          title: "Мои проекты",
          active: false,
        },
        {
          id: 1,
          title: "Приватность",
          active: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./sectionTitleNavComponent.scss"></style>
