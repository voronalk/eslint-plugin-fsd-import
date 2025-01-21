# Eslint plugin for FSD imports

## Intsall

```bash
npm i -D eslint-plugin-fsd-layers
```

## Usage

```js
// eslint.config.mjs
import fsdLayers from 'eslint-plugin-fsd-layers';

{
  plugins: {
    'fsd-layers': fdsLayers,
  }

  rules: {
    'fsd-layers/no-import-from-top': 'error',
  }
}
```
