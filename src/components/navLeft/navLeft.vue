<template>
  <div class="h-full" style="border-right: 1px solid #eee">
    <div class="flex flex-wrap items-center p-[10px]">
      <div
        class="flex items-center py-2 px-[10px] text-xs bg-[#f6f7ff] cursor-move rounded w-[46%] mx-[2%] mb-4"
        style="border: 1px dashed #f6f7ff"
        v-for="(item, index) in components"
        :key="index"
        :draggable="true"
        @dragstart="dragStart($event, item)"
      >
        <div class="mr-[6px] relative top-[1px]">
          <component :is="`el-icon-${toLine(item.icon)}`"></component>
        </div>
        <div>{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComponentItem } from '@/types'
import { components } from '../../config'
import { toLine } from '../../utils'

const dragStart = (e: DragEvent, item: ComponentItem) => {
  e.dataTransfer!.setData('item', JSON.stringify(item))
}
</script>

<style lang="scss" scoped></style>
