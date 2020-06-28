<template>
  <c-mini-list
    :items="list.items"
    selectable
    :multi-select="false"
    is-product
    @select="handleSelect"
  ></c-mini-list>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ProductList extends Vue {
  list = {
    items: []
  };

  async created() {
    this.list = await this.getList();
  }

  getList() {
    return this.$store.dispatch(`products/getList`, {
      query: {
        order: [["order", "DESC"]]
      }
    });
  }

  handleSelect(data) {
    this.$emit("select", data);
  }
}
</script>
