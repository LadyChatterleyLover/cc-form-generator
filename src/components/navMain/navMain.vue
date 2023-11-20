<template>
  <div class="w-full h-full relative">
    <div class="w-full h-full p-5" @drop="drop" @dragover="dragover">
      <el-form
        :label-position="formAttrs?.labelPosition"
        :label-width="`${formAttrs?.labelWidth}px`"
        :size="formAttrs?.size"
        :disabled="formAttrs?.disabled"
        :model="model"
        :rules="rules"
        :validate-on-rule-change="false"
        v-if="componentList && componentList.length"
      >
        <template v-for="(item, index) in componentList" :key="index">
          <el-form-item
            class="p-5 relative"
            :prop="item.field"
            :class="{ active: activeIndex === index, 'rate-form-item-align-center': item.type === 'rate' }"
            :label="item.showLabel ? item.label : ''"
            :label-width="`${item.showLabel ? `${item.labelWidth}px` : '0px'}`"
            @click="clickItem(item, index)"
          >
            <template v-if="item.type === 'button'">
              <el-button
                v-if="item.attrs.type === 'default'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
                >{{ item.attrs.buttonText }}</el-button
              >
              <el-button
                v-if="item.attrs.type === 'primary'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
                >{{ item.attrs.buttonText }}</el-button
              >
              <el-button
                v-if="item.attrs.type === 'success'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
                >{{ item.attrs.buttonText }}</el-button
              >
              <el-button
                v-if="item.attrs.type === 'warning'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
                >{{ item.attrs.buttonText }}</el-button
              >
              <el-button
                v-if="item.attrs.type === 'info'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
                >{{ item.attrs.buttonText }}</el-button
              >
              <el-button
                v-if="item.attrs.type === 'danger'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
                >{{ item.attrs.buttonText }}</el-button
              >
            </template>
            <template v-else-if="item.type === 'color-picker'">
              <el-color-picker
                v-if="item.attrs.colorFormat === 'rgb'"
                v-model="item.value"
                v-bind="item.attrs"
                color-format="rgb"
              ></el-color-picker>
              <el-color-picker
                v-if="item.attrs.colorFormat === 'hex'"
                v-model="item.value"
                v-bind="item.attrs"
                color-format="hex"
              ></el-color-picker>
              <el-color-picker
                v-if="item.attrs.colorFormat === 'hsl'"
                v-model="item.value"
                v-bind="item.attrs"
                color-format="hsl"
              ></el-color-picker>
              <el-color-picker
                v-if="item.attrs.colorFormat === 'hsv'"
                v-model="item.value"
                v-bind="item.attrs"
                color-format="hsv"
              ></el-color-picker>
            </template>
            <template v-else-if="item.type === 'cascader'">
              <el-cascader :options="item.children" v-bind="{ ...item.attrs }"></el-cascader>
            </template>
            <template v-else-if="item.type === 'time-picker'">
              <el-time-picker v-if="item.attrs.isRange" isRange v-bind="{ ...item.attrs }"></el-time-picker>
              <el-time-picker v-else v-bind="{ ...item.attrs }"></el-time-picker>
            </template>
            <component
              v-else
              :is="`el-${item.type}`"
              v-bind="{
                ...item.attrs,
                height: item.attrs.height + 'px',
                activeIcon: (Icons as any)[item.attrs.activeIcon],
                inactiveIcon: (Icons as any)[item.attrs.inactiveIcon],
              }"
              v-model="item.value"
            >
              <template v-if="item.children && item.children.length">
                <template v-if="item.type === 'select'">
                  <component
                    v-for="(child, i) in item.children"
                    :key="i"
                    v-bind="child.attrs"
                    :is="`el-${child.type}`"
                  ></component>
                </template>
                <template v-else>
                  <component
                    v-for="(child, i) in item.children"
                    :key="i"
                    v-bind="child.attrs"
                    :is="`el-${child.type}`"
                    >{{ child.attrs.text }}</component
                  >
                </template>
              </template>
              <template #prefix v-if="item.type === 'input' && item.attrs.prefixIcon">
                <component :is="`el-icon-${toLine(item.attrs.prefixIcon!)}`"></component>
              </template>
              <template #suffix v-if="item.type === 'input' && item.attrs.suffixIcon">
                <component :is="`el-icon-${toLine(item.attrs.suffixIcon!)}`"></component>
              </template>
              <template #prepend v-if="item.type === 'input' && item.prefix">{{ item.prefix }}</template>
              <template #append v-if="item.type === 'input' && item.suffix">{{ item.suffix }}</template>
            </component>
            <div class="absolute top-[-35px] right-[10px] z-[999]" v-if="activeIndex === index">
              <el-tooltip content="复制">
                <el-button @click.stop="copy(item)" size="small" circle :icon="Edit" plain type="primary"></el-button>
              </el-tooltip>
              <el-tooltip content="删除">
                <el-button @click.stop="del(index)" size="small" circle :icon="Delete" plain type="danger"></el-button>
              </el-tooltip>
            </div>
          </el-form-item>
        </template>
      </el-form>
      <div class="h-[70%] flex justify-center items-center text-2xl text-[#ccb1ea]">
        从左侧拖入或点选组件进行表单设计
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, ComputedRef, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { toLine } from '@/utils'
import { ComponentItem } from '@/types'
import { Edit, Delete } from '@element-plus/icons-vue'
import * as Icons from '@element-plus/icons-vue'
import { RuleItem } from '@/types/rules'
import cloneDeep from 'lodash/cloneDeep'

