<template>
  <div>
    <p v-text="t['articleList']"></p>
    <p>
      当前语言：
      <span v-text="language"></span>
    </p>
    <p>
      文章列表：
      <span v-text="JSON.stringify(articles.articles)"></span>
    </p>
    <p @click="patchLanguage('en')">切换语言为英文</p>
    <p @click="patchLanguage('zh-CN')">切换语言为简体中文</p>
    <p @click="putArticle">新增文章</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import i18n from '@/i18n'
  import PrivateComp from '../components/PrivateComp'

  const t = i18n.getT('articles')

  export default {
    data () {
      return {
        t
      }
    },
    components: {PrivateComp},
    created () {
      this._get()
    },
    computed: mapState([
      'language',
      'articles'
    ]),
    watch: {
      language () {
        this.$set(this, 't', i18n.getT('articles'))
      }
    },
    methods: {
      _get () {
        this.$store.dispatch('getArticles', {
          params: {
            $offset: 0,
            $limit: 10
          }
        })
      },
      patchLanguage (lng) {
        this.$store.dispatch('patchLanguage', {
          data: {
            language: lng
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
