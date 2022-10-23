<template>
  <!-- {{render}} -->
</template>

<script lang="ts" setup>
import { h } from "vue"
import { useStore } from "vuex"
import { parse, compileTemplate } from "@vue/compiler-sfc"

const store = useStore()
// const templateCode = computed(() => store.state.templateCode)
const templateCode = `
 <template><el-button>按钮</el-button></template>
`

const { descriptor } = parse(templateCode)
const { filename } = descriptor

const { code } = compileTemplate({
  source: templateCode,
  id: filename,
  filename,
})


// const render = eval(`"${code}"`)
// console.log(resolveCode)
</script>

<style lang="scss" scoped></style>
