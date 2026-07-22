import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * 面向 Vue 3 项目的 ESLint 扁平化配置。
 *
 * @remarks
 * `<script>` 块使用 `@typescript-eslint/parser` 解析，`.vue` 由 eslint-plugin-vue
 * 自动装配 `vue-eslint-parser`。
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const vueConfig = [
  ...baseConfig,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
];

export default vueConfig;
