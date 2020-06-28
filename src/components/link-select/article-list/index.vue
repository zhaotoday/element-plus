<template>
  <c-mini-list
    :items="list.items"
    selectable
    :multi-select="false"
    @select="handleSelect"
  ></c-mini-list>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ArticleList extends Vue {
  list = {
    items: []
  };

  async created() {
    this.list = await this.getList();
  }

  getList() {
    return this.$store.dispatch(`articles/getList`, {
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
