module.exports = {
    extends: 'airbnb-base',
    rules: {
        // 強制在點號之前或之後換行
        'dot-location': ['error', 'property'],
        // 強制使用一致的換行符號風格
        'linebreak-style': ['error', 'windows'],
        // 強制使用一致的縮排及switch...case...縮排問題
        indent: ['error', 4, { SwitchCase: 1 }],
        // 允許使用 Console Error
        'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
        // 設定每行字最大長度 [rule ID (0 - turn the rule off, 1 - turn the rule on as a warning, 2 - turn the rule on as an error), code, tabWidth]
        'max-len': [1, 120, 4],
    },
    env: {
        // 解決'fetch' is not defined. (no-undef)、解決'window' is not defined. (no-undef)、解決'document' is not defined. (no-undef、
        browser: true,
    },
    // 解決.html檔的<!DOCTYPE html>誤判為Unexpected toke <
    plugins: ['html'],
};
