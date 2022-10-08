import { CSSProperties } from 'vue'
import { SizeProps } from './index'

export interface SelectAttrs {
  style?: CSSProperties
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  valueKey?: string
  size?: SizeProps
  multipleLimit?: number
  placeholder?: string
  filterable?: boolean
  remote?: boolean
  loading?: boolean
  filterMethod?: (val?: string) => void
  remoteMethod?: (val?: string) => void
}
