<template>
  <Poptip
    confirm
    title="确认删除？"
    @on-ok="$emit('ok')"
    ok-text="确认"
    cancel-text="取消"
  >
    <Button>删除</Button>
  </Poptip>
</template>

<script>
export default {
  name: "CDel"
};
</script>
