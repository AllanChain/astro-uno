import { defineConfig } from 'astro/config'

import uno from 'astro-uno'
import { presetUno, presetAttributify } from 'unocss'

// https://astro.build/config
export default defineConfig({
  integrations: [
    uno({
      presets: [presetUno(), presetAttributify()]
    })
  ]
})
