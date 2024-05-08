import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
    { languageOptions: { globals: [globals.browser, globals.node] } },
    { ignores: ['dist/'] },
    pluginJs.configs.recommended,
];
