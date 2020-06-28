import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
})
export default class Notice extends Vue {
  goLink() {
    this.$wx.navigateTo({
      url: `/pages/notices/detail/index?id=${this.items[0].id}`
    });
  }
}
