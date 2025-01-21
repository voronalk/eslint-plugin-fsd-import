import globals from 'globals';
import pluginJs from '@eslint/js';
import elbrusConfig from '@elbrus/eslint-config';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'esmodule' } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  ...elbrusConfig,
];
