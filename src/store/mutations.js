import types from './types'
import i18n from '@/i18n'

export default {
  [types.PATCH_LANGUAGE] (state, payload) {
    i18n.switchTo(payload.language)
    state.language = payload.language
  }
}
