<template>
  <Dropdown @on-click="handleClickItem">
    <Button :style="{ width: `${width}px` }">
      {{ title }}
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
    width: {
      type: Number,
      default: 70
    },
    title: {
      type: String,
      default: ''
    },
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
