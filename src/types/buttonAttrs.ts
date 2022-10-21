import { CSSProperties } from 'vue'
import { SizeProps, TypeProps } from './index'

export interface ButtonAttrs {
  style?: CSSProperties
  size?: SizeProps
  type: TypeProps
  plain?: boolean
  round?: boolean
  circle?: boolean
  loading?: boolean
  disabled?: boolean
  autofocus?: boolean
  autoInsertSpace?: boolean
  icon?: string
  nativeType?: 'button' | 'submit' | 'reset'
  text?: boolean
  buttonText?: string
}
