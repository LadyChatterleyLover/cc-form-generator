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
    <el-form-item label="单选框样式">
      <el-select v-model="buttonType" placeholder="请选择单选框样式" @change="changeButtonType">
        <el-option value="radio" label="默认"></el-option>
        <el-option value="radio-button" label="按钮"></el-option>
      </el-select>
    </el-form-item>
    <template v-if="buttonType === 'radio-button'">
      <el-form-item label="文本颜色">
        <el-color-picker v-model="current.attrs.textColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="填充颜色">
        <el-color-picker v-model="current.attrs.fill"></el-color-picker>
      </el-form-item>
    </template>
    <el-form-item label="选项配置">
      <div
        style="display: flex;margin-bottom: 10px;"
        v-for="(item, index) in current.children"
        :key="index"
      >
        <el-input v-model="item.attrs.text" clearable placeholder="请输入导航标题"></el-input>
        <el-button
          style="margin: 0 3px;"
          @click="edit(item, index)"
          type="primary"
          circle
          :icon="Edit"
        ></el-button>
        <el-button @click="del(item, index)" type="danger" circle :icon="Delete"></el-button>
      </div>
      <el-button type="primary" size="small" @click="add">添加选项</el-button>
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
  </el-form>

  <el-dialog v-model="editVisible" title="编辑数据源" width="30%">
    <el-form v-if="current" :model="current.children[currentIndex]" label-width="100px">
      <el-form-item label="绑定值">
        <el-input
          v-model="current.children[currentIndex].attrs.label"
          placeholder="请输入数据绑定值"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="选项尺寸" v-if="current.children[currentIndex].type === 'radio-button'">
        <el-select v-model="current.children[currentIndex].attrs.size" placeholder="请选择输入框尺寸">
          <el-option value label="默认尺寸"></el-option>
          <el-option value="medium" label="中号"></el-option>
          <el-option value="small" label="小号"></el-option>
          <el-option value="large" label="大号"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="current.children[currentIndex].attrs.disabled"></el-switch>
      </el-form-item>
      <el-form-item label="显示边框" v-if="current.children[currentIndex].type === 'radio'">
        <el-switch v-model="current.children[currentIndex].attrs.border"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="ok">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { useStore } from 'vuex'
import { computed, ComputedRef, ref, watch } from 'vue'
import { ComponentItem } from '@/types'
import cloneDeep from 'lodash/cloneDeep'
import { Edit, Delete } from '@element-plus/icons-vue'

const store = useStore()

const current: ComputedRef<any> = computed(() => store.state.currentComponent)
const editVisible = ref<boolean>(false)
const currentItem = ref<any>()
const currentIndex = ref<number>(0)
const buttonType = ref<'radio' | 'radio-button'>('radio')

const changeButtonType = (val: 'radio' | 'radio-button') => {
  current.value.children.map((item: ComponentItem) => {
    item.type = val
  })
  localStorage.setItem('currentComponent', JSON.stringify(current.value))
  store.commit('setCurrentComponent', current.value)
}

const edit = (item: ComponentItem, index: number) => {
  editVisible.value = true
  currentIndex.value = index
  currentItem.value = cloneDeep(item)
}


const del = (item: ComponentItem, index: number) => {
  current.value.children.splice(index, 1)
}

const ok = () => {
  editVisible.value = false
  currentItem.value = null
}

const cancel = () => {
  editVisible.value = false
  current.value.children[currentIndex.value] = currentItem.value
  currentItem.value = null
}

const add = () => {
  current.value.children.push({
    type: 'radio',
    attrs: {
      text: '选项' + (current.value.children.length + 1),
      label: String(current.value.children.length + 1),
      disabled: false,
      border: false,
      size: ''
    }
  })
}

watch(() => current.value, val => {
  localStorage.setItem('currentComponent', JSON.stringify(val))
  store.commit('setCurrentComponent', val)
}, { deep: true })
</script>

<style lang='scss' scoped>
</style>