import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheHeader extends Vue {
  get user() {
    return this.$auth.get()["user"];
  }

  logout() {
    this.$router.push("/logout");
    this.$Message.success("退出成功");
  }
}
