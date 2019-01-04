<template>
  <div>
    <Select
      style="width: 220px"
      placeholder="请选择分类"
      clearable
      :value.sync="value"
      @on-change="change">
      <template v-for="item1 in items">
        <OptionGroup
          v-if="!!item1.children"
          :label="item1.title">
          <Option
            v-for="item2 in item1.children"
            :value="item2.id"
            :key="item2.id">
            {{ item2.title }}
          </Option>
        </OptionGroup>
        <Option
          v-else
          :value="item1.id"
          :key="item1.id">
          {{ item1.title }}
        </Option>
      </template>
    </Select>
  </div>
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
