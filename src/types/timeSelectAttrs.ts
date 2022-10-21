import { CSSProperties } from 'vue'
import { SizeProps } from './index'

export interface TimeSelectAttrs {
  style?: CSSProperties
  readonly?: boolean
  disabled?: boolean
  editable?: boolean
  clearable?: boolean
  size?: SizeProps
  placeholder?: string
  start?: string
  end?: string
  step?: string
  minTime?: string
  maxTime?: string
  format?: string
}
