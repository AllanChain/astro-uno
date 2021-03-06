import { defineConfig } from 'astro/config'

import vue from '@astrojs/vue'
import uno from 'astro-uno'
import { presetUno, presetAttributify } from 'unocss'

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    uno({
      presets: [presetUno(), presetAttributify()]
    })
  ]
})
