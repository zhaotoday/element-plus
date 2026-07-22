import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * 仓库共享的基础 ESLint 扁平化配置（ESLint 9 Flat Config）。
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    rules: {
      // TypeScript 负责未定义变量检查，关闭 core 规则避免误报（尤其是自动导入场景）
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // 允许「空接口继承基类型」的领域建模写法（如 DTO extends Partial<Entity>）
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
];

export default config;
