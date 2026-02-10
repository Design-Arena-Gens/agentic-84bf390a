import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules", ".next", "dist", "eslint.config.mjs"]
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      nextPlugin.configs["core-web-vitals"]
    ],
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "react/jsx-max-depth": ["error", { max: 6 }],
      "react/jsx-no-leaked-render": "error"
    }
  }
);
