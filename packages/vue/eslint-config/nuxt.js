import globals from "globals";
import { vueConfig } from "./vue.js";

/**
 * 面向 Nuxt 应用的 ESLint 扁平化配置。
 *
 * @remarks
 * 在 Vue 配置基础上补充 Node 全局变量，并忽略 Nuxt 生成目录。
 * Nuxt 的自动导入（`useRoute`、`navigateTo`、`ElMessage` 等）依赖 `no-undef` 关闭。
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nuxtConfig = [
  ...vueConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: [".nuxt/**", ".output/**", "dist/**", "node_modules/**"],
  },
];

export default nuxtConfig;
