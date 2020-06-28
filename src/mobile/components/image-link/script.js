import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    imageId: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: ""
    },
    maxWidth: {
      type: Number,
      default: 100
    }
  }
})
export default class ImageLink extends Vue {}
