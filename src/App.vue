<template lang="pug">
.app-container
  router-view(name="profile")
  router-view
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}

.app-container {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>

<style lang="scss" src="./App.scss"></style>
