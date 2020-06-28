import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
})
export default class Shortcuts extends Vue {
  goLink(item) {
    window.location.href = item.link;
  }
}
