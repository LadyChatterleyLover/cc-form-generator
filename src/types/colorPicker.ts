import { CSSProperties } from "vue"
import { SizeProps } from './index'


export interface ColorPickerAttrs {
  style?: CSSProperties,
  disabled?: boolean,
  size?: SizeProps,
  showAlpha?: boolean,
  colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb' | 'rgba',
}