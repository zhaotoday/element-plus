import { Component, Mixins } from "vue-property-decorator";
import FormMixin from "view-ui-admin/src/mixins/form";

const module = "points";

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
          schoolId: [
            {
              required: true,
              message: "校区不能为空"
            }
          ],
          wxUserId: [
            {
              required: true,
              message: "微信用户不能为空"
            }
          ],
          value: [
            {
              asyncValidator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (!value) {
                    reject("佣金不能为 0 或为空");
                  } else {
                    resolve();
                  }
                });
              }
            }
          ]
        }
      }
    };
  }

  getFormInitModel() {
    return {
      value: 0
    };
  }

  async show() {
    this.cForm.modal = true;
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const { model } = this.cForm;

        await this.$store.dispatch(`${module}/postAction`, {
          action: "increaseOrDecrease",
          body: model
        });

        this.cForm.modal = false;
        this.$Message.success("操作成功");
        this.$emit("get-list");
      }

      this.fixFormButtonLoading();
    });
  }
}
