<template>
  <el-drawer size="100%" v-model="drawerVisible" @opened="onOpen" @close="onClose">
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
    <div style="height: 100%" v-if="code">
      <MonacoEditor v-model="code" :language="language" theme="vs-dark"></MonacoEditor>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue"
import { useStore } from "vuex"
import MonacoEditor from "../monacoEditor/MonacoEditor.vue"
import { Refresh, DocumentCopy, Download, Close, Edit } from "@element-plus/icons-vue"
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

const changeTab = (name: string) => {
  code.value = ''
  code.value = name === "html" ? htmlCode.value : name === "js" ? jsCode.value : cssCode.value
  language.value = mode[name]
}

const onOpen = () => {
  code.value = ''
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
  emits("update:visible", !drawerVisible.value)
}

watch(
  () => props.visible,
  (val) => {
    drawerVisible.value = val
  }
)
</script>

<style lang="scss" scoped></style>
