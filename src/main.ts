import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementPlus from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import "element-plus/dist/index.css"
import * as Icons from "@element-plus/icons-vue"
import { toLine } from "./utils"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
// @ts-ignore: worker
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === "json") {
      return new jsonWorker()
    }
    if (["css", "scss", "less"].includes(label)) {
      return new cssWorker()
    }
    if (["html", "handlebars", "razor"].includes(label)) {
      return new htmlWorker()
    }
    if (["typescript", "javascript"].includes(label)) {
      return new tsWorker()
    }
    return new EditorWorker()
  },
}

const app = createApp(App)

for (const i in Icons) {
  // 注册全部组件
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app.use(router)
app.use(store)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount("#app")
