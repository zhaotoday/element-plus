<template>
  <div class="sidebar">
    <div class="logo" @click="$router.push('/')">
      <div class="logo-icon">
        <I type="cube"></I>
      </div>
      后台管理系统
    </div>
    <Menu ref="menu" theme="dark" :active-name="activeName" width="auto" :open-names="openNames"
          @on-select="handleSelect">
      <Submenu v-for="(menu, index) in consts.MENUS" :key="index" :name="menu.name">
        <template slot="title">
          <Icon :type="menu.icon"></Icon>
          {{ menu.title }}
        </template>
        <Menu-item v-for="(menuChild, childIndex) in menu.children" :key="childIndex" :name="menuChild.route">
          {{ menuChild.title }}
        </Menu-item>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  import consts from '@/utils/consts'
  import I from '@/components/I'

  export default {
    name: 'sidebar',
    components: {
      I
    },
    data () {
      return {
        consts,
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
        console.log(3333, route)
        const path = route ? route.path : this.$route.path
        const paths = path.split('/')

        this.openNames = [paths[1]]
        this.activeName = `/${paths[1]}/${paths[2]}`
        console.log(this.activeName)
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

<style lang="scss" scoped src="./styles/index.scss">
</style>
