<template>
  <el-drawer size="100%" v-model="drawerVisible" :with-header="false" @opened="onOpen" @close="onClose">
    <div class="flex h-full overflow-hidden">
      <div class="flex-1 last:bg-[#1e1e1e] last:text-white">
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
        <div class="h-full" v-if="code">
          <MonacoEditor v-model="code" :language="language" theme="vs-dark" @change="changeEditor"></MonacoEditor>
        </div>
      </div>
      <div>
        <div class="flex items-center h-[33px] bg-[#f2fafb] px-[30px]">
          <div class="flex items-center mr-5 text-[#8285f5] cursor-pointer text-sm" @click="runCode">
            <div><Refresh class="mr-1 relative top-[2px]" /></div>
            <div>刷新</div>
          </div>
          <div class="flex items-center mr-5 text-[#8285f5] cursor-pointer text-sm" @click="download">
            <div><Download class="mr-1 relative top-[2px]" /></div>
            <div>下载vue文件</div>
          </div>
          <div class="flex items-center mr-5 text-[#8285f5] cursor-pointer text-sm" @click="copyCode">
            <div><DocumentCopy class="mr-1 relative top-[2px]" /></div>
            <div>复制代码</div>
          </div>
          <div
            class="flex items-center mr-5 text-[#8285f5] cursor-pointer text-sm"
            style="color: #f56c6c"
            @click="onClose"
          >
            <div><Close class="mr-1 relative top-[2px]" /></div>
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
        <div
          v-show="!isIframeLoaded"
          v-loading="true"
          class="w-full p-3 overflow-auto box-border"
          style="height: calc(100vh - 33px)"
        />
      </div>
    </div>
  </el-drawer>

  <el-dialog v-model="visible" title="导出文件">
    <el-form ref="form" :model="model" :rules="rules">
      <el-form-item label="组件名称" prop="filename">
        <el-input placeholder="请输入组件名称" v-model="model.filename" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="comfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import MonacoEditor from '../monacoEditor/MonacoEditor.vue'
import { DocumentCopy, Download, Close, Edit, Refresh } from '@element-plus/icons-vue'
import { saveAs } from 'file-saver'
import { beautifierConf } from '@/utils/index'
import { getCode } from '@/utils/template'
import { vueTemplate } from '@/utils/template'
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'
import beautify from 'js-beautify'

const store = useStore()
const componentList = computed(() => store.state.componentList)

const props = defineProps<{
  visible: boolean
}>()

const emits = defineEmits(['update:visible'])

const drawerVisible = ref(props.visible)

const form = ref()
const visible = ref(false)
const model = ref({
  filename: '',
})
const rules = ref({
  filename: [
    {
      required: true,
      message: '文件名称不能为空',
      trigger: 'blur',
    },
  ],
})

const isIframeLoaded = ref(false)
const htmlCode = ref('')
const jsCode = ref('')
const cssCode = ref('')
const activeTab = ref('html')
const mode = {
  html: 'html',
  js: 'typescript',
  css: 'css',
}

const code = ref('')
const language = ref('')
const previewPage = ref<any>()

const changeTab = (name: string) => {
  code.value = ''
  code.value = name === 'html' ? htmlCode.value : name === 'js' ? jsCode.value : cssCode.value
  language.value = mode[name]
}

const onOpen = () => {
  code.value = ''
  htmlCode.value = getCode(componentList.value).template
  jsCode.value = getCode(componentList.value).script
  cssCode.value = getCode(componentList.value).style
  htmlCode.value = beautify.html(htmlCode.value, beautifierConf.html)
  jsCode.value = beautify.js(jsCode.value, (beautifierConf as any).js)
  cssCode.value = beautify.js(cssCode.value, (beautifierConf as any).css)
  code.value = activeTab.value === 'html' ? htmlCode.value : activeTab.value === 'js' ? jsCode.value : cssCode.value
  language.value = mode[activeTab.value]
  runCode()
}

const onClose = () => {
  emits('update:visible', false)
}

const changeEditor = (val: string) => {
  if (activeTab.value === 'html') {
    htmlCode.value = val
  }
  if (activeTab.value === 'js') {
    jsCode.value = val
  }
  if (activeTab.value === 'css') {
    cssCode.value = val
  }
}

const runCode = () => {
  const postData = {
    type: 'refreshFrame',
    data: {
      html: htmlCode.value,
      js: jsCode.value,
      css: cssCode.value,
    },
  }
  previewPage.value.contentWindow.postMessage(postData, location.origin)
}

const iframeLoad = () => {
  isIframeLoaded.value = true
  runCode()
}

const comfirm = () => {
  form.value?.validate(valid => {
    if (valid) {
      const str = vueTemplate(componentList.value)
      const blob = new Blob([str!], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `${model.value.filename}.vue`)
      visible.value = false
    } else {
      ElMessage.error('表单填写有误,请检查')
    }
  })
}

const cancel = () => {
  form.value?.resetFields()
  visible.value = false
}

const download = () => {
  visible.value = true
}

const copyCode = () => {
  const str = vueTemplate(componentList.value)
  try {
    const { copy } = useClipboard({
      source: str,
    })
    copy()
    ElMessage.success('复制成功')
  } catch (err) {
    ElMessage.error('复制失败')
  }
}

watch(
  () => props.visible,
  val => {
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
