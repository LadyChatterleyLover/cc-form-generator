import { SizeProps } from "./index"
import { CSSProperties } from "vue"

export interface InputAttrs {
  style?: CSSProperties,
  type?: 'text' | 'textarea' | 'password',
  maxlength?: number | string,
  showWordLimit?: boolean,
  placeholder?: string,
  clearable?: boolean,
  showPassword?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  size?: SizeProps,
  prefix?: string,
  suffix?: string,
  prefixIcon?: string,
  suffixIcon?: string,
  rows?: number,
  autosize?: boolean,
  resize?:  'none' | 'both' | 'horizontal' | 'vertical',

}