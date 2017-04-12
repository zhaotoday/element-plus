import I18N from '@/utils/i18n'

const i18n = new I18N('zh-CN').init().addResources(null, require.context('./locales/', true, /\.json$/))

export default i18n
