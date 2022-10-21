<template>
  <el-form label-width="90px">
    <el-form-item label="字段名">
      <el-input v-model="current.field" placeholder="请输入字段名" clearable></el-input>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="current.label" placeholder="请输入标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number v-model="current.labelWidth"></el-input-number>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="current.value" placeholder="请输入默认值" clearable></el-input>
    </el-form-item>
    <el-form-item label="占位符">
      <el-input v-model="current.attrs.placeholder" placeholder="请输入默认值" clearable></el-input>
    </el-form-item>
    <el-form-item label="日期格式">
      <el-input v-model="current.attrs.format" placeholder="请输入日期格式" clearable></el-input>
    </el-form-item>
    <el-form-item label="日期类型">
      <el-select v-model="current.attrs.type" placeholder="请选择复选框尺寸">
        <el-option value="date" label="日"></el-option>
        <el-option value="week" label="周"></el-option>
        <el-option value="month" label="月"></el-option>
        <el-option value="year" label="年"></el-option>
        <el-option value="dates" label="月"></el-option>
        <el-option value="datetime" label="日期时间"></el-option>
        <el-option value="datetimerange" label="日期时间范围"></el-option>
        <el-option value="daterange" label="日期时间"></el-option>
        <el-option value="monthrange" label="月份范围"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="尺寸">
      <el-select v-model="current.attrs.size" placeholder="请选择复选框尺寸">
        <el-option value="default" label="默认"></el-option>
        <el-option value="small" label="小型"></el-option>
        <el-option value="large" label="大型"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="显示标签">
      <el-switch v-model="current.showLabel"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="current.attrs.readonly"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="current.attrs.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="可清空">
      <el-switch v-model="current.attrs.clearable"></el-switch>
    </el-form-item>
    <el-form-item label="可编辑">
      <el-switch v-model="current.attrs.editable"></el-switch>
    </el-form-item>
    <template
      v-if="
        current.attrs.type === 'datetimerange' ||
        current.attrs.type === 'daterange' ||
        current.attrs.type === 'monthrange'
      "
    >
      <el-form-item label="开始占位符">
        <el-input v-model="current.attrs.startPlaceholder" placeholder="请输入开始日期" clearable></el-input>
      </el-form-item>
      <el-form-item label="结束占位符">
        <el-input v-model="current.attrs.startPlaceholder" placeholder="请输入结束日期" clearable></el-input>
      </el-form-item>
      <el-form-item label="分割符">
        <el-input v-model="current.attrs.rangeSeparator" placeholder="请输入结束日期" clearable></el-input>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, ComputedRef, watch } from 'vue'
import cloneDeep from 'lodash/cloneDeep'

const store = useStore()

const current: ComputedRef<any> = computed(() => store.state.currentComponent)

const changeRange = (val: boolean) => {
  const item = cloneDeep(current.value)
  item.value = val ? [] : ''
  localStorage.setItem('currentComponent', JSON.stringify(item))
  store.commit('setCurrentComponent', item)
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
