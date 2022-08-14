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

See `examples/` for detail.

## What it does

- Creates an alias of `uno.css` and auto import it.

  `unocss-hmr-fix` is just an alias of `uno.css`. ~~But the renaming fixes some HMR issues, since Astro treats everything ends with '.css' as a normal CSS file.~~ The HMR issues are solved because Astro has chosen to reload the whole page to get more reliable update since version `1.0.0-rc.1`, so the renaming is not taking any effect. But Astro would [layer in granular updates afterwards](https://github.com/withastro/astro/pull/3932), so I'm just keeping it.

- Force UnoCSS to run at the SSR phase.

  UnoCSS skips running when in the SSR mode, because it assumes that there is another client build.
  But that's not true for Astro, where the client build doesn't include all the sources and the styles are generated in the SSR phase.
  So we need to force UnoCSS to run at the SSR phase.

- Fix regular expression matching for attributify mode.

  Astro pre-processes the `.astro` files and transform them into something like:
  ```js
  return $$render`<img${$$addAttribute(src, "src")} w-full>`;
  ```
  UnoCSS expected a space after `<img` but Astro gives `$$addAttribute` part instead, making attributify mode not working well.
  Here we pass modified code with an extra space to UnoCSS for extracting the tokens.
