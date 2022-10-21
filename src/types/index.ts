import { ButtonAttrs } from './buttonAttrs'
import { CheckboxAttrs } from './checkbox'
import { ColorPickerAttrs } from './colorPicker'
import { InputAttrs } from './inputAttrs'
import { InputNumberAttrs } from './inputNumberAttrs'
import { RadioAttrs } from './radioAttrs'
import { RateAttrs } from './rateAttrs'
import { SliderAttrs } from './sliderAttrs'
import { SwitchAttrs } from './switchAttrs'
import { SelectAttrs } from './selectAttrs'
import { CascaderAttrs } from './cascaderAttrs'
import { TimePickerAttrs } from './timePicker'
import { DatePickerAttrs } from './datePicker'
import { RuleItem } from './rules'

export type SizeProps = '' | 'large' | 'small' | 'default'
export type TypeProps = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

export interface ComponentItem {
  type?:
    | 'button'
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor'
  label?: string
  icon?: string
  value?: any
  field?: string
  showLabel?: boolean
  labelWidth?: number | string
  rules?: RuleItem[]
  suffix?: string
  prefix?: string
  children?: ComponentItem[]
  attrs?:
    | InputAttrs
    | ButtonAttrs
    | InputNumberAttrs
    | SwitchAttrs
    | RateAttrs
    | ColorPickerAttrs
    | SliderAttrs
    | RadioAttrs
    | CheckboxAttrs
    | SelectAttrs
    | CascaderAttrs
    | TimePickerAttrs
    | DatePickerAttrs
}
