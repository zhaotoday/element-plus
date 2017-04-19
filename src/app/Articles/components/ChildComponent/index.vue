<template>
  <div>
    <p class="child-component" @click="click">child component</p>
    <p>propA: {{ propA }}</p>
    <p>propB: {{ propB }}</p>
    <p>propC: {{ propC }}</p>
    <p>propD: {{ propD }}</p>
    <p>propE: {{ propE }}</p>
    <p class="child-component-img"></p>
  </div>
</template>

<script>
  export default {
    name: 'child-component',
    props: {
      propA: [String, Number],
      propB: {
        type: String,
        required: true
      },
      propC: {
        type: Number,
        default: 123
      },
      propD: {
        type: Object,
        default () {
          return {a: 1, b: 2}
        }
      },
      propE: {
        type: Number,
        validator (value) {
          return value > 10
        }
      }
    },
    methods: {
      click () {
        this.$emit('speak-to-child')
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
