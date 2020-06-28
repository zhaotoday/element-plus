import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    props: {
      required: true
    }
  }
})
export default class SearchForm extends Vue {
  cForm = {
    rules: {}
  };
}
