import { Component, Mixins } from "vue-property-decorator";
import FormMixin from "view-ui-admin/src/mixins/form";

const module = "ads";

@Component
export default class ListForm extends Mixins(FormMixin) {
  data() {
    return {
      cForm: {
        id: 0,
        modal: false,
        loading: true,
        model: this.getFormInitModel(),
        rules: {
          title: [
            {
              required: true,
              message: "标题不能为空"
            }
          ],
          pictureId: [
            {
              required: true,
              message: "图片不能为空"
            }
          ]
        }
      }
    };
  }

  getFormInitModel() {
    return {
      status: 1
    };
  }

  show(detail) {
    this.cForm.modal = true;

    if (detail && detail.id) {
      this.cForm.id = detail.id;
      this.initFormFields(detail);
    } else {
      this.cForm.id = 0;
    }
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const { id, model } = this.cForm;
        const { data } = await this.$store.dispatch(
          `${module}/${id ? "put" : "post"}`,
          {
            id,
            body: model
          }
        );

        this.cForm.modal = false;
        this.$Message.success(`${id ? "编辑" : "新增"}成功`);
        this.$emit("get-list", data);
      }

      this.fixFormButtonLoading();
    });
  }
}
