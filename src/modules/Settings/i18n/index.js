import i18n from '@/i18n'

i18n.addResources('settings', require.context('./locales/', true, /\.json$/))
