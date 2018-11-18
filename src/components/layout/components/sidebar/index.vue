<template>
  <div class="c-sidebar">
    <div
      class="c-sidebar__logo"
      @click="$router.push('/')">
      <div class="c-sidebar__logo-icon">
        <CIcon type="cube" />
      </div>
      后台管理系统
    </div>
    <Menu
      ref="menu"
      theme="dark"
      :active-name="activeName"
      width="auto"
      :open-names="openNames"
      @on-select="handleSelect">
      <Submenu
        v-for="(menu1, index1) in consts.MENUS"
        :key="index1"
        :name="menu1.name">
        <template slot="title">
          <Icon :type="menu1.icon" />
          {{ menu1.title }}
        </template>
        <MenuItem
          v-for="(menu2, index2) in menu1.children"
          :key="index2"
          :name="menu2.route">
          {{ menu2.title }}
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  import consts from '@/utils/consts'
  import CIcon from '@/components/Icon'

  export default {
    name: 'TheSidebar',
    components: {
      CIcon
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
        const path = route ? route.path : this.$route.path
        const paths = path.split('/')
        this.openNames = [paths[1]]
        this.activeName = `/${paths[1]}/${paths[2]}`

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

<style
  lang="scss"
  src="./styles/index.scss">
</style>
