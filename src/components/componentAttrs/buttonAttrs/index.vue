<template>
  <el-form label-width="90px">
    <el-form-item label="标题">
      <el-input v-model="current.label" placeholder="请输入标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number v-model="current.labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="按钮类型">
      <el-select v-model="current.attrs.type" placeholder="请选择输入框类型">
        <el-option value="default" label="默认按钮"></el-option>
        <el-option value="primary" label="主要按钮"></el-option>
        <el-option value="success" label="成功按钮"></el-option>
        <el-option value="info" label="信息按钮"></el-option>
        <el-option value="warning" label="警告按钮"></el-option>
        <el-option value="danger" label="危险按钮"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="按钮尺寸">
      <el-select v-model="current.attrs.size" placeholder="请选择输入框尺寸">
        <el-option value="" label="默认尺寸"></el-option>
        <el-option value="medium" label="中号"></el-option>
        <el-option value="small" label="小号"></el-option>
        <el-option value="large" label="大号"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="原生类型">
      <el-select v-model="current.attrs.nativeType" placeholder="请选择原生类型">
        <el-option value="button" label="普通按钮"></el-option>
        <el-option value="submit" label="提交按钮"></el-option>
        <el-option value="reset" label="重置按钮"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="按钮图标">
      <el-input v-model="current.attrs.icon" clearable 
      placeholder="请输入按钮图标">
        <template #append>
          <el-button :icon="Pointer" @click="choose('icon')">选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="朴素按钮">
      <el-switch v-model="current.attrs.plain"></el-switch>
    </el-form-item>
    <el-form-item label="圆角按钮">
      <el-switch v-model="current.attrs.round"></el-switch>
    </el-form-item>
    <el-form-item label="圆形按钮">
      <el-switch v-model="current.attrs.circle"></el-switch>
    </el-form-item>
    <el-form-item label="加载状态">
      <el-switch v-model="current.attrs.loading"></el-switch>
    </el-form-item>
    <el-form-item label="禁用状态">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="默认聚焦">
      <el-switch v-model="current.attrs.autofocus"></el-switch>
    </el-form-item>
    <el-form-item label="插入空格">
      <el-switch v-model="current.attrs.autoInsertSpace"></el-switch>
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