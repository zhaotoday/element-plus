import { Component, Mixins } from "vue-property-decorator";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import FormMixin from "view-ui-admin/src/mixins/form";
import { mapState } from "vuex";

const module = "products";

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
          name: [
            {
              required: true,
              message: "名称不能为空"
            }
          ],
          categoryId: [
            {
              required: true,
              message: "分类不能为空"
            }
          ],
          type: [
            {
              required: true,
              message: "类型不能为空"
            }
          ],
          pictureIds: [
            {
              required: true,
              message: "图片不能为空"
            }
          ],
          content: [
            {
              required: true,
              message: "详情不能为空"
            }
          ]
        }
      },
      formField: {
        key: 0,
        label: ""
      }
    };
  }

  async created() {
    this.id && this.getDetail(module, this.id);
  }

  getFormInitModel() {
    return {
      originalPrice: 0,
      price: 0,
      commissionRate: 0,
      stock: 0,
      sales: 0,
      status: 1
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
