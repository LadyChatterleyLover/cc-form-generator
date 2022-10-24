<template>
  <div>
    <el-form v-if="formAttrs" label-width="90px">
      <el-form-item label="表单名">
        <el-input v-model="formAttrs.formName" clearable placeholder="请输入表单名"></el-input>
      </el-form-item>
      <el-form-item label="表单模型">
        <el-input v-model="formAttrs.model" clearable placeholder="请输入表单模型"></el-input>
      </el-form-item>
      <el-form-item label="校验模型">
        <el-input v-model="formAttrs.rules" clearable placeholder="请输入校验模型"></el-input>
      </el-form-item>
      <el-form-item label="表单尺寸">
        <el-radio-group v-model="formAttrs.size">
         <el-radio-button label="small">较小</el-radio-button>
         <el-radio-button label="default">默认</el-radio-button>
         <el-radio-button label="large">较大</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签对齐">
        <el-radio-group v-model="formAttrs.labelPosition">
         <el-radio-button label="left">左对齐</el-radio-button>
         <el-radio-button label="right">右对齐</el-radio-button>
         <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input-number :min="1" v-model="formAttrs.labelWidth" clearable placeholder="请输入标签宽度"></el-input-number>
      </el-form-item>
      <el-form-item label="禁用表单">
        <el-switch v-model="formAttrs.disabled"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts' setup>
import {ref, watch, computed, onMounted} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const formAttrs = computed(() => store.state.formAttrs)

onMounted(() => {
  const attrs = {
    formName: 'elForm',
    model: 'model',
    rules: 'rules',
    size: 'default',
    labelPosition: 'left',
    labelWidth: 90,
    disabled: false	
  }
  store.commit('setFormAttrs', attrs)
  localStorage.setItem('formAttrs', JSON.stringify(attrs))
})

watch(() => formAttrs.value, val => {
  localStorage.setItem('setFormAttrs', JSON.stringify(val))
  store.commit('setFormAttrs', val)
}, { deep: true })
</script>

<style lang='scss' scoped>

</style>