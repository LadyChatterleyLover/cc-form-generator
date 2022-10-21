import { ComponentItem } from '@/types'

export const components: ComponentItem[] = [
  {
    type: 'input',
    label: '输入框',
    icon: 'document',
    value: '',
    field: 'inputValue',

    labelWidth: 90,
    showLabel: true,
    suffix: '',
    prefix: '',
    rules: [],
    attrs: {
      type: 'text',
      maxlength: '',
      showWordLimit: false,
      placeholder: '请输入',
      clearable: true,
      showPassword: false,
      disabled: false,
      readonly: false,
      size: '',
      prefixIcon: '',
      suffixIcon: '',
      rows: 2,
      autosize: false,
      resize: 'none',
    },
  },
  {
    type: 'button',
    label: '按钮',
    icon: 'Notification',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      text: false,
      buttonText: '按钮',
      size: '',
      type: 'primary',
      plain: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      autofocus: false,
      autoInsertSpace: false,
      icon: '',
      nativeType: 'button',
    },
  },
  {
    type: 'input-number',
    icon: 'Money',
    label: '计数器',
    value: 0,
    field: 'inputNumber',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      min: 0,
      max: 100,
      step: 1,
      stepStrictly: false,
      precision: 0,
      size: 'large',
      disabled: false,
      controls: true,
      controlsPosition: '',
      placeholder: '请输入金额',
    },
  },
  {
    type: 'switch',
    label: '开关',
    icon: 'Switch',
    value: false,
    field: 'switch',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      disabled: false,
      loading: false,
      width: 40,
      activeIcon: '',
      inactiveIcon: '',
      activeText: '',
      inactiveText: '',
      activeValue: true,
      inactiveValue: false,
      activeColor: '#409EFF',
      inactiveColor: '#C0CCDA',
      borderColor: '',
    },
  },
  {
    type: 'rate',
    label: '评分',
    icon: 'Star',
    showLabel: true,
    labelWidth: 90,
    value: 3,
    field: 'star',
    attrs: {
      max: 5,
      disabled: false,
      allowHalf: false,
      voidColor: '#C6D1DE',
      disabledVoidColor: '#EFF2F7',
      disabledVoidIcon: 'StarFilled',
      showText: true,
      showScore: true,
      textColor: '',
    },
  },
  {
    type: 'color-picker',
    icon: 'Pointer',
    label: '取色器',
    value: '',
    field: 'color',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      disabled: false,
      showAlpha: false,
      size: '',
      colorFormat: 'rgb',
    },
  },
  {
    type: 'slider',
    icon: 'Minus',
    label: '滑块',
    value: 0,
    field: 'slider',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      showInput: false,
      showInputControls: true,
      inputSize: 'small',
      showStops: false,
      showTooltip: true,
      range: false,
      vertical: false,
      height: '300',
      heightValue: 300,
    },
  },
  {
    type: 'radio-group',
    icon: 'Open',
    label: '单选框',
    value: '1',
    field: 'radio',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      textColor: '#ffffff',
      fill: '#409EFF',
      disabled: false,
      size: 'default',
    },
    children: [
      {
        type: 'radio',
        attrs: {
          label: '1',
          text: '选项1',
          disabled: false,
          border: false,
          size: '',
        },
      },
      {
        type: 'radio',
        attrs: {
          text: '选项2',
          label: '2',
          disabled: false,
          border: false,
          size: '',
        },
      },
    ],
  },
  {
    type: 'checkbox-group',
    icon: 'CircleCheck',
    label: '复选框',
    value: ['1'],
    field: 'checkbox',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      textColor: '#ffffff',
      fill: '#409EFF',
      disabled: false,
      size: 'default',
    },
    children: [
      {
        type: 'checkbox',
        attrs: {
          label: '1',
          text: '选项1',
          disabled: false,
          border: false,
          size: '',
        },
      },
      {
        type: 'checkbox',
        attrs: {
          text: '选项2',
          label: '2',
          disabled: false,
          border: false,
          size: '',
        },
      },
      {
        type: 'checkbox',
        attrs: {
          text: '选项3',
          label: '3',
          disabled: false,
          border: false,
          size: '',
        },
      },
    ],
  },
  {
    type: 'select',
    icon: 'Bottom',
    label: '下拉框',
    value: '',
    field: 'select',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      multiple: false,
      disabled: false,
      clearable: false,
      collapseTags: false,
      collapseTagsTooltip: false,
      valueKey: '',
      size: 'default',
      multipleLimit: 0,
      placeholder: '请选择',
      filterable: false,
      remote: false,
      loading: false,
      filterMethod: (val: '') => {},
      remoteMethod: (val: '') => {},
    },
    children: [
      {
        type: 'option',
        attrs: {
          label: '选项1',
          value: '1',
          disabled: false,
        },
      },
      {
        type: 'option',
        attrs: {
          label: '选项2',
          value: '2',
          disabled: false,
        },
      },
    ],
  },
  {
    type: 'cascader',
    icon: 'Operation',
    label: '级联选择',
    value: '',
    field: 'cascader',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      size: 'default',
      placeholder: '',
      disabled: false,
      clearable: false,
      filterable: false,
      showAllLevels: false,
      separator: '/',
      props: {
        expandTrigger: 'click',
        multiple: false,
        value: 'value',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
        leaf: 'leaf',
      },
    },
    children: [
      {
        value: '1',
        label: '选项1',
        children: [
          {
            value: '1-1',
            label: '选项1-1',
          },
        ],
      },
      { value: '2', label: '选项2' },
    ],
  },
  {
    type: 'time-picker',
    icon: 'Timer',
    label: '时间选择器',
    value: '',
    field: 'timePicker',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      format: 'HH:mm:ss',
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      arrowControl: false,
      size: 'default',
      placeholder: '请选择',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      isRange: false,
      rangeSeparator: '-',
    },
  },
  {
    type: 'date-picker',
    icon: 'Calendar',
    label: '日期选择器',
    value: '',
    field: 'timePicker',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      format: 'YYYY-MM-DD',
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      size: 'default',
      placeholder: '请选择',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      rangeSeparator: '-',
      type: 'date',
    },
  },
  {
    type: 'time-select',
    icon: 'AlarmClock',
    label: '时间选择',
    value: '',
    field: 'timeSelect',
    showLabel: true,
    labelWidth: 90,
    attrs: {
      readonly: false,
      disabled: false,
      editable: false,
      clearable: false,
      size: 'default',
      placeholder: '请选择',
      start: '09:00',
      end: '22:00',
      step: '00:30',
      minTime: '00:00',
      maxTime: '',
    },
  },
]
