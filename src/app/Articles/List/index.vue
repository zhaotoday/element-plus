<template>
  <div>
    <div v-text="msg"></div>
    <div v-text="language"></div>
    <div v-text="JSON.stringify(articles)"></div>
    <div @click="patchLanguage">switch language</div>
    <div @click="putArticle">add article</div>
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
    created () {
      this.$store.dispatch('getArticles')
    },
    computed: mapState([
      'language',
      'articles'
    ]),
    methods: {
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
