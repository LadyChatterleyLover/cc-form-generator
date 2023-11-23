<template>
  <el-form label-width="90px">
    <el-form-item label="字段名">
      <el-input v-model="current.field" placeholder="请输入字段名" clearable></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="current.label" placeholder="请输入标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="current.value" placeholder="请输入默认值" clearable></el-input>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number v-model="current.labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="尺寸">
      <el-select v-model="current.attrs.size" placeholder="请选择复选框尺寸">
        <el-option value="default" label="默认"></el-option>
        <el-option value="small" label="小型"></el-option>
        <el-option value="large" label="大型"></el-option>
      </el-select>
    </el-form-item>
    <el-divider>选项</el-divider>
    <el-form-item label="数据来源">
      <el-radio-group v-model="dataFlag">
        <el-radio label="1">固定选项</el-radio>
        <el-radio label="2">远程加载</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选项配置" v-if="dataFlag === '1'">
      <div style="display: flex; margin-bottom: 10px" v-for="(item, index) in current.children" :key="index">
        <el-input v-model="item.attrs.label" placeholder="请输入导航标题"></el-input>
        <el-button style="margin: 0 3px" @click="edit(item, index)" type="primary" circle :icon="Edit"></el-button>
        <el-button @click="del(item, index)" type="danger" circle :icon="Delete"></el-button>
      </div>
      <el-button type="primary" size="small" @click="add">添加选项</el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-button type="primary" size="small">点击远程数据</el-button>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否多选">
      <el-switch v-model="current.attrs.multiple" @change="changeMultiple"></el-switch>
    </el-form-item>
    <el-form-item label="可清空">
      <el-switch v-model="current.attrs.clearable"></el-switch>
    </el-form-item>
    <el-form-item label="可筛选">
      <el-switch v-model="current.attrs.filterable"></el-switch>
    </el-form-item>
  </el-form>

  <el-dialog v-model="editVisible" title="编辑数据源" width="30%">
    <el-form v-if="current" :model="current.children[currentIndex]" label-width="100px">
      <el-form-item label="绑定值">
        <el-input
          v-model="current.children[currentIndex].attrs.value"
          placeholder="请输入数据绑定值"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="current.children[currentIndex].attrs.disabled"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="ok">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { ComponentItem } from '@/types'
import cloneDeep from 'lodash/cloneDeep'
import { Edit, Delete } from '@element-plus/icons-vue'

const store = useStore()

const current: any = computed(() => store.state.currentComponent)
const editVisible = ref<boolean>(false)
const currentItem = ref<any>()
const currentIndex = ref<number>(0)
const dataFlag = ref('2')

const ok = () => {
  editVisible.value = false
  currentItem.value = null
}

const cancel = () => {
  editVisible.value = false
  current.value.children[currentIndex.value] = currentItem.value
  currentItem.value = null
}

const edit = (item: ComponentItem, index: number) => {
  editVisible.value = true
  currentIndex.value = index
  currentItem.value = cloneDeep(item)
}

const add = () => {
  current.value.children.push({
    type: 'option',
    attrs: {
      label: '选项' + (current.value.children.length + 1),
      value: String(current.value.children.length + 1),
      disabled: false,
    },
  })
}

const del = (item: ComponentItem, index: number) => {
  current.value.children.splice(index, 1)
}

const changeMultiple = (val: boolean) => {
  const item = cloneDeep(current.value)
  item.value = val ? [] : ''
  localStorage.setItem('currentComponent', JSON.stringify(item))
  store.commit('setCurrentComponent', item)
}

watch(
  () => current.value,
  val => {
    localStorage.setItem('currentComponent', JSON.stringify(val))
    store.commit('setCurrentComponent', val)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped></style>
