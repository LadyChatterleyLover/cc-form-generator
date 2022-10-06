import { CSSProperties } from "vue"

export interface SwitchAttrs {
  style?: CSSProperties,
  disabled?: boolean,
  loading?: boolean,
  width?: number,
  activeIcon?: string,
  inactiveIcon?: string,
  activeText?: string,
  inactiveText?: string,
  activeValue?: boolean | number | string,
  inactiveValue?: boolean | number | string,
  activeColor?: string,
  inactiveColor?: string,
  borderColor?: string,
}