# Astro UnoCSS integration experiment

You need to make UnoCSS correctly invalidates CSS modules by modifying `node_modules` (ugly by quick)

```js
const mod = server.moduleGraph.getModuleById(id);
```

to 

```js
const mod = server.moduleGraph.getModuleById(`${id}?direct`);
```
