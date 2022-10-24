import { ComponentItem } from '@/types'
import cloneDeep from 'lodash/cloneDeep'
import { parse } from '@babel/parser'
import loadBeautifier from './loadBeautifier'
import { beautifierConf } from './index'

export const vueTemplate = (componentList: ComponentItem[]) => {
  let template = ``
  let attrs = ``
  let script = ``
  let childStr = ``
  let formData = {}
  let cloneAttrs: any = {}
  if (componentList && componentList.length) {
    let isValue = componentList.find((item) => item.field || (item.attrs as any).seriesData)
    if (isValue)
      script = `import {ref} from 'vue'
  `
    componentList.map((item) => {
      cloneAttrs = cloneDeep(item.attrs)
      if (item.field) {
        formData[item.field] = item.value
      }
      for (let i in item.attrs) {
        if (i === 'buttonText') {
          delete cloneAttrs[i]
        }
        attrs += `
      ${
        typeof cloneAttrs[i] !== 'undefined' && cloneAttrs[i] !== ''
          ? `${
              typeof cloneAttrs[i] === 'boolean'
                ? `${cloneAttrs[i] ? i : `:${i}="false"`}`
                : `${typeof cloneAttrs[i] === 'number' ? `:${i}="${cloneAttrs[i]}"` : `${i}="${cloneAttrs[i]}"`}`
            }`
          : ''
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
          childAttrs = ''
        })
      }
      template += `
      <el-form-item label="${item.label}">
        <el-${item.type}
        ${item.field ? 'v-model=' + `"model.${item.field}"` : ''}
        ${attrs}>
        ${childStr}
        ${item.type === 'button' ? (item.attrs as any).buttonText : ''}
      </el-${item.type}>
      </el-form-item>
    `
      script = `let model = ref(${JSON.stringify(formData)})`
      attrs = ''
      childStr = ''
    })
  }
  return `<template>
            <el-form :model="model">
            ${template}
            </el-form>
        </template>
        <script lang="ts" setup>
          ${script}
        </script>
        <style scoped lang="scss"></style>
        `
}

export const getCode = (componentList: ComponentItem[]) => {
  let template = ``
  let attrs = ``
  let script = ``
  let childStr = ``
  let cloneAttrs: any = {}
  let formData = {}
  if (componentList && componentList.length) {
    let isValue = componentList.find((item) => item.field || (item.attrs as any).seriesData)
    if (isValue) script = ``
    componentList.map((item) => {
      cloneAttrs = cloneDeep(item.attrs)
      if (item.field) {
        formData[item.field] = item.value
      }
      for (let i in item.attrs) {
        if (i === 'buttonText') {
          delete cloneAttrs[i]
        }
        attrs += `
      ${
        typeof cloneAttrs[i] !== 'undefined' && cloneAttrs[i] !== ''
          ? `${
              typeof cloneAttrs[i] === 'boolean'
                ? `${cloneAttrs[i] ? i : `:${i}="false"`}`
                : `${typeof cloneAttrs[i] === 'number' ? `:${i}="${cloneAttrs[i]}"` : `${i}="${cloneAttrs[i]}"`}`
            }`
          : ''
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
          childAttrs = ''
        })
      }
      template += `
    <el-form-item label="${item.label}">
      <el-${item.type}
      ${item.field ? 'v-model=' + `"model.${item.field}"` : ''}
      ${attrs}>
      ${childStr}
      ${item.type === 'button' ? (item.attrs as any).buttonText : ''}
      </el-${item.type}>
    </el-form-item>
    `
      script = `
      let model = ref(${JSON.stringify(formData)})
      `
      attrs = ''
      childStr = ''
    })
  }
  return {
    template: `
      <el-form :model="model">${template}</el-form>
    `,
    script: `
      defineComponent({
        setup() {
          ${script}
          return {
            model
          }
        }
      })
    `,
    style: '',
  }
}
