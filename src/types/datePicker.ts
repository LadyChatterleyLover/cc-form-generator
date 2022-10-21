import { CSSProperties } from 'vue'
import { SizeProps } from './index'

export interface DatePickerAttrs {
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
  format?: string
  rangeSeparator?: string
  type?: 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange'
}
