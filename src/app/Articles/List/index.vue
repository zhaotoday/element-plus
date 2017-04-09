<template>
  <div>
    {{ msg }}
    {{ language }}
    {{ JSON.stringify(articles) }}
    <div @click="click">click me</div>
    <div @click="patchLanguage">switch language</div>
    <div @click="putArticle">add article</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        msg: 'article list'
      }
    },
    computed: mapState([
      'language',
      'articles'
    ]),
    methods: {
      click () {
        alert('clicked')
      },
      patchLanguage () {
        this.$store.dispatch('patchLanguage', {
          language: 'en-US'
        })
      },
      putArticle () {
        this.$store.dispatch('putArticle', {
          id: 3,
          title: 'How to use jQuery'
        })
      }
    }
  }
</script>
