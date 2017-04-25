<template>
  <div>
    <textarea ref="content">{{ value }}</textarea>
  </div>
</template>

<script>
  import 'kindeditor'
  import 'kindeditor/themes/default/default.css'
  import _consts from './utils/consts'

  const KindEditor = window.KindEditor

  export default {
    name: 'editor',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    mounted () {
      const vm = this

      const options = {
        width: '100%',
        height: 500,
        items: _consts.ITEMS,
        pluginsPath: 'KEPlugins/',
        afterChange: function () {
          vm.$emit('change', this.html())
        }
      }

      this.$nextTick(() => {
        this.editor = KindEditor.create(this.$refs.content, {...options})
      })
    },
    watch: {
      value (newVal, oldVal) {
        // FIX: 修复重置表单时，编辑器不重置的 bug
        if (newVal === '') {
          this.editor.html('')
        }
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
