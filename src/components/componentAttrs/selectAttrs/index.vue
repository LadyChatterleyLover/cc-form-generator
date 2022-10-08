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
    <el-divider></el-divider>
    <RequestSetting></RequestSetting>
    <el-divider></el-divider>
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
import { computed, ComputedRef, ref, watch } from 'vue'
import RequestSetting from '../requestSetting/index.vue'

const store = useStore()

const current: ComputedRef<any> = computed(() => store.state.currentComponent)
const editVisible = ref<boolean>(false)
const currentItem = ref<any>()
const currentIndex = ref<number>(0)

const ok = () => {
  editVisible.value = false
  currentItem.value = null
}

const cancel = () => {
  editVisible.value = false
  current.value.children[currentIndex.value] = currentItem.value
  currentItem.value = null
}

watch(
  () => current.value,
  (val) => {
    localStorage.setItem('currentComponent', JSON.stringify(val))
    store.commit('setCurrentComponent', val)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped></style>
