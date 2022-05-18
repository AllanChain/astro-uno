const reloadCSS = (revision: string): void => {
  const el = document.querySelector<HTMLLinkElement>('link[href*=__uno\\.css]')
  if (el != null) {
    const url = new URL(el.href)
    url.searchParams.set('t', revision)
    console.log(url.href)
    el.href = url.href
  }
}

import.meta.hot.on('vite:beforeUpdate', (event) => {
  const unoUpdate = event.updates.find(({ path }) => path.includes('__uno.css'))
  console.log(unoUpdate)
  if (unoUpdate !== undefined) {
    reloadCSS(unoUpdate.timestamp.toString())
  }
})
