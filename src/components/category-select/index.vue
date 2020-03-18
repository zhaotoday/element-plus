<template>
  <Select
    style="width: 190px"
    placeholder="请选择分类"
    clearable
    :multiple="multiple"
    :value.sync="value"
    @on-change="change"
  >
    <template v-for="item1 in items">
      <Option
        :key="item1.id"
        :value="item1.id"
        :label="item1.name"
        :disabled="!selectParent"
      >
        {{ item1.name }}
      </Option>
      <Option
        v-for="item2 in item1.children"
        :key="item2.id"
        :value="item2.id"
        :label="item2.name"
      >
        &nbsp;&nbsp;&nbsp;&nbsp;{{ item2.name }}
      </Option>
    </template>
  </Select>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import Model from "@/models/admin/categories";
import arrayToTree from "array-to-tree";

@Component({
  props: {
    alias: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectParent: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: 0
    }
  }
})
export default class CategorySelect extends Vue {
  items = [];

  async created() {
    const getRes = await new Model().GET({
      query: {
        where: { alias: this.alias }
      }
    });

    this.items = arrayToTree(getRes.data.items, {
      parentProperty: "parentId"
    });
  }

  change(val) {
    this.$emit("change", val);
  }
}
</script>
