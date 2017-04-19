<template>
  <div>
    <child-comp></child-comp>
    <p v-text="t('articleList', {whose: t('my')})"></p>
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
  import ChildComp from '../components/ChildComp'

  export default {
    name: 'article-list',
    data () {
      return {
        module: 'articles'
      }
    },
    components: {ChildComp},
    created () {
      this._get()
    },
    computed: mapState([
      'language',
      'articles'
    ]),
    methods: {
      t (key, options) {
        return i18n.getT(this.module)(key, options)
      },
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
