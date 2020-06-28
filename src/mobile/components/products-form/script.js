import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    props: {
      required: true
    },
    type: {
      type: String,
      default: "Video"
    },
    data: {
      required: true
    }
  }
})
export default class ProductsForm extends Vue {
  list = {
    items: []
  };

  add() {
    window.open("/#/products/products/list/form");
  }

  async showListSelect() {
    if (!this.list.items[0]) {
      this.list = await this.getList();
    }
    this.$refs.listSelect.show();
  }

  handleSelect(items) {
    if (items[0]) {
      this.data.items = [...items, ...this.data.items];
    }
  }

  getList() {
    const where = this.isPlatform() ? { schoolId: {} } : null;

    return this.$store.dispatch(`products/getList`, {
      query: {
        where: {
          type: { $eq: this.props.type },
          ...where
        },
        order: [["order", "DESC"]]
      }
    });
  }
}
