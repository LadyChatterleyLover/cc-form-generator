<template>
  <div>
    <div class="rule" v-for="(item, index) in arr" :key="index">
      <div><el-checkbox v-model="patternChecked">正则</el-checkbox></div>
      <div style="margin: 0 0 10px 30px" v-if="patternChecked">
        <el-radio-group v-model="patternRadio" v-if="patternChecked">
          <el-radio label="self">内置正则</el-radio>
          <el-radio label="custom">自定义正则</el-radio>
        </el-radio-group>
        <div style="margin-top: 10px">
          <el-select
            v-if="patternRadio === 'self'"
            style="width: 100%"
            placeholder="请选择匹配规则"
            v-model="arr[index].patternType"
          >
            <el-option
              v-for="(item, index) in regSelect"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-else placeholder="请输入正则表达式" v-model="arr[activeIndex].customPattern"></el-input>
          <el-select v-model="arr[index].trigger" style="margin: 10px 0; width: 100%">
            <el-option label="失去焦点触发" value="blur"></el-option>
            <el-option label="值改变触发" value="change"></el-option>
          </el-select>
          <el-input v-model="arr[index].message" placeholder="请输入提示信息"></el-input>
        </div>
      </div>
      <div class="close" @click="close(index)">
        <CircleCloseFilled />
      </div>
    </div>
    <div style="cursor: pointer" @click="addRule">
      <CirclePlusFilled class="icon" />
      <el-button type="text">添加验证</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComponentItem } from '@/types'
import { ComputedRef, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { CirclePlusFilled, CircleCloseFilled } from '@element-plus/icons-vue'
import { RuleItem, ExecuteValidator } from '@/types/rules'

interface Value {
  trigger: 'blur' | 'change'
  message: string
  patternType?: string
  customPattern?: string
  pattern?: RegExp
  validator?: RuleItem['validator'] | ExecuteValidator
}

const store = useStore()
const current: ComputedRef<ComponentItem> = computed(() => store.state.currentComponent)

const patternChecked = ref(false)
const patternRadio = ref<'custom' | 'self'>('self')
const activeIndex = ref(-1)
const arr = ref<Value[]>([])
const regSelect = [
  {
    label: '必填',
    value: 'required',
  },
  {
    label: '邮箱',
    value: 'email',
  },
  {
    label: '手机号',
    value: 'tel',
  },
  {
    label: '身份证',
    value: 'card',
  },
  {
    label: '金额(千分位)',
    value: 'money',
  },
  {
    label: '整数',
    value: 'noFloat',
  },
  {
    label: '小数',
    value: 'float',
  },
  {
    label: '中文',
    value: 'chinese',
  },
  {
    label: '英文',
    value: 'english',
  },
]

const regList = [
  {
    label: 'email',
    value: /^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
  },
  {
    label: 'tel',
    value: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
  },
  {
    label: 'card',
    value: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
  },
  {
    label: 'money',
    value: /^-?\d+(,\d{3})*(\.\d{1,2})?$/,
  },
  {
    label: 'noFloat',
    value: /^-?[0-9]\d*$/,
  },
  {
    label: 'float',
    value: /^\d+\.\d+$/,
  },
  {
    label: 'chinese',
    value:
      /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
  },
  {
    label: 'english',
    value: /^[a-zA-Z]+$/,
  },
]

const addRule = () => {
  arr.value.push({
    trigger: 'blur',
    message: '',
  })
  activeIndex.value++
}
const close = (index: number) => {
  arr.value.splice(index, 1)
  current.value.rules! = arr.value
}

watch(
  () => arr.value[activeIndex.value],
  (val) => {
    if (val) {
      if (patternRadio.value === 'self' && val.patternType) {
        if (val.patternType === 'required') {
          current.value.rules![activeIndex.value] = {
            trigger: val.trigger,
            message: val.message,
            required: true,
          }
        } else {
          const pattern = regList.find((item) => item.label === val.patternType)!.value
          current.value.rules![activeIndex.value] = {
            trigger: val.trigger,
            message: val.message,
            pattern: pattern.toString(),
          }
        }
      } else {
        current.value.rules![activeIndex.value] = {
          trigger: val.trigger,
          message: val.message,
          pattern: val.customPattern,
        }
      }
    }
  },
  { deep: true }
)

watch(
  () => current.value,
  (val) => {
    localStorage.setItem('currentComponent', JSON.stringify(val))
    store.commit('setCurrentComponent', val)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.icon {
  color: #409eff;
  width: 1em;
  height: 1em;
  position: relative;
  top: 3px;
  margin-right: 4px;
}
.rule {
  padding: 12px 6px;
  background: #f8f8f8;
  position: relative;
  border-radius: 4px;
  margin-bottom: 10px;
  .close {
    position: absolute;
    top: -8px;
    right: 0;
    color: rgba(0, 0, 0, 0.2);
    z-index: 1;
    cursor: pointer;
  }
}
</style>
