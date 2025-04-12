<template>
  <div v-if="current.rules && current.rules.length">
    <div
      class="relative py-3 px-[6px] bg-[#f8f8f8] rounded mb-[10px]"
      v-for="(item, index) in current.rules"
      :key="index">
      <el-icon
        style="position: absolute"
        class="top-[-8px] right-0 text-[rgba(0,0,0,0.2)] z-10 cursor-pointer"
        @click="delRule(index)">
        <CircleClose></CircleClose>
      </el-icon>
      <div style="margin: 0 0 10px 30px">
        <div style="margin-top: 10px">
          <el-input
            style="margin-bottom: 10px"
            placeholder="请输入正则表达式"
            v-model="current.rules[index].pattern"></el-input>
          <el-input v-model="current.rules[index].message" placeholder="请输入提示信息"></el-input>
          <el-select v-model="current.rules[index].trigger" style="margin: 10px 0; width: 100%">
            <el-option label="失去焦点触发" value="blur"></el-option>
            <el-option label="值改变触发" value="change"></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
  <div class="ml-[30px] cursor-pointer flex items-center" @click.prevent="addRule">
    <CirclePlusFilled class="icon" />
    <el-link type="primary" :underline="false">添加验证</el-link>
  </div>
</template>

<script lang="ts" setup>
import {ComponentItem} from "@/types"
import {ComputedRef, computed, watch} from "vue"
import {useStore} from "vuex"
import {CirclePlusFilled, CircleClose} from "@element-plus/icons-vue"
import {RuleItem} from "@/types/rules"

interface Value extends RuleItem {
  trigger: "blur" | "change"
  message: string
  patternType?: string
  customPattern?: string
  pattern?: RegExp
}

const store = useStore()
const current: ComputedRef<ComponentItem> = computed(() => store.state.currentComponent)

const addRule = () => {
  current.value.rules.push({
    trigger: "blur",
    message: ""
  })
}

const delRule = (index: number) => {
  current.value.rules.splice(index, 1)
}

watch(
  () => current.value,
  (val) => {
    localStorage.setItem("currentComponent", JSON.stringify(val))
    store.commit("setCurrentComponent", val)
  },
  {deep: true}
)
</script>

<style lang="scss" scoped>
.icon {
  color: #409eff;
  width: 1em;
  height: 1em;
  top: 3px;
  margin-right: 4px;
}
</style>
