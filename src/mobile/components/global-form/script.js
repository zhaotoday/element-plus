import { Vue, Component } from "vue-property-decorator";
import FormMixin from "view-ui-admin/src/mixins/form";

@Component({
  mixins: [FormMixin],
  props: {
    props: {
      required: true
    }
  }
})
export default class GlobalForm extends Vue {
  cForm = {
    rules: {
      name: {
        required: true,
        message: "请输入校区名称"
      }
    }
  };

  handleChange() {
    this.$helpers.addStyle(this.props.primaryColor);
  }
}
