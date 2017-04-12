<template>
  <div>
    <div v-text="msg"></div>
    <div v-text="language"></div>
    <div v-text="JSON.stringify(articles.articles)"></div>
    <div @click="patchLanguage">switch language</div>
    <div @click="putArticle">add article</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import PrivateComp from '../components/PrivateComp'

  export default {
    components: {PrivateComp},
    data () {
      return {
        msg: 'article list'
      }
    },
    created () {
      this._get()
    },
    computed: mapState([
      'language',
      'articles'
    ]),
    methods: {
      _get () {
        this.$store.dispatch('getArticles', {
          params: {
            $offset: 0,
            $limit: 10
          }
        })
      },
      patchLanguage () {
        this.$store.dispatch('patchLanguage', {
          data: {
            language: 'en-US'
          }
        })
      },
      putArticle () {
        this.$store.dispatch('postArticle', {
          data: {
            id: 2,
            title: 'jQuery'
          }
        }).then(() => {
          this._get()
        })
      }
    }
  }
</script>
