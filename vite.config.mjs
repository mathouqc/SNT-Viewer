import { resolve } from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, "src/renderer")
})
