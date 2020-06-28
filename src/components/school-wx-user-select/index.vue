<template>
  <Select
    :placeholder="placeholder"
    clearable
    filterable
    :multiple="multiple"
    :value.sync="value"
    @on-change="change"
  >
    <Option
      v-for="item in list.items"
      :key="item.wxUser.id"
      :value="item.wxUser.id"
      :label="item.wxUser.nickName"
    >
      {{ item.wxUser.nickName }}
    </Option>
  </Select>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import Model from "@/models/admin/school-wx-users";

@Component({
  props: {
    placeholder: {
      type: String,
      default: "请选择微信用户"
    },
    value: {
      type: [String, Number],
      default: 0
    },
    multiple: {
      type: Boolean,
      default: false
    },
    schoolId: {
      type: Number,
      default: 0
    }
  }
})
export default class SchoolWxUserSelect extends Vue {
  list = {
    items: []
  };

  @Watch("schoolId", { immediate: true, deep: true })
  async onSchoolIdChange(newVal) {
    if (newVal) {
      this.list = await this.getList();
    } else {
      this.list.items = [];
    }
  }

  async getList() {
    const { data } = await new Model().GET({
      query: {
        where: {
          schoolId: this.schoolId
        },
        include: [{ model: "WxUser", as: "wxUser" }]
      }
    });
    return data;
  }

  change(value) {
    this.$emit("change", value);
  }
}
</script>
