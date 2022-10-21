import { CSSProperties } from 'vue'
import { SizeProps, TypeProps } from './index'

export interface TimePickerAttrs {
  style?: CSSProperties
  readonly?: boolean
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  arrowControl?: boolean
  size?: SizeProps
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  isRange?: boolean
  format?: string
  rangeSeparator?: string
}
