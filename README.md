# Astro UnoCSS integration experiment

You need to make UnoCSS correctly invalidates CSS modules by modifying `node_modules/.pnpm/@unocss+vite@0.33.2_vite@2.9.9/node_modules/@unocss/vite/dist/index.cjs` (ugly by quick)

from

```js
const mod = server.moduleGraph.getModuleById(id);
```

to 

```js
const mod = server.moduleGraph.getModuleById(`${id}?direct`);
```

Then in `example`, run `pnpm dev`.

## How it works

It's hard to make it work properly without the ability to preserve injected element between `.astro` HMR.

This solution made some hack to let UnoCSS properly invalidate the css module, and update css url timestamp via injectScript.

But there are still some drawbacks:
- UnoCSS is not designed to work as a CSS file. It's designed to works as a JS module.
- Firefox doesn't refetch the CSS after the CSS is reset to original `/__uno.css` but Chrome does. This will cause style modification lost after saving `.astro` file without updating CSS classes.
- There are some flashes since I have to replace CSS url after HTML replacement, thus resulting a time gap where new styles are not applied. This flash has a different cause from [astro#3370](https://github.com/withastro/astro/issues/3370).
