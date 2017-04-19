<template>
  <div>
    article form
    <input v-directive-a="123" v-directive-b="{a: 1, b: 2}">
  </div>
</template>

<script>
  export default {
    name: 'article-form',
    directives: {
      directiveA: {
        bind (el, binding, vnode) {
          console.log(el, binding, vnode)
        },
        inserted (el) {
          el.focus()
        }
      },
      directiveB (el, binding) {
        console.log(binding.value)
      }
    }
  }
</script>
