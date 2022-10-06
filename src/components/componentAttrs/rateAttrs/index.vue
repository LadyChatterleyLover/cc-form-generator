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
    <el-form-item label="评分总数">
      <el-input-number :min="1" v-model="current.attrs.max" placeholder="请输入评分总数" clearable></el-input-number>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number v-model="current.labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="未激活颜色">
      <el-color-picker v-model="current.attrs.voidColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="只读时颜色">
      <el-color-picker v-model="current.attrs.disabledVoidColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="允许半选">
      <el-switch v-model="current.attrs.allowHalf"></el-switch>
    </el-form-item>
    <el-form-item label="显示文案">
      <el-switch v-model="current.attrs.showText"></el-switch>
    </el-form-item>
    <el-form-item label="显示评分">
      <el-switch v-model="current.attrs.showScore"></el-switch>
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, ComputedRef, ref, watch, h } from 'vue'
import chooseIcon from '@/components/chooseIcon/index.vue'

const store = useStore()

const current: ComputedRef<any> = computed(() => store.state.currentComponent)
const visible = ref<boolean>(false)


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
