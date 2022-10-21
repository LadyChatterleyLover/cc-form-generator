import { ComponentItem } from "@/types"
import cloneDeep from "lodash/cloneDeep"

export const vueTemplate = (componentList: ComponentItem[]) => {
  let template = ``
  let attrs = ``
  let script = ``
  let childStr = ``
  let slots = ``
  let cloneAttrs: any = {}
  let objStr = ``
  if (componentList && componentList.length) {
    let isValue = componentList.find((item) => item.field || (item.attrs as any).seriesData)
    if (isValue)
      script = `import {ref} from 'vue'
  `
    componentList.map((item, index) => {
      cloneAttrs = cloneDeep(item.attrs)
      for (let i in item.attrs) {
        attrs += `
      ${
        typeof cloneAttrs[i] !== "undefined" && cloneAttrs[i] !== ""
          ? `${
              typeof cloneAttrs[i] === "boolean"
                ? `${cloneAttrs[i] ? i : `:${i}="false"`}`
                : `${typeof cloneAttrs[i] === "number" ? `:${i}="${cloneAttrs[i]}"` : `${i}="${cloneAttrs[i]}"`}`
            }`
          : ""
      }`
      }
      if (item.children && item.children.length) {
        let childAttrs = ``
        item.children!.map((child) => {
          for (let i in child.attrs) {
            if ((child.attrs as any)[i]) {
              childAttrs += `
              ${i}="${(child.attrs as any)[i]}"`
            }
          }
          childStr += `
          <el-${child.type} ${childAttrs}>
          </el-${child.type}>`
          childAttrs = ""
        })
      }
      template += `
    <el-${item.type} 
     ${item.field ? "v-model=" + `"${item.field}"` : ""}
     ${attrs}>
     ${childStr}
    </el-${item.type}>
    `
      script += `${objStr}${
        item.field
          ? `
    let ${item.field} = ref(${item.value ? item.value : '""'})`
          : ""
      }`
      attrs = ""
      slots = ""
      objStr = ""
      childStr = ""
    })
    return `<template>
      ${template}
    </template>
<script lang="ts" setup>
  ${script}
</script>
<style scoped lang="scss"></style>
  `
  }
}

export const getCode = (componentList: ComponentItem[]) => {
  let template = ``
  let attrs = ``
  let script = ``
  let childStr = ``
  let slots = ``
  let cloneAttrs: any = {}
  let objStr = ``
  if (componentList && componentList.length) {
    let isValue = componentList.find((item) => item.field || (item.attrs as any).seriesData)
    if (isValue)
      script = `import {ref} from 'vue'
  `
    componentList.map((item, index) => {
      cloneAttrs = cloneDeep(item.attrs)
      for (let i in item.attrs) {
        attrs += `
      ${
        typeof cloneAttrs[i] !== "undefined" && cloneAttrs[i] !== ""
          ? `${
              typeof cloneAttrs[i] === "boolean"
                ? `${cloneAttrs[i] ? i : `:${i}="false"`}`
                : `${typeof cloneAttrs[i] === "number" ? `:${i}="${cloneAttrs[i]}"` : `${i}="${cloneAttrs[i]}"`}`
            }`
          : ""
      }`
      }
      if (item.children && item.children.length) {
        let childAttrs = ``
        item.children!.map((child) => {
          for (let i in child.attrs) {
            if ((child.attrs as any)[i]) {
              childAttrs += `
              ${i}="${(child.attrs as any)[i]}"`
            }
          }
          childStr += `
          <el-${child.type} ${childAttrs}>
          </el-${child.type}>`
          childAttrs = ""
        })
      }
      template += `
    <el-${item.type} 
     ${item.field ? "v-model=" + `"${item.field}"` : ""}
     ${attrs}>
     ${childStr}
    </el-${item.type}>
    `
      script += `${objStr}${
        item.field
          ? `
    let ${item.field} = ref(${item.value ? item.value : '""'})`
          : ""
      }`
      attrs = ""
      slots = ""
      objStr = ""
      childStr = ""
    })
    return {
      template: `<template>
        ${template}
      </template>`,
      script: script,
      style: "",
    }
  }
}
