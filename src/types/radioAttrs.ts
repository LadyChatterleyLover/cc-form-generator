import { CSSProperties } from "vue"
import { SizeProps } from './index'


export interface RadioAttrs {
  style?: CSSProperties,
  textColor?: string,
  fill?: string,
  label?: string,
  text?: string,
  value?: string | number | boolean,
  disabled?: boolean,
  border?: boolean,
  size?: SizeProps
}