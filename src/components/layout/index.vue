<template>
  <div>
    <the-sidebar ref="sidebar"></the-sidebar>
    <the-main></the-main>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import TheSidebar from "./components/sidebar";
import TheMain from "./components/main";

@Component({
  components: {
    TheSidebar,
    TheMain
  }
})
export default class TheLayout extends Vue {
  beforeRouteUpdate(to, from, next) {
    this.$nextTick(() => {
      this.$refs.sidebar.update(to);
    });
    next();
  }
}
</script>
