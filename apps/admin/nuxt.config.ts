// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path'
import ElementPlus from 'unplugin-element-plus/vite'
import { codeInspectorPlugin } from 'code-inspector-plugin'

// 网站名称配置
const SITE_NAME = '福州力软信息科技有限公司管理后台'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
  app: {
    head: {
      title: SITE_NAME,
      titleTemplate: `%s | ${SITE_NAME}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    '@element-plus/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  elementPlus: {
    importStyle: 'scss',
  },
  css: ['~/assets/styles/global.scss'],
  vite: {
    resolve: {
      alias: {
        // 强制所有 element-plus 引用（含 @vuejs-repo/element-plus 包内的 SCSS）
        // 解析到本 app 的同一份副本，避免 pnpm 多副本导致主题变量覆盖不生效
        'element-plus': resolve(__dirname, 'node_modules/element-plus'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@vuejs-repo/element-plus/styles/themes/antd" as element;`,
        },
      },
    },
    plugins: [
      codeInspectorPlugin({ bundler: 'vite' }),
      ElementPlus({
        useSource: true,
        defaultLocale: 'zh-cn',
      }) as any,
    ],
    define: {
      'process.env.NUXT_PUBLIC_API_BASE_URL': JSON.stringify(
        process.env.NUXT_PUBLIC_API_BASE_URL,
      ),
    },
  },
  imports: {
    dirs: ['composables', 'stores', 'utils'],
    presets: [
      {
        from: '@vuejs-repo/core',
        imports: ['useList'],
      },
    ],
  },
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      siteName: SITE_NAME,
    },
  },
  routeRules: {
    '/**': { ssr: false },
  },
})
