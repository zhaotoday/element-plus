import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    name: {
      type: String,
      default: ""
    },
    primaryColor: {
      type: String,
      default: ""
    }
  }
})
export default class Global extends Vue {}
