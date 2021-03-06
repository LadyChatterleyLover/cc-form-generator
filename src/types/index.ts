import { ButtonAttrs } from "./buttonAttrs"
import { ColorPickerAttrs } from "./colorPicker"
import { InputAttrs } from "./inputAttrs"
import { InputNumberAttrs } from './inputNumberAttrs'
import { RateAttrs } from "./rateAttrs"
import { SwitchAttrs } from "./switchAttrs"

export type SizeProps = '' | 'mini' | 'small' | 'medium'
export type TypeProps = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

export interface ComponentItem {
  type:'button' | 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' |
  'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' |
  'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' |
  'transfer' | 'upload' | 'editor',
  label: string,
  icon: string,
  value?: any,
  field?: string,
  required?: boolean,
  showLabel: boolean,
  labelWidth: number | string,
  suffix?: string,
  prefix?: string,
  attrs: InputAttrs | ButtonAttrs | InputNumberAttrs | SwitchAttrs | RateAttrs | ColorPickerAttrs
}