import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    content: {
      type: String,
      default: ""
    }
  }
})
export default class RichText extends Vue {}
