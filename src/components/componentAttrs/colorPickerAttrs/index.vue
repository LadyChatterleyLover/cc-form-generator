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
    <el-form-item label="取色器尺寸">
      <el-select v-model="current.attrs.size" placeholder="请选择输入框尺寸">
        <el-option value="" label="默认尺寸"></el-option>
        <el-option value="medium" label="中号"></el-option>
        <el-option value="small" label="小号"></el-option>
        <el-option value="large" label="大号"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="颜色格式">
      <el-select @change="changeColorFormat" v-model="current.attrs.colorFormat" placeholder="请选择输入框尺寸">
        <el-option value="rgb" label="rgb"></el-option>
        <el-option value="hsl" label="hsl"></el-option>
        <el-option value="hsv" label="hsv"></el-option>
        <el-option value="hex" label="hex"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="透明度">
      <el-switch v-model="current.attrs.showAlpha"></el-switch>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number v-model="current.labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { useStore } from 'vuex'
import { computed, ComputedRef, watch } from 'vue'

const store = useStore()

const current: ComputedRef<any> = computed(() => store.state.currentComponent)

const changeColorFormat = (val: string) => {
  current.value.value = ''
  current.value.attrs.colorFormat = val
  localStorage.setItem('currentComponent', JSON.stringify(current.value))
  store.commit('setCurrentComponent', current.value)
}

watch(() => current.value, val => {
  localStorage.setItem('currentComponent', JSON.stringify(val))
  store.commit('setCurrentComponent', val)
}, { deep: true })
</script>

<style lang='scss' scoped>
</style>