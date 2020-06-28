<template>
  <Modal width="550" title="请选择链接" v-model.trim="cForm.modal">
    <div style="max-height: 400px; overflow-x: hidden; overflow-y: auto;">
      <Tabs value="name1">
        <TabPane label="图文链接" name="name1">
          <c-article-list @select="handleSelectArticle"></c-article-list>
        </TabPane>
        <TabPane label="商品链接" name="name2">
          <c-product-list @select="handleSelectProduct"></c-product-list>
        </TabPane>
      </Tabs>
    </div>
  </Modal>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ProductList from "@/components/link-select/product-list";
import ArticleList from "@/components/link-select/article-list";

@Component({
  components: {
    "c-product-list": ProductList,
    "c-article-list": ArticleList
  }
})
export default class LinkSelect extends Vue {
  cForm = {
    modal: false
  };

  show() {
    this.cForm.modal = true;
  }

  getLink({ type, data }) {
    const link = (() => {
      switch (type) {
        case "Product":
          return `/pages/products/detail/index?id=${data.id}`;
        case "Article":
          return `/pages/articles/detail/index?id=${data.id}`;
      }
    })();

    return link;
  }

  handleSelectProduct(data) {
    this.cForm.modal = false;
    this.$emit("select", this.getLink({ type: "Product", data }));
  }

  handleSelectArticle(data) {
    this.cForm.modal = false;
    this.$emit("select", this.getLink({ type: "Article", data }));
  }
}
</script>
