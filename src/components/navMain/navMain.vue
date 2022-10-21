<template>
  <div class="main">
    <div class="editor" @drop="drop" @dragover="dragover">
      <el-form>
        <template v-for="(item, index) in componentList" :key="index">
          <el-form-item
            @click="clickItem(item, index)"
            class="item"
            :class="{ active: activeIndex === index, 'rate-form-item-align-center': item.type === 'rate' }"
            :label="item.showLabel ? item.label : ''"
            :label-width="`${item.showLabel ? `${item.labelWidth}px` : '0px'}`"
            :rules="item.rules"
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
            <div class="btn">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, watch } from 'vue'
import { useStore } from 'vuex'
import { toLine } from '@/utils'
import { ComponentItem } from '@/types'
import { Edit, Delete } from '@element-plus/icons-vue'
import * as Icons from '@element-plus/icons-vue'

const store = useStore()

const componentList: ComputedRef<any[]> = computed(() => store.state.componentList)
const currentComponent = computed(() => store.state.currentComponent)
const activeIndex = computed(() => store.state.activeIndex)

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

watch(
  () => currentComponent.value,
  (val) => {
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
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;
}
.editor {
  width: 100%;
  height: 100%;
  padding: 20px;
  .item {
    padding: 20px;
    position: relative;
    .btn {
      position: absolute;
      top: -35px;
      right: 10px;
      z-index: 999;
    }
  }
}
.active {
  background: #f6f7ff;
}
</style>
