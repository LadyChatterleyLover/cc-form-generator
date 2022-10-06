<template>
  <div class="main">
    <div class="editor">
      <el-form>
        <template v-for="(item, index) in componentList" :key="index">
          <el-form-item
            class="item"
            :label="item.showLabel ? item.label : ''"
            :label-width="`${item.showLabel ? `${item.labelWidth}px` : '0px'}`"
            :rules="item.rules"
          >
            <template v-if="item.type === 'button'">
              <el-button
                v-if="item.attrs.type === 'default'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
              >{{ item.attrs.buttonText }}</el-button>
              <el-button
                v-if="item.attrs.type === 'primary'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
              >{{ item.attrs.buttonText }}</el-button>
              <el-button
                v-if="item.attrs.type === 'success'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
              >{{ item.attrs.buttonText }}</el-button>
              <el-button
                v-if="item.attrs.type === 'warning'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
              >{{ item.attrs.buttonText }}</el-button>
              <el-button
                v-if="item.attrs.type === 'info'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
              >{{ item.attrs.buttonText }}</el-button>
              <el-button
                v-if="item.attrs.type === 'danger'"
                v-bind="item.attrs"
                :icon="(Icons as any)[item.attrs.icon]"
              >{{ item.attrs.buttonText }}</el-button>
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
                <component
                  v-for="(child, i) in item.children"
                  :key="i"
                  v-bind="child.attrs"
                  :is="`el-${child.type}`"
                >{{child.attrs.text}}</component>
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
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from '@/utils'

const store = useStore()
const componentList = computed (() => store.state.componentList)
</script>

<style lang='scss' scoped>
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