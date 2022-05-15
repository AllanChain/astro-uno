import type { AstroIntegration } from 'astro'

import Unocss from 'unocss/vite'
import type { VitePluginConfig } from 'unocss/vite'

interface AstroUnoOptions {
  uno: VitePluginConfig
}

export = function UnoIntegration (options: AstroUnoOptions): AstroIntegration {
  return {
    name: 'astro-uno',
    hooks: {
      'astro:config:setup': ({ updateConfig, injectScript }) => {
        updateConfig({
          vite: {
            plugins: [Unocss(options.uno)]
          }
        })
        injectScript('page', 'import \'astro-uno/client\'')
      }
    }
  }
}
