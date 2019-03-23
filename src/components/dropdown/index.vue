<template>
  <Dropdown
    style="margin-left: 10px"
    @on-click="handleClickItem">
    <Button style="width: 100px;">
      {{ selected.label }}
      <Icon type="ios-arrow-down"></Icon>
    </Button>
    <DropdownMenu slot="list">
      <DropdownItem
        v-for="item in options"
        name="0">
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
