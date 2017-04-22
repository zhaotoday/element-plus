<template>
  <div>
    <child-component prop-a="abc" :prop-b="'def'" :prop-c="456" :prop-e="11"
      @tell-father="fatherHandler"></child-component>
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
  import t from '@/utils/mixins/t'
  import ChildComponent from '../components/ChildComponent'

  export default {
    name: 'article-list',
    mixins: [t],
    data () {
      return {
        module: 'articles'
      }
    },
    components: {
      ChildComponent
    },
    created () {
      this._get()
    },
    computed: mapState([
      'language',
      'articles'
    ]),
    methods: {
      fatherHandler () {
        alert('father handler')
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
