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
    <el-form-item label="开关宽度">
      <el-input-number :min="1" v-model="current.attrs.width" placeholder="请输入开关宽度" clearable></el-input-number>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number v-model="current.labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="激活图标">
      <el-input v-model="current.attrs.activeIcon" clearable placeholder="请输入激活图标">
        <template #append>
          <el-button :icon="Pointer" @click="choose('activeIcon')">选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="未激活图标">
      <el-input v-model="current.attrs.inactiveIcon" clearable placeholder="请输入后图标">
        <template #append>
          <el-button :icon="Pointer" @click="choose('inactiveIcon')">选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="激活文案">
      <el-input v-model="current.attrs.activeText" placeholder="请输入激活文案" clearable></el-input>
    </el-form-item>
    <el-form-item label="未激活文案">
      <el-input v-model="current.attrs.inactiveText" placeholder="请输入未激活文案" clearable></el-input>
    </el-form-item>
    <el-form-item label="激活颜色">
      <el-color-picker v-model="current.attrs.activeColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="未激活颜色">
      <el-color-picker v-model="current.attrs.inactiveColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="边框颜色">
      <el-color-picker v-model="current.attrs.borderColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="加载状态">
      <el-switch v-model="current.attrs.loading"></el-switch>
    </el-form-item>
  </el-form>
  <choose-icon title="选择图标" v-model:visible="visible" @click-item="clickItem"></choose-icon>
</template>

<script lang='ts' setup>
import { useStore } from 'vuex'
import { computed, ComputedRef, ref, watch } from 'vue'
import { Pointer } from '@element-plus/icons-vue'
import chooseIcon from '@/components/chooseIcon/index.vue'

const store = useStore()

const current: ComputedRef<any> = computed(() => store.state.currentComponent)
const position = ref<string>('')
const visible = ref<boolean>(false)

const choose = (p: string) => {
  position.value = p
  visible.value = true
}

const clickItem = (val: string) => {
  current.value.attrs[position.value] = val
  visible.value = false
}

watch(() => current.value, val => {
  localStorage.setItem('currentComponent', JSON.stringify(val))
  store.commit('setCurrentComponent', val)
}, { deep: true })
</script>

<style lang='scss' scoped>
</style>