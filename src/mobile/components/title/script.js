import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    title: {
      type: String,
      default: ""
    },
    showChange: {
      type: Boolean,
      default: false
    },
    showMore: {
      type: Boolean,
      default: false
    }
  }
})
export default class Title extends Vue {}
