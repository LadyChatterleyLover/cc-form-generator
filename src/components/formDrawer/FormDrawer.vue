<template>
  <el-drawer size="100%" v-model="drawerVisible" :with-header="false" @opened="onOpen" @close="onClose">
    <div class="container">
      <div class="item">
        <el-tabs v-model="activeTab" type="card" @tab-change="changeTab">
          <el-tab-pane name="html">
            <template #label>
              <Edit v-if="activeTab === 'html'" />
              <DocumentCopy v-else />
              template
            </template>
          </el-tab-pane>
          <el-tab-pane name="js">
            <template #label>
              <Edit v-if="activeTab === 'js'" />
              <DocumentCopy v-else />
              script
            </template>
          </el-tab-pane>
          <el-tab-pane name="css">
            <template #label>
              <Edit v-if="activeTab === 'css'" />
              <DocumentCopy v-else />
              css
            </template>
          </el-tab-pane>
        </el-tabs>
        <div class="editor" v-if="code">
          <MonacoEditor v-model="code" :language="language" theme="vs-dark" @change="changeEditor"></MonacoEditor>
        </div>
      </div>
      <div class="item">
        <div class="action">
          <div class="action-item">
            <div><Download /></div>
            <div>下载vue文件</div>
          </div>
          <div class="action-item">
            <div><DocumentCopy /></div>
            <div>复制代码</div>
          </div>
          <div class="action-item" style="color: #f56c6c" @click="onClose">
            <div><Close /></div>
            <div>关闭</div>
          </div>
        </div>
        <iframe
          v-show="isIframeLoaded"
          ref="previewPage"
          class="result-wrapper"
          frameborder="0"
          src="preview.html"
          @load="iframeLoad"
        />
        <div v-show="!isIframeLoaded" v-loading="true" class="result-wrapper" />
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue"
import { useStore } from "vuex"
import MonacoEditor from "../monacoEditor/MonacoEditor.vue"
import { DocumentCopy, Download, Close, Edit } from "@element-plus/icons-vue"
import { saveAs } from "file-saver"
import { beautifierConf } from "@/utils/index"
import { getCode } from "@/utils/template"
import loadBeautifier from "@/utils/loadBeautifier"

const store = useStore()
const componentList = computed(() => store.state.componentList)

const props = defineProps<{
  visible: boolean
}>()

const emits = defineEmits(["update:visible"])

const drawerVisible = ref(props.visible)

const isIframeLoaded = ref(false)
const htmlCode = ref("")
const jsCode = ref("")
const cssCode = ref("")
const activeTab = ref("html")
const mode = {
  html: "html",
  js: "typescript",
  css: "css",
}

const code = ref("")
const language = ref("")
const previewPage = ref<any>()

const changeTab = (name: string) => {
  code.value = ""
  code.value = name === "html" ? htmlCode.value : name === "js" ? jsCode.value : cssCode.value
  language.value = mode[name]
}

const onOpen = () => {
  code.value = ""
  htmlCode.value = getCode(componentList.value).template
  jsCode.value = getCode(componentList.value).script
  cssCode.value = getCode(componentList.value).style
  loadBeautifier((btf) => {
    htmlCode.value = btf.html(htmlCode.value, beautifierConf.html)
    jsCode.value = btf.js(jsCode.value, beautifierConf.js)
    cssCode.value = btf.js(cssCode.value, beautifierConf.css)
    code.value = activeTab.value === "html" ? htmlCode.value : activeTab.value === "js" ? jsCode.value : cssCode.value
    language.value = mode[activeTab.value]
  })
}

const onClose = () => {
  emits("update:visible", false)
}

const changeEditor = (val: string) => {
  console.log(val)
}

const runCode = () => {
  const postData = {
    type: "refreshFrame",
    data: {
      html: htmlCode.value,
      js: jsCode.value.replace('export default', ''),
      css: cssCode.value,
    },
  }
  previewPage.value.contentWindow.postMessage(postData, location.origin)
}

const iframeLoad = () => {
  isIframeLoaded.value = true
  runCode()
}

watch(
  () => props.visible,
  (val) => {
    drawerVisible.value = val
  }
)
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  overflow: hidden;
  .item {
    flex: 1;
    &:first-child {
      background: #1e1e1e;
      color: #fff;
    }
  }
  .editor {
    height: 100%;
  }
  .action {
    height: 33px;
    background: #f2fafb;
    padding: 0 30px;
    display: flex;
    align-items: center;
    &-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      color: #8285f5;
      cursor: pointer;
      svg {
        position: relative;
        top: 2px;
        margin-right: 4px;
      }
    }
  }
  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
</style>
