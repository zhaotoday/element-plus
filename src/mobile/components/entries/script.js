import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
})
export default class Entries extends Vue {
  cFollowOa = {
    visible: false,
    qrCodePictureId: 0
  };

  goLink(item) {
    switch (item.event) {
      case "OpenLink":
        window.href = item.link;
        break;

      case "OpenCategory":
        this.$wx.navigateTo({
          url: `/pages/products/list/index?categoryId=${item.categoryId}`
        });
        break;

      case "FollowOa":
        this.cFollowOa.qrCodePictureId = item.qrCodePictureId;
        this.cFollowOa.visible = true;
        break;

      default:
        break;
    }
  }
}