const store = useStore()

const componentList: ComputedRef<any[]> = computed(() => store.state.componentList)
const currentComponent = computed(() => store.state.currentComponent)
const activeIndex = computed(() => store.state.activeIndex)
const formAttrs = computed(() => store.state.formAttrs)

const rules = ref<RuleItem>({})
const model = ref<any>({})

const dragover = (e: DragEvent) => {
  e.preventDefault()
}

const drop = (e: DragEvent) => {
  const item = JSON.parse(e.dataTransfer!.getData('item'))
  item.field += Math.floor(Math.random() * 1000)
  localStorage.setItem('currentComponent', JSON.stringify(item))
  store.commit('setCurrentComponent', item)
  if (componentList.value && componentList.value.length) {
    componentList.value.push(item)
    localStorage.setItem('componentList', JSON.stringify(componentList.value))
    store.commit('setComponentList', componentList.value)
    localStorage.setItem('activeIndex', String(componentList.value.length - 1))
    store.commit('setActiveIndex', componentList.value.length - 1)
  } else {
    const arr = []
    arr.push(item)
    localStorage.setItem('componentList', JSON.stringify(arr))
    store.commit('setComponentList', arr)
    localStorage.setItem('activeIndex', '0')
    store.commit('setActiveIndex', 0)
  }
}

const clickItem = (item: ComponentItem, index: number) => {
  localStorage.setItem('currentComponent', JSON.stringify(item))
  store.commit('setCurrentComponent', item)
  localStorage.setItem('activeIndex', String(index))
  store.commit('setActiveIndex', index)
}

const copy = (item: ComponentItem) => {
  componentList.value.push(item)
  localStorage.setItem('currentComponent', JSON.stringify(item))
  store.commit('setCurrentComponent', item)
  localStorage.setItem('componentList', JSON.stringify(componentList.value))
  store.commit('setComponentList', componentList.value)
  localStorage.setItem('activeIndex', String(componentList.value.length - 1))
  store.commit('setActiveIndex', componentList.value.length - 1)
}

const del = (index: number) => {
  if (componentList.value.length !== 1) {
    componentList.value.splice(index, 1)
    localStorage.setItem('currentComponent', JSON.stringify(componentList.value[componentList.value.length - 1]))
    store.commit('setCurrentComponent', componentList.value[componentList.value.length - 1])
    localStorage.setItem('componentList', JSON.stringify(componentList.value))
    store.commit('setComponentList', componentList.value)
    localStorage.setItem('activeIndex', String(componentList.value.length - 1))
    store.commit('setActiveIndex', componentList.value.length - 1)
  } else {
    store.commit('setComponentList', null)
    store.commit('setCurrentComponent', null)
    store.commit('setActiveIndex', null)
    localStorage.removeItem('componentList')
    localStorage.removeItem('currentComponent')
    localStorage.removeItem('activeIndex')
  }
}

onMounted(() => {
  const attrs = {
    formName: 'elForm',
    model: 'model',
    rules: 'rules',
    size: 'default',
    labelPosition: 'left',
    labelWidth: 90,
    disabled: false,
  }
  store.commit('setFormAttrs', attrs)
  localStorage.setItem('formAttrs', JSON.stringify(attrs))
})

watch(
  () => currentComponent.value,
  val => {
    localStorage.setItem('currentComponent', JSON.stringify(val))
    store.commit('setCurrentComponent', val)

    if (componentList.value && componentList.value.length) {
      componentList.value[activeIndex.value] = val
      localStorage.setItem('componentList', JSON.stringify(componentList.value))
      store.commit('setComponentList', componentList.value)
    }
  },
  { deep: true }
)

watch(
  () => componentList.value,
  val => {
    if (val && val.length) {
      val.map(item => {
        rules.value = {}
        let cloneRules: RuleItem[] = []
        if (item.rules) {
          cloneRules = cloneDeep(item.rules)
          cloneRules.map(item => {
            if (item.pattern) {
              item.pattern = new RegExp((item.pattern as string).slice(1, -1))
            }
          })
        }
        rules.value[item.field] = cloneRules
        model.value[item.field] = item.value
      })
    }
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.active {
  background: #f6f7ff;
}
</style>
