<template>
  <div class="sidebar">
    <Menu :active-name="activeName" width="auto" :open-names="openNames" @on-select="handleSelect">
      <Submenu name="articles">
        <template slot="title">
          <Icon type="document-text"></Icon>
          文章管理
        </template>
        <Menu-item name="/articles">文章列表</Menu-item>
        <Menu-item name="/articles/form">分类列表</Menu-item>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        activeName: '',
        openNames: []
      }
    },
    created () {
      const path = this.$route.path
      const openNames = path.split('/')[1]
      const activeName = path

      this.$set(this, 'activeName', activeName)
      this.$set(this, 'openNames', openNames)
    },
    methods: {
      handleSelect (name) {
        this.$router.push(name)
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
