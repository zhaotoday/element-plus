import { Component, Mixins } from "vue-property-decorator";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import FormMixin from "view-ui-admin/src/mixins/form";
import { mapState } from "vuex";

const module = "articles";

@Component({
  computed: mapState({
    detail: state => state[module].detail
  })
})
export default class extends Mixins(RouteParamsMixin, FormMixin) {
  data() {
    return {
      cForm: {
        model: this.getFormInitModel(),
        rules: {
          title: [
            {
              required: true,
              message: "标题不能为空"
            }
          ],
          content: [
            {
              required: true,
              message: "内容不能为空"
            }
          ]
        }
      }
    };
  }

  created() {
    this.id && this.getDetail(module, this.id);
  }

  getFormInitModel() {
    return {
      originalPrice: 0,
      price: 0,
      stock: 0,
      status: 1,
      content: ""
    };
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const {
          model: { id, ...restModel }
        } = this.cForm;
        const { data } = await this.$store.dispatch(
          `${module}/${id ? "put" : "post"}`,
          {
            id,
            body: restModel
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
