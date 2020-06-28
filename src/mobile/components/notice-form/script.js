import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    data: {
      required: true
    }
  }
})
export default class BrandsForm extends Vue {
  list = {
    items: []
  };

  add() {
    window.open("/#/dresses/notices/list/form");
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
    return this.$store.dispatch(`notices/getList`, {
      query: {
        order: [["order", "DESC"]]
      }
    });
  }
}
