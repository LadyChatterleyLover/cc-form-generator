<template>
  <div ref="codeEditBox" class="codeEditBox" :style="{width: width + 'px'}"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue"
import * as monaco from "monaco-editor"
export default defineComponent({
  name: "MonacoEditor",
  props: {
    width: {
      type: [String, Number],
      default: 1200,
    },
    height: {
      type: [String, Number],
      default: 400,
    },
    modelValue: String,
    language: String,
    theme: String,
  },
  emits: ["update:modelValue", "change", "editor-mounted"],
  setup(props, { emit }) {
    let editor: monaco.editor.IStandaloneCodeEditor
    const codeEditBox = ref()
    const init = () => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      })
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
      })
      editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        theme: props.theme,
      }) // 监听值的变化
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue() //给父组件实时返回最新文本
        emit("update:modelValue", value)
        emit("change", value)
      })
      emit("editor-mounted", editor)
    }
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editor) {
          const value = editor.getValue()
          if (newValue !== value) {
            editor.setValue(newValue)
          }
        }
      }
    )
    watch(
      () => props.language,
      (newValue) => {
        monaco.editor.setModelLanguage(editor.getModel()!, newValue)
      }
    )
    onBeforeUnmount(() => {
      editor.dispose()
    })
    onMounted(() => {
      init()
    })
    return { codeEditBox }
  },
})
</script>
​
<style lang="scss" scoped>
.codeEditBox {
  height: 100%;
}
</style>
