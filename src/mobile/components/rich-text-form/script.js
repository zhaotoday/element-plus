import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    props: {
      required: true
    }
  }
})
export default class RichTextForm extends Vue {}
