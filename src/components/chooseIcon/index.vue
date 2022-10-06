<template>
  <div class="cc-choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="dialogVisible">
      <div class="container">
        <div
          class="item"
          v-for="(item, index) in Object.keys(ElIcons)"
          :key="index"
          @click="clickItem(item)"
        >
          <div class="text">
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          <div class="icon">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import * as ElIcons from '@element-plus/icons-vue'
import { watch, ref } from 'vue'
import { toLine } from '../../utils'

const props = defineProps<{
  // 弹出框的标题
  title: string,
  // 控制弹出框的显示与隐藏
  visible: boolean
}>()
const emits = defineEmits(['update:visible', 'clickItem'])
// 拷贝一份父组件传递过来的visible
const dialogVisible = ref<boolean>(props.visible)


// 点击图标
const clickItem = (item: string) => {
  emits('clickItem', item)
  // 关闭弹框
  dialogVisible.value = false
}

// 监听visible的变化 只能监听第一次的变化
watch(() => props.visible, val => {
  dialogVisible.value = val
})
// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, val => {
  emits('update:visible', val)
})
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}
.text {
  font-size: 14px;
}
.icon {
  flex: 1;
}
svg {
  width: 2em;
  height: 2em;
}
</style>