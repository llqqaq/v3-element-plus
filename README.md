
### 笔记

1. 有关git控制代码提交的校验
[参考该视频的15-20](https://www.bilibili.com/video/BV1Xh411V7b5?p=19&vd_source=f80ca091f46518f40ed553ef8907fc8d)

2. 配置别名
```js
resolve: {
    alias: {
        // import.meta.url: 当前ts的绝对路径
        '@': fileURLToPath(new URL('./src', import.meta.url))
    }
}
```

3. 配置测试环境
· 创建.env.test
. package.json:  "build:test": "vite build --mode test",
执行build:test， vite.config.js 读取的mode就为test， process.env.NODE_ENV仍为production

4. 使用svg
```js
依赖: npm install vite-plugin-svg-icons -D

配置: vite.config.ts
plugins: [
    createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    // process.cwd()是当前ts执行路径
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 与本地储存地址一致
    // 指定symbolId格式
    symbolId: 'icon-[name]'
    })
]

注入脚本: main.ts
import 'virtual:svg-icons-register'

放置svg: src/assets/icons下创建 [name].svg

使用:   <svg :style="style">
            <use :href="`#icon-${name}`" :fill="color"></use>
        </svg>

```


5. 批量全局注册组件

```js

// src/utils/plugin.ts
const globalComponent = { MeIcon }
export default {
    install (app: App) {
        Object.keys(globalComponent).forEach(key => {
            app.component(key, globalComponent[key])
        })
    }
}

// main.ts
import globalComponent from '@/utils/plugins'

app.use(globalComponent)

```

6. 配置全局共享样式

```js
// 依赖
npm install scss scss-loader

// styles/*.scss 
// reset.scss 在npmjs获取 清除默认样式
// index.scs  全局样式，里面的$color变量组件中没办法使用
// variables.scss  变量文件

// vite.config.scss
css: {
    preprocessorOptions: {
    scss: {
        additionalData: '@import "./src/styles/variable.scss";'
    }
    }
}

```

7. mock数据
```js
// 依赖
npm vite-plugin-mock mockjs    


// vite.config.ts
import { viteMockServe } from 'vite-plugin-mock'
import { ConfigEnv, UserConfigExport } from 'vite'

export default = ({ mode, command }: ConfigEnv): UserConfigExport => {
    return defineConfig({
        plugins: [
            viteMockServe({
                enable: command === 'serve'
            })
        ]
    })
}

// 根目录 mock/*.ts, 暴露如下数据接口数组即可

export default [
    // 用户登录接口
    {
        url: '/api/user/login',
        method: 'post',
        response: ({ body }) => {
            return { code: 200, data: { name: '2' } }
        }
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: ({ body }) => {
            return { code: 200, data: { name: '2' } }
        }
    }
]

```


8. 在路由文件中使用pinia
```js

// 需要将直接注入main.ts的pinia抽取出来 stores/index.ts
import { createPinia } from 'pinia'
let pinia = createPinia()
export default pinia


// permission.ts
import { useUserStore } from '@/stores/user'
import pinia from '@/stores'
const user = useUserStore(pinia)  // 将pinia注入

```
### 坑

1. 配置elementui国际化的时候打包出错 import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

```js
// 忽略ts对该文件的校验
// @ts-ignores
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 配置国际化
```


2. 在request.ts中使用import { ElMessage } from 'element-plus'爆红
```js
// tsconfig.app.json
"compilerOptions": {
    "moduleResolution": "node"
}
```

3. vue-router文档提供的路由过渡没有生效
```js
// 失效
<router-view v-slot="{ Component }">
    <transition name="fade" appear>
        <component :is="Component" />
    </transition>
</router-view>
<style lang='scss' scoped>
.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: all 1s;
}
.fade-enter-to {
    opacity: 1;
}
</style>
```
原因： 路由组件只写了文本，没有写结构