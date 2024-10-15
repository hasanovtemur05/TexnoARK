import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: "@", replacement: "/src/*"},
      {find: "@modules", replacement: "/src/modules"},
      {find: "@components", replacement: "/src/components"},
      {find: "@router", replacement: "/src/router"}, 
      {find: "@types", replacement: "/src/types"}, 
      {find: "@utils", replacement: "/src/utils"},
      {find: "@api", replacement: "/src/api"}, 

    ]
  },
})
