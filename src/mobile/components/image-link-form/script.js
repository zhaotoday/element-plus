import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    props: {
      required: true
    }
  }
})
export default class ImageLinkForm extends Vue {
  list = {
    items: []
  };

  handleSelect(link) {
    this.props.link = link;
  }
}
