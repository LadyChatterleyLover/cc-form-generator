<template>
  <div class="left">
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in components"
        :key="index"
        :draggable="true"
        @dragstart="dragStart($event, item)"
      >
        <div class="icon">
          <component :is="`el-icon-${toLine(item.icon)}`"></component>
        </div>
        <div>{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComponentItem } from "@/types"
import { components } from "../../config"
import { toLine } from "../../utils"

const dragStart = (e: DragEvent, item: ComponentItem) => {
  e.dataTransfer!.setData("item", JSON.stringify(item))
}
</script>

<style lang="scss" scoped>
.left {
  border-right: 1px solid #eee;
  height: 100%;
  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px;
    .item {
      display: flex;
      align-items: center;
      padding: 8px 10px;
      background: #f6f7ff;
      font-size: 12px;
      cursor: move;
      border: 1px dashed #f6f7ff;
      border-radius: 3px;
      width: 46%;
      margin: 0 2%;
      margin-bottom: 15px;
      .icon {
        margin-right: 6px;
        position: relative;
        top: 1px;
      }
    }
  }
}
</style>
