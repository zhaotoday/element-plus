<template>
  <Select
    style="width: 190px"
    placeholder="请选择分类"
    clearable
    :multiple="multiple"
    :value.sync="value"
    @on-change="change">
    <template v-for="item1 in items">
      <Option
        :key="item1.id"
        :value="item1.id"
        :disabled="!selectParent">
        <span style="font-size: 14px;">{{ item1.name }}</span>
      </Option>
      <Option
        v-for="item2 in item1.children"
        :value="item2.id"
        :key="item2.id">
        &nbsp;&nbsp;&nbsp;&nbsp;{{ item2.name }}
      </Option>
    </template>
  </Select>
</template>

<script>
import Model from '@/models/admin/categories'
import arrayToTree from 'array-to-tree'

export default {
  name: 'CCategories',
  props: {
    alias: {
      type: String,
      default: ''
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
  },
  data () {
    return {
      items: []
    }
  },
  async created () {
    const getRes = await new Model().GET({
      query: {
        offset: 0,
        limit: 1000,
        where: { alias: this.alias }
      }
    })

    this.items = arrayToTree(getRes.data.items, {
      parentProperty: 'parentId'
    })
  },
  methods: {
    change (val) {
      this.$emit('on-change', val)
    }
  }
}
</script>
