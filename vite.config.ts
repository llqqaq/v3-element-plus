import { fileURLToPath, URL } from 'node:url'
import { loadEnv, ConfigEnv, UserConfigExport } from 'vite'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default ( { mode, command }: ConfigEnv): UserConfigExport => {
  console.log(mode, process.env.NODE_ENV) // mode可以在package.json中修改，process.env.NODE_ENV不可以修改
  console.log(loadEnv(mode, process.cwd()))  // 可以读取到变量， process.cwd()读取根目录
  const env = loadEnv(mode, process.cwd())
  console.log(env.VITE_APP_BASE_API)
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        enable: command === 'serve',
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 与本地储存地址一致
        // 指定symbolId格式
        symbolId: 'icon-[name]'
      })
    ],
    resolve: {
      alias: {
        // import.meta.url: 当前ts的绝对路径
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
