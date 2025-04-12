<template>
  <el-form :model="model" :rules="rules">
    <el-form-item label="输入框" labelWidth="90px">
      <el-input v-model="model.inputValue17" placeholder="请输入" clearable></el-input>
    </el-form-item>

    <el-form-item label="开关" labelWidth="90px">
      <el-switch v-model="model.switch615"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {ref} from "vue"
let model = ref({inputValue17: "", switch615: ""})
let rules = ref({
  inputValue17: [],
  switch615: [{trigger: "blur", message: "只能输入数字", pattern: "/^\\d*$/"}]
})
</script>

<style scoped lang="scss"></style>
