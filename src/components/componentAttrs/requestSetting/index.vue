<template>
  <div>
    <el-tabs v-model="setting">
      <el-tab-pane label="静态数据" :name="0">
        <el-form-item label="选项配置">
          <div style="display: flex; margin-bottom: 10px" v-for="(item, index) in current.children" :key="index">
            <el-input v-model="item.attrs.label" clearable placeholder="请输入导航标题"></el-input>
            <el-button style="margin: 0 3px" @click="edit(item, index)" type="primary" circle :icon="Edit"></el-button>
            <el-button @click="del(item, index)" type="danger" circle :icon="Delete"></el-button>
          </div>
          <el-button type="primary" size="small" @click="add">添加选项</el-button>
        </el-form-item></el-tab-pane
      >
      <el-tab-pane label="动态数据" :name="1">
        <el-form-item label="接口根路径">
          <el-select v-model="model.domain" placeholder="请选择" clearable filterable>
            <el-option v-for="item in domainList" :key="item.value" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义路径" v-if="model.domain === 'custom'">
          <el-input v-model="model.customDomain" placeholder="请输入接口地址" clearable>
            <template #prepend>
              <el-select v-model="model.customDomainSelect" placeholder="Select" style="width: 100px">
                <el-option label="http://" value="1" />
                <el-option label="https://" value="2" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="接口地址">
          <el-input v-model="model.interfaceRoute" placeholder="请输入接口地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-select v-model="model.method" placeholder="请选择" clearable filterable>
            <el-option v-for="item in methodList" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="label字段">
          <el-input v-model="model.labelKey" placeholder="请输入label字段" clearable></el-input>
        </el-form-item>
        <el-form-item label="value字段">
          <el-input v-model="model.valueKey" placeholder="请输入value字段" clearable></el-input>
        </el-form-item>
        <el-form-item label="请求参数">
          <el-button type="primary" size="small" @click="settingParams">参数配置</el-button>
        </el-form-item>
        <el-form-item label="发送请求">
          <el-button type="primary" size="small" @click="send">发送请求</el-button>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="settingParamsVisible" title="参数配置">
      <el-tabs v-model="headerSetting">
        <el-tab-pane label="请求头" name="1">
          <el-table :data="headersData" border>
            <el-table-column label="请求头" prop="name"></el-table-column>
            <el-table-column label="内容">
              <template #default="{ row }">
                <el-input v-model="row.value" placeholder="请输入" clearable></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="请求参数" name="2">
          <div style="text-align: right; margin-bottom: 20px">
            <el-button type="primary" size="small" @click="addParams">添加参数</el-button>
          </div>
          <el-table :data="paramsData" border>
            <el-table-column label="参数名" align="center">
              <template #default="{ row }">
                <el-input v-model="row.name" placeholder="请输入参数名"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="参数值" align="center">
              <template #default="{ row }">
                <el-input v-model="row.value" placeholder="请输入参数名"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template #default="{ $index }">
                <el-button type="danger" size="small" @click="delParams($index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <el-button @click="settingCancel">取消</el-button>
        <el-button type="primary" @click="settingConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref, watch } from 'vue'
import { ComponentItem } from '@/types'
import { useStore } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Edit, Delete } from '@element-plus/icons-vue'

interface Value {
  name: string
  value: any
}
const store = useStore()

const current: ComputedRef<any> = computed(() => store.state.currentComponent)
const editVisible = ref<boolean>(false)
const currentItem = ref<any>()
const currentIndex = ref<number>(0)

const setting = ref(0)
const headerSetting = ref('1')

const settingParamsVisible = ref(false)
const model = ref({
  domain: '',
  customDomain: '',
  customDomainSelect: '1',
  interfaceRoute: '',
  method: '',
  labelKey: 'label',
  valueKey: 'value',
})
const settingItem = ref<Value[]>([])
const params = ref('')
const headersData = ref([
  {
    name: 'Kte-Auth',
    value: '',
  },
  {
    name: 'Authorization',
    value: '',
  },
  {
    name: 'Tenant-Id',
    value: '000000',
  },
])
const paramsData = ref<Value[]>([
  {
    name: '',
    value: '',
  },
])

const settingParams = () => {
  settingItem.value = cloneDeep(paramsData.value)
  settingParamsVisible.value = true
}

const domainList = ref([
  {
    name: '开发服',
    value: 'http://192.168.180.11:8080',
  },
  {
    name: '测试服',
    value: 'http://192.168.180.12:8080',
  },
  {
    name: '正式服',
    value: 'https://kte.group/Api',
  },
  {
    name: '自定义',
    value: 'custom',
  },
])

const methodList = ref([
  {
    name: 'get',
    value: 'get',
  },
  {
    name: 'post',
    value: 'post',
  },
  {
    name: 'put',
    value: 'put',
  },
  {
    name: 'delete',
    value: 'delete',
  },
])

const edit = (item: ComponentItem, index: number) => {
  editVisible.value = true
  currentIndex.value = index
  currentItem.value = cloneDeep(item)
}

const add = () => {
  current.value.children.push({
    type: 'option',
    attrs: {
      label: '选项' + (current.value.children.length + 1),
      value: String(current.value.children.length + 1),
      disabled: false,
    },
  })
}

const del = (item: ComponentItem, index: number) => {
  current.value.children.splice(index, 1)
}

const addParams = () => {
  paramsData.value.push({
    name: '',
    value: '',
  })
}

const delParams = (index: number) => {
  paramsData.value.splice(index, 1)
}

const settingConfirm = () => {
  settingItem.value = []
  settingParamsVisible.value = false
}
const settingCancel = () => {
  paramsData.value = cloneDeep(settingItem.value)
  settingParamsVisible.value = false
}

const send = () => {
  if (model.value.domain && model.value.interfaceRoute && model.value.method) {
    let url = model.value.domain + model.value.interfaceRoute
    const headers: Record<string, any> = {}
    headersData.value.map((item) => {
      headers[item.name] = item.value
    })
    if (model.value.method === 'get') {
      if (paramsData.value.length) {
        paramsData.value.map((item) => {
          params.value += `${item.name}=${item.value}&`
        })
        params.value = '?' + params.value.slice(0, params.value.length - 1)
        params.value = params.value === '?=' ? '' : params.value
      }
      url += params.value
      axios[model.value.method](url, {
        headers,
      })
        .then((res) => {
          if (res.data.data.length) {
            ElMessage.success('请求成功')
            res.data.data.map((item) => {
              let obj: any = {}
              obj.type = 'option'
              obj.attrs = {
                label: item[model.value.labelKey],
                value: item[model.value.valueKey],
              }
              current.value.children.push(obj)
            })
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage.error('请求失败')
        })
    } else {
      axios[model.value.method](url, params.value, {
        headers,
      })
        .then((res) => {
          if (res.data.data.length) {
            ElMessage.success('请求成功')
            res.data.data.map((item) => {
              let obj: any = {}
              obj.type = 'option'
              obj.attrs = {
                label: item[model.value.labelKey],
                value: item[model.value.valueKey],
              }
              current.value.children.push(obj)
            })
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage.error('请求失败')
        })
    }
  }
}
watch(
  () => setting.value,
  (val) => {
    if (val === 1) {
      current.value.children = []
    } else {
      current.value.children = [
        {
          type: 'option',
          attrs: {
            disabled: false,
            value: '1',
            label: '选项1',
          },
        },
        {
          type: 'option',
          attrs: {
            disabled: false,
            value: '2',
            label: '选项2',
          },
        },
      ]
    }
  },
  { immediate: true }
)
</script>

<style scoped></style>
