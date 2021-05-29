import { Component, Vue } from "vue-property-decorator";
import TheSidebar from "./sidebar";
import TheMain from "./main";

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
