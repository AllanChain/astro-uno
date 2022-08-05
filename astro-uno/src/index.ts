import type { AstroIntegration } from 'astro'

import Unocss from 'unocss/vite'
import type { VitePluginConfig } from 'unocss/vite'

export = function UnoIntegration (options: VitePluginConfig): AstroIntegration {
  return {
    name: 'astro-uno',
    hooks: {
      'astro:config:setup': ({ updateConfig, injectScript }) => {
        // Fixing attributify preset
        const attributifyPreset = options.presets.find(preset =>
          !Array.isArray(preset) && preset.name === '@unocss/preset-attributify'
        )
        if (!Array.isArray(attributifyPreset) && attributifyPreset) {
          const attributifyExtractor = attributifyPreset.extractors
            .find(extractor => extractor.name === 'attributify')
          const extract = attributifyExtractor.extract
          attributifyExtractor.extract = ({ code, original }) => extract({
            // Adding a space here, otherwise UnoCSS doesn't recognize the tag
            code: code.replace(/(<\w+)(\$\{\$\$addAttribute)/g, '$1 $2'),
            original
          })
        }

        const unocssPlugins = Unocss(options)
        // Enforce build in SSR
        unocssPlugins.find(
          plugin => plugin.name === 'unocss:global:build:generate'
        ).apply = (options, { command }) => {
          return command === 'build' && !!options.build?.ssr
        }

        // Apply the plugin and alias
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

        // Auto import UnoCSS
        injectScript('page-ssr', "import 'unocss-hmr-fix';")
      }
    }
  }
}
