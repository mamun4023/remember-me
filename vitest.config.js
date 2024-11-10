import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    reporters: ['html'],
    coverage : {
        provider : 'v8',
        reportsDirectory: 'coverage',
        reporter: ['text', 'html'],
    }
},


})