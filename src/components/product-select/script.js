import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Model from "@/models/admin/products";

@Component
export default class ProductSelect extends Vue {
  @Prop({
    type: String,
    default: "请选择商品"
  })
  placeholder;

  @Prop({
    type: Boolean,
    default: false
  })
  multiple;

  @Prop({
    type: [Array, String, Number],
    default: ""
  })
  value;

  items = [];

  async created() {
    const {
      data: { items }
    } = await new Model().GET({});
    this.items = items;
  }

  @Emit()
  change(value) {
    return value;
  }
}
