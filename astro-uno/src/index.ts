import type { AstroIntegration } from 'astro'

import Unocss from 'unocss/vite'
import type { VitePluginConfig } from 'unocss/vite'

export = function UnoIntegration (options: VitePluginConfig): AstroIntegration {
  return {
    name: 'astro-uno',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        const unocssPlugins = Unocss(options)
        unocssPlugins.find(
          plugin => plugin.name === 'unocss:global:build:generate'
        ).apply = 'build'

        updateConfig({
          vite: {
            resolve: {
              alias: {
                'unocss-hmr-fix': 'uno.css'
              }
            },
            plugins: [
              unocssPlugins
            ]
          }
        })
      }
    }
  }
}
