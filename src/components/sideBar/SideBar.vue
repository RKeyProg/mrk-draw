<template lang="pug">
.side-bar__container
  section.side-bar
    router-link.side-bar__logo(to="/")
      svg(viewBox="0 0 90.001 90.001", preserveAspe)
        use(xlink:href="../../assets/icons/logo.svg#logo")
    router-link.side-bar__user(to="/login")
      svg(viewBox="0 0 512.001 512.001", preserveAspe)
        use(xlink:href="../../assets/icons/user.svg#user") 
</template>

<script>
export default {};
</script>

<style lang="scss" src="./sideBar.scss"></style>
