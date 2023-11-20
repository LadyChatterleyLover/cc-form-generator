<template>
  <div class="h-full flex overflow-hidden">
    <div class="h-full flex-1">
      <div class="h-[50px]">
        <nav-header></nav-header>
      </div>
      <div class="flex h-full">
        <div class="w-[300px]">
          <nav-left></nav-left>
        </div>
        <div class="flex-1">
          <nav-main></nav-main>
        </div>
      </div>
    </div>
    <div class="w-[380px]">
      <nav-right></nav-right>
    </div>
  </div>
</template>

<script lang="ts" setup>
import navHeader from '../components/navHeader/navHeader.vue'
import navLeft from '../components/navLeft/navLeft.vue'
import navRight from '../components/navRight/navRight.vue'
import navMain from '../components/navMain/navMain.vue'
</script>

<style lang="scss" scoped></style>
