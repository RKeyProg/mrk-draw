<template lang="pug">
.avatar-component
  .photo(
    v-if="this.preview",
    :style="{ backgroundImage: `url(${this.preview})` }"
  )
  .photo(v-else)
    base-icon.photo__icon(name="camera")
</template>

<script>
import BaseIcon from "../BaseIcon";
import BaseInput from "../BaseInput";
import { mapState } from "vuex";

export default {
  components: {
    BaseIcon,
    BaseInput,
  },
  data() {
    return {
      avatarIsHovered: false,
    };
  },
  computed: {
    ...mapState({
      preview: (state) => state.user.preview,
    }),
  },
};
</script>

<style lang="scss" scoped src="./BaseAvatar.scss"></style>
