<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <nav-header></nav-header>
      </div>
      <div class="edit">
        <div class="left">
          <nav-left></nav-left>
        </div>
        <div class="main">
          <nav-main></nav-main>
        </div>
      </div>
    </div>
    <div class="right">
      <nav-right></nav-right>
    </div>
  </div>
</template>

<script lang='ts' setup>
import navHeader from '../components/navHeader/navHeader.vue'
import navLeft from '../components/navLeft/navLeft.vue'
import navRight from '../components/navRight/navRight.vue'
import navMain from '../components/navMain/navMain.vue'

</script>

<style lang='scss' scoped>
.container {
  height: 100%;
  display: flex;
  overflow: hidden;
  .header {
    height: 50px;
  }
  .content {
    height: 100%;
    flex: 1;
    .edit {
      display: flex;
      height: 100%;
    }
    .main {
      flex: 1;
    }
    .left {
      width: 300px;
    }
  }
  .right {
    width: 380px;
  }
}
</style>