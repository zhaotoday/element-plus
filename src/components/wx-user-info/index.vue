<template>
  <span class="c-wx-user-info">
    {{ (detail.nickName ? detail.nickName: '' ) + (detail.phoneNumber ? `（${detail.phoneNumber}）` : '') }}
  </span>
</template>

<script>
import WxUsersModel from '@/models/admin/wx-users'

export default {
  name: 'CWXUserInfo',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      detail: {}
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const { data } = await new WxUsersModel().GET({ id: this.id })
      this.detail = data
    }
  }
}
</script>
