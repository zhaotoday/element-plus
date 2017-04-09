<template>
  <div>
    {{ msg }}
    {{ language }}
    <div @click="click">click</div>
    <div @click="putLanguage({language: 'sss'})">switch language</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        msg: 'article list'
      }
    },
    computed: mapState([
      'language'
    ]),
    methods: {
      click () {
        alert(2)
      },
      putLanguage () {
        this.$store.dispatch('putLanguage', {
          language: 'en-US'
        })
      }
    }
  }
</script>
