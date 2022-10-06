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
    <el-form-item label="最小值">
      <el-input-number v-model="current.attrs.min" placeholder="请输入最小值" clearable></el-input-number>
    </el-form-item>
    <el-form-item label="最大值">
      <el-input-number v-model="current.attrs.max" placeholder="请输入最大值" clearable></el-input-number>
    </el-form-item>
    <el-form-item label="步进">
      <el-input-number v-model="current.attrs.step" placeholder="请输入步进" clearable></el-input-number>
    </el-form-item>
    <el-form-item label="显示输入框">
      <el-switch v-model="current.attrs.showInput"></el-switch>
    </el-form-item>
    <template v-if="current.attrs.showInput">
      <el-form-item label="输入框尺寸">
        <el-select v-model="current.attrs.size" placeholder="请选择输入框尺寸">
          <el-option value="large" label="默认尺寸"></el-option>
          <el-option value="medium" label="中号"></el-option>
          <el-option value="small" label="小号"></el-option>
          <el-option value="large" label="大号"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="控制按钮">
        <el-switch v-model="current.attrs.showInputControls"></el-switch>
      </el-form-item>
    </template>
    <el-form-item label="范围选择">
      <el-switch v-model="current.attrs.range"></el-switch>
    </el-form-item>
    <el-form-item label="间断点">
      <el-switch v-model="current.attrs.showStops"></el-switch>
    </el-form-item>
    <el-form-item label="显示tooltip">
      <el-switch v-model="current.attrs.showTooltip"></el-switch>
    </el-form-item>
    <el-form-item label="竖向排列">
      <el-switch v-model="current.attrs.vertical"></el-switch>
    </el-form-item>
    <el-form-item label="竖向高度" v-if="current.attrs.vertical">
      <el-input-number
        @change="changeHeight"
        v-model="current.attrs.heightValue"
        placeholder="请输入竖向高度"
        clearable
      ></el-input-number>
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
import { computed, ComputedRef, watch, ref } from 'vue'

const store = useStore()

const current: ComputedRef<any> = computed(() => store.state.currentComponent)


const changeHeight = (val: number) => {
  current.value.attrs.height = String(val)
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