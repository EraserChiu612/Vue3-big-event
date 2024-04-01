/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 禁用格式化差件 prettier  format on save 關閉
    // 安裝ESLint插件，並在設置中啟用format on save
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 單引號
        semi: false, // 無須分號
        printWidth: 80, // 每行寬度最多80字符
        trailingComma: 'none', // 不加對象|數組尾逗號
        endOfLine: 'auto' // 換行符號自動
      }
    ],
    // ESLint關注於規範,如果不符合規範,報錯
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue組件名稱單詞表示（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 關閉[props]的解放較驗 (props解構會丟失響應式)

    'no-undef': 'error' // 未定義變量使用報錯
  }
}
