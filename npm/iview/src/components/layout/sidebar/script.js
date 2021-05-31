import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheSidebar extends Vue {
  activeName = "";
  openNames = [];

  created() {
    this.update();
  }

  handleSelect(name) {
    this.$router.push(name);
  }

  update(route) {
    const path = route ? route.path : this.$route.path;
    const paths = path.split("/");
    this.openNames = [paths[1]];
    this.activeName =
      paths.length === 5
        ? `/${paths[1]}/${paths[2]}/list`
        : `/${paths[1]}/${paths[2]}/${paths[3]}`;

    this.$nextTick(() => {
      this.$refs.menu.updateActiveName();
      this.$refs.menu.$children.forEach(item => {
        item.opened = false;
      });
      this.$refs.menu.updateOpened();
    });
  }
}
