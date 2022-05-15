// const createRevision = (): string => Math.floor(Math.random() * 1e9).toString()
// let revision = createRevision()

const reloadCSS = (revision: string): void => {
  const el = document.querySelector<HTMLLinkElement>('link[href*=__uno\\.css]')
  if (el != null) {
    const url = new URL(el.href)
    url.searchParams.set('t', revision)
    console.log(url.href)
    el.href = url.href
  }
}

// const observer = new MutationObserver(reloadCSS)
// observer.observe(document.head, { childList: true })

import.meta.hot.on('vite:beforeUpdate', (event) => {
  const unoUpdate = event.updates.find(({ path }) => path.includes('__uno.css'))
  console.log(unoUpdate)
  if (unoUpdate !== undefined) {
    setTimeout(() => reloadCSS(unoUpdate.timestamp.toString()), 10)
  }
})
