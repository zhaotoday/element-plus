<template>
  <div>
    <TheSidebar ref="sidebar" />
    <TheMain />
  </div>
</template>

<script>
import TheSidebar from "./components/sidebar";
import TheMain from "./components/main";

export default {
  name: "TheLayout",
  components: {
    TheSidebar,
    TheMain
  },
  beforeRouteUpdate(to, from, next) {
    this.$nextTick(() => {
      this.$refs.sidebar.update(to);
    });
    next();
  }
};
</script>
