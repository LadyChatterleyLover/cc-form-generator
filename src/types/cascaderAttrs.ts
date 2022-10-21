import { CSSProperties } from 'vue'
import { SizeProps } from './index'

export interface CascaderProps {
  expandTrigger?: 'hover' | 'click'
  multiple?: boolean
  value?: string
  label?: string
  children?: string
  disabled?: string
  leaf?: string
}

export interface CascaderAttrs {
  style?: CSSProperties
  size?: SizeProps
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  separator?: string
  showAllLevels?: boolean
  props?: CascaderProps
}
