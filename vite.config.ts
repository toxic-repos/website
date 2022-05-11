import { resolve } from 'path'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, __dirname) }

  if (command === 'serve') {
    return defineConfig({
      resolve: {
        alias: {
          src: resolve(__dirname, './src'),
          types: resolve(__dirname, './types')
        }
      },
      plugins: [
        eslintPlugin(),
        vue({
          reactivityTransform: true
        }),
        createHtmlPlugin({
          minify: false,
          entry: 'src/main.ts',
          template: 'index.html',
          inject: {
            data: {
              title: 'App',
              injectFavicon: `<link rel="icon" href="${process.env.VITE_BASE_URL}favicon.ico">`,
              injectManifest: ''
            }
          }
        }),
        splitVendorChunkPlugin()
      ],
      css: {
        modules: {
          generateScopedName: '[name]__[local]--[hash:base64:5]',
          localsConvention: 'camelCaseOnly'
        }
      },
      server: {
        host: '0.0.0.0',
        force: true,
        watch: {
          usePolling: true
        }
      }
    })
  } else {
    return defineConfig({
      resolve: {
        alias: {
          src: resolve(__dirname, './src'),
          types: resolve(__dirname, './types')
        }
      },
      plugins: [
        eslintPlugin(),
        vue(),
        createHtmlPlugin({
          minify: true,
          inject: {
            data: {
              title: 'Токсичные репозитории',
              injectFavicon: `<link rel="icon" href="${process.env.VITE_BASE_URL}favicon.ico">`,
              injectManifest: ''
            }
          }
        }),
        splitVendorChunkPlugin()
      ],
      css: {
        modules: {
          generateScopedName: '[hash:base64:5]',
          localsConvention: 'camelCaseOnly'
        }
      },
      build: {
        outDir: resolve(__dirname, 'dist'),
        minify: 'terser',
        emptyOutDir: true,
        assetsDir: 'assets',
        rollupOptions: {
          output: {
            entryFileNames: 'assets/js/[name].[hash].js',
            chunkFileNames: 'assets/js/[name].[hash].js',
            assetFileNames: ({ name }) => {
              if (name && name.endsWith('.css')) {
                return 'assets/css/[name].[hash].[ext]'
              }
              return 'assets/media/[name].[hash].[ext]'
            }
          }
        }
      }
    })
  }
}
