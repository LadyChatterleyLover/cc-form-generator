<template>
  <div class="flex items-center justify-between px-5 h-[50px]" style="border-bottom: 1px solid #eee">
    <div class="flex items-center leading-[30px] text-[#00afff] font-[600] text-lg">
      <div>cc-form-generator</div>
      <div>
        <a href="https://github.com/LadyChatterleyLover/cc-h5" target="_blank" class="inline-block align-sub ml-4">
          <img src="https://github.githubassets.com/pinned-octocat.svg" class="w-6 h-6 relative top-1" />
        </a>
      </div>
    </div>
    <div class="flex items-center flex-1 justify-end">
      <div
        class="flex items-center mr-4 cursor-pointer text-[#409eff] last:text-[#f56c6c]"
        @click="clickItem(item)"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="mr-1 relative top-[2px]">
          <component :is="item.icon"></component>
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>

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
    <div class="form-drawer-editor">
      <form-drawer v-model:visible="drawerVisible"></form-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Component, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { saveAs } from 'file-saver'
import { CopyDocument, DeleteFilled, Download, VideoPlay } from '@element-plus/icons-vue'
import { ComponentItem } from '@/types'
import { vueTemplate } from '@/utils/template'
import { useClipboard } from '@vueuse/core'
import FormDrawer from '../formDrawer/FormDrawer.vue'

interface ListItem {
  icon: Component
  name: string
}

const store = useStore()

const componentList = computed<ComponentItem[]>(() => store.state.componentList)

const form = ref()
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
const visible = ref(false)
const drawerVisible = ref(false)
const list: ListItem[] = [
  {
    icon: VideoPlay,
    name: '运行',
  },
  {
    icon: Download,
    name: '导出vue文件',
  },
  {
    icon: CopyDocument,
    name: '复制代码',
  },
  {
    icon: DeleteFilled,
    name: '清空',
  },
]

const clickItem = (item: ListItem) => {
  if (!componentList.value || !componentList.value.length) {
    ElMessage.warning('请先生成组件')
    return
  }
  if (item.name === '导出vue文件') {
    visible.value = true
  }
  if (item.name === '复制代码') {
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
  if (item.name === '清空') {
    ElMessageBox.confirm('确认要清空所有组件吗?', '', {
      type: 'warning',
    })
      .then(() => {
        store.commit('setCurrentComponent', null)
        store.commit('setComponentList', null)
        store.commit('setActiveIndex', null)
        localStorage.removeItem('currentComponent')
        localStorage.removeItem('componentList')
        localStorage.removeItem('activeIndex')
        ElMessage.success('清空成功')
      })
      .catch(() => {
        ElMessage.info('取消操作')
      })
  }
  if (item.name === '运行') {
    if (!componentList.value) ElMessage.warning('请先生成组件')
    else {
      drawerVisible.value = true
    }
  }
}

const comfirm = () => {
  form.value?.validate(valid => {
    if (valid) {
      const str = vueTemplate(componentList.value)
      const blob = new Blob([str!], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `${model.value.filename}.vue`)
      form.value?.resetFields()
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
</script>

<style scoped lang="scss"></style>
