<template>
  <div class="sidebar">
    <Menu ref="menu" :active-name="activeName" width="auto" :open-names="openNames" @on-select="handleSelect">
      <Submenu name="articles">
        <template slot="title">
          <Icon type="document-text"></Icon>
          文章管理
        </template>
        <Menu-item name="/articles">文章列表</Menu-item>
      </Submenu>
      <Submenu name="x">
        <template slot="title">
          <Icon type="document"></Icon>
          文件管理
        </template>
      </Submenu>
      <Submenu name="x">
        <template slot="title">
          <Icon type="person-stalker"></Icon>
          会员管理
        </template>
      </Submenu>
      <Submenu name="x">
        <template slot="title">
          <Icon type="ios-home-outline"></Icon>
          店铺管理
        </template>
      </Submenu>
      <Submenu name="x">
        <template slot="title">
          <Icon type="android-cart"></Icon>
          商品管理
        </template>
      </Submenu>
      <Submenu name="x">
        <template slot="title">
          <Icon type="android-cart"></Icon>
          订单管理
        </template>
      </Submenu>
      <Submenu name="x">
        <template slot="title">
          <Icon type="gear-b"></Icon>
          网站设置
        </template>
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
      this.update()
    },
    methods: {
      handleSelect (name) {
        this.$router.push(name)
      },
      update (route) {
        const path = route ? route.path : this.$route.path
        const openName = path.split('/')[1]
        const activeName = '/' + openName

        this.$set(this, 'activeName', activeName)
        this.$set(this, 'openNames', [openName])

        this.$nextTick(() => {
          this.$refs.menu.updateActiveName()
          this.$refs.menu.$children.forEach((item) => {
            item.opened = false
          })
          this.$refs.menu.updateOpened()
        })
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
