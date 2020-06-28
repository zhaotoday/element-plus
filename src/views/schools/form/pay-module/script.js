import { Component, Vue } from "vue-property-decorator";
import Form from "@/views/schools/form/pay-module/form";

@Component({
  components: {
    "c-form": Form
  },
  props: {
    formModel: {
      type: Object,
      default: () => ({})
    }
  }
})
export default class PayModule extends Vue {
  data() {
    return {
      column: [
        {
          title: "模块",
          key: "label"
        },
        {
          title: "过期时间",
          width: 150,
          render: (h, { row }) =>
            h("span", this.formModel.payModules[row.value].expiresAt)
        },
        {
          title: "状态",
          width: 66,
          render: (h, { row }) =>
            h(
              "span",
              this.$helpers.getItem(
                this.dicts.EnableStatus,
                "value",
                this.formModel.payModules[row.value].enabled
              )["label"]
            )
        },
        {
          title: "操作",
          width: 90,
          render: (h, { row }) =>
            h(
              "Button",
              {
                props: {
                  size: "small"
                },
                on: {
                  click: () => {
                    this.$refs.form.show(row);
                  }
                }
              },
              "设置"
            )
        }
      ]
    };
  }
}
