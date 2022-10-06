import { CSSProperties } from "vue"
import { SizeProps } from './index'

export interface CheckboxAttrs {
  style?: CSSProperties,
  size?: SizeProps,
  disabled?: boolean,
  textColor?: string,
  fill?: string,
  label?: string | number | boolean,
  border?: boolean,
}