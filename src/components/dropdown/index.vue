<template>
  <Dropdown @on-click="handleClickItem">
    <Button style="width: 100px;">
      审核不通过
      <Icon type="ios-arrow-down"></Icon>
    </Button>
    <DropdownMenu slot="list">
      <DropdownItem
        v-for="item in options"
        :key="item.value"
        :name="item.value">
        {{ item.label }}
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'CDropdown',
  props: {
    selected: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClickItem (name) {
      this.$emit('click', name)
    }
  }
}
</script>
