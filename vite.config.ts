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
  console.log(mode, process.env.NODE_ENV)
  console.log(1111,  loadEnv(mode, process.cwd()))  // 可以读取到变量
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
    }
  })
}
