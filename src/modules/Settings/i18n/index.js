import i18n from '@/i18n'

i18n.addResources('articles', require.context('./locales/', true, /\.json$/))
