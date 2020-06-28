import { Component, Vue } from "vue-property-decorator";
import FormMixin from "view-ui-admin/src/mixins/form";
import dayjs from "dayjs";

@Component({
  mixins: [FormMixin],
  props: {
    formModel: {
      type: Object,
      default: () => ({})
    }
  }
})
export default class extends Vue {
  data() {
    return {
      moduleName: "",
      cForm: {
        id: 0,
        modal: false,
        model: this.getFormInitModel(),
        rules: {}
      }
    };
  }

  getFormInitModel() {
    return {
      expiresAt: "",
      enabled: 1
    };
  }

  show(row) {
    const moduleName = row.value;
    const { payModules: modules } = this.formModel;

    this.moduleName = row.value;
    this.cForm.modal = true;
    if (modules && modules[moduleName]) {
      this.cForm.model.expiresAt = modules[moduleName].expiresAt;
      this.cForm.model.enabled = modules[moduleName].enabled;
    } else {
      this.cForm.model.expiresAt = dayjs()
        .add(1, "year")
        .format("YYYY-MM-DD HH:mm:ss");
      this.cForm.model.enabled = 1;
    }
  }

  submit() {
    const { payModules } = this.formModel;

    if (!payModules) {
      this.formModel.payModules = {};
    }

    this.$set(
      this.formModel.payModules,
      this.moduleName,
      this.$helpers.deepCopy(this.cForm.model)
    );

    this.$Message.info("设置成功，保存表单后生效");
  }
}
