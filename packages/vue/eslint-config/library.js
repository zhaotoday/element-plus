import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * 面向纯 TypeScript 库（无 `.vue` 组件）的 ESLint 扁平化配置。
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const libraryConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
];

export default libraryConfig;
