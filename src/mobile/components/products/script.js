import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    modifier: {
      type: String,
      default: "vertical"
    },
    title: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    },
    showChange: {
      type: Boolean,
      default: false
    },
    showMore: {
      type: Boolean,
      default: false
    },
    showExtInfo: {
      type: Boolean,
      default: true
    }
  }
})
export default class Products extends Vue {}
