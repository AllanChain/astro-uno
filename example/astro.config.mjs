import { defineConfig } from 'astro/config'

import vue from '@astrojs/vue'
import uno from 'astro-uno'
import { presetUno } from 'unocss'

console.log(uno)

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), uno({
    uno: {
      presets: [
        presetUno()
      ]
    }
  })]
})
