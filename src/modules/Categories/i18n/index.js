import i18n from '@/i18n'

i18n.addResources('categories', require.context('./locales/', true, /\.json$/))
