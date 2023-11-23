<template>
  <el-dialog title="配置远程数据" width="60%" v-model="visible" :close-on-click-modal="false" @close="close">
    <el-form ref="formRef" :model="model" labelWidth="90px">
      <el-form-item label="请求方式" prop="method">
        <el-select v-model="model.method">
          <el-option label="GET" value="get"></el-option>
          <el-option label="POST" value="post"></el-option>
          <el-option label="PATCH" value="patch"></el-option>
          <el-option label="PUT" value="put"></el-option>
          <el-option label="OPTION" value="option"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请求路径" prop="url">
        <el-input v-model="model.url" placeholder="请求路径" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="请求参数" prop="params">
        <el-input
          v-model="model.params"
          placeholder="多个参数请以&分割，例如：a=1&b=2"
          type="textarea"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="请求投" prop="headers">
        <el-input
          v-model="model.headers"
          placeholder="多个请求头请以&分割，例如：a=1&b=2"
          type="textarea"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="数据字段名" prop="name">
        <el-input v-model="model.name" placeholder="数据字段名..."></el-input>
      </el-form-item>
      <el-form-item label="数据字段名" prop="label">
        <el-input v-model="model.label" placeholder="label字段名..."></el-input>
      </el-form-item>
      <el-form-item label="数据字段名" prop="value">
        <el-input v-model="model.value" placeholder="value字段名..."></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close" :disabled="loading">取消</el-button>
      <el-button type="primary" @click="confirm" :disabled="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
interface Model {
  url: string
  method: 'get' | 'post' | 'patch' | 'put' | 'option'
  params: any
  headers: any
  name: string
  label: string
  value: string
}

import { ref, watch } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import axios from 'axios'
import { ComponentItem } from '../../types/index'
import { useStore } from 'vuex'

const store = useStore()

const visible = ref(false)
const loading = ref(false)

const current = ref<ComponentItem>()
const childType = ref('')
const formRef = ref<FormInstance>()
const model = ref<Model>({
  url: 'https://jsonplaceholder.typicode.com/posts',
  method: 'get',
  params: null,
  headers: null,
  name: '',
  label: 'title',
  value: 'id',
})

const open = (item: ComponentItem, type: string) => {
  current.value = item
  childType.value = type
  visible.value = true
}

const close = () => {
  formRef.value?.resetFields()
  visible.value = false
}

const confirm = () => {
  let url = model.value.url
  let params = {}
  loading.value = true
  if (model.value.method === 'get') {
    url += model.value.params ? `?${model.value.params}` : ''
    axios[model.value.method](url)
      .then(res => {
        const data = model.value.name ? res.data[model.value.name] : res.data
        current.value.children = data.map(item => ({
          attrs: {
            label: item[model.value.label],
            value: item[model.value.value],
          },
          type: childType.value,
        }))
        ElMessage.success('加载成功')
        close()
      })
      .catch(err => {
        console.log('err', err)
        ElMessage.error('请求出错')
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    if (model.value.params) {
      const arr = model.value.params.split('&')
      arr.map(item => {
        const itemArr = item.split('=')
        params[itemArr[0]] = itemArr[1]
      })
      axios[model.value.method](url, params)
        .then(res => {
          const data = model.value.name ? res.data[model.value.name] : res.data
          current.value.children = data.map(item => ({
            attrs: {
              label: item[model.value.label],
              value: item[model.value.value],
            },
            type: childType.value,
          }))
          ElMessage.success('加载成功')
          close()
        })
        .catch(() => {
          ElMessage.error('请求出错')
        })
        .finally(() => {
          loading.value = false
        })
    }
  }
}

watch(
  () => current.value,
  val => {
    localStorage.setItem('currentComponent', JSON.stringify(val))
    store.commit('setCurrentComponent', val)
  },
  { deep: true }
)

defineExpose({
  open,
})
</script>

<style scoped></style>
