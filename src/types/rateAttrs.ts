import { Component, CSSProperties } from "vue"


export interface RateAttrs {
  style?: CSSProperties,
  max?: number,
  disabled?: boolean,
  allowHalf?: boolean,
  voidColor?: string,
  disabledVoidColor?: string,
  voidIcon?: Component,
  disabledVoidIcon?: string,
  showText?: boolean,
  showScore?: boolean,
  textColor?: string,
  
}