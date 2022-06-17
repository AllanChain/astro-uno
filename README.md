# Astro UnoCSS Integration


## Usage

1. Install this package and UnoCSS
```shell
npm install --save-dev astro-uno unocss
```
2. Add to the integrations in `astro.config.mjs`
```js
import uno from 'astro-uno'
import { presetUno } from 'unocss'

export default defineConfig({
  integrations: [
    uno({
      presets: [presetUno()]
    })
  ]
}
```
3. Change the scripts to allow experimental integrations
```json
{
  "scripts": {
    "dev": "astro dev --experimental-integrations",
    "start": "astro dev --experimental-integrations",
    "build": "astro build --experimental-integrations",
  }
}
```
4. Import UnoCSS in your `.astro` files
```js
import 'unocss-hmr-fix'
```

See `examples/` for detail.

## What it does

- Creates an alias of `uno.css` to avoid HMR issues.

  `unocss-hmr-fix` is just an alias of `uno.css`. But the renaming fixes some HMR issues, since Astro treats everything ends with '.css' as a normal CSS file.

- Force UnoCSS to run at the SSR phase.

  UnoCSS skips running when in the SSR mode, because it assumes that there is another client build.
  But that's not true for Astro, where the client build doesn't include all the sources and the styles are generated in the SSR phase.
  So we need to force UnoCSS to run at the SSR phase.
