<template>
  <Select
    placeholder="请选择优惠券"
    clearable
    filterable
    :multiple="multiple"
    :value.sync="selectedItem.id"
    @on-change="change">
    <Option
      v-for="item in items"
      :key="item.id"
      :value="item.id"
      :disabled="!!selectedItems.find(coupon => coupon.id === item.id)">
      {{ item.name }}
    </Option>
  </Select>
</template>

<script>
import Model from '@/models/admin/coupons'

export default {
  name: 'CCouponSelect',
  props: {
    selectedItem: {
      type: Object,
      default: () => ({
        id: 0
      })
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      items: []
    }
  },
  async created () {
    this.items = await this.getList()
  },
  methods: {
    async getList () {
      const { data: { items } } = await new Model().GET({
        query: {
          offset: 0,
          limit: 1000
        }
      })

      return items
    },
    change (value) {
      const item = this.$helpers.getItemById(this.items, value)
      this.$emit('change', { ...item, number: 1 })
    }
  }
}
</script>
