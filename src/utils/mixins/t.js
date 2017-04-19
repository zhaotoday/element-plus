import i18n from '@/i18n'

export default {
  methods: {
    t (key, options) {
      return i18n.getT(this.module)(key, options)
    }
  }
}
