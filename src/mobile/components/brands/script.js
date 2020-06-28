import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    }
  }
})
export default class Brands extends Vue {
  goLink(url) {
    if (url) {
      window.location.href = url;
    }
  }
}
