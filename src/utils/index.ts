// 把驼峰转换成横杠连接
export const toLine = (value: string) => {
  return value.replace(/[A-Z]g/, "-$1").toLocaleLowerCase()
}

/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
export function indent(str, num, len = 2) {
  if (num === 0) return str
  const isLeft = num < 0
  const result = []
  let reg
  let spaces = ""
  if (isLeft) {
    num *= -1
    reg = new RegExp(`(^\\s{0,${num * len}})`, "g")
  } else {
    for (let i = 0; i < num * len; i++) spaces += " "
  }

  str.split("\n").forEach((line) => {
    line = isLeft ? line.replace(reg, "") : spaces + line
    result.push(line)
  })
  return result.join("\n")
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, (str1) => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

export const exportDefault = "export default "

export const beautifierConf = {
  html: {
    indent_size: 2,
    indent_char: " ",
    indent_with_tabs: false,
    editorconfig: false,
    eol: "\n",
    end_with_newline: false,
    indent_level: 0,
    preserve_newlines: true,
    max_preserve_newlines: 10,
    space_in_paren: false,
    space_in_empty_paren: false,
    jslint_happy: false,
    space_after_anon_function: false,
    space_after_named_function: false,
    brace_style: "collapse",
    unindent_chained_methods: false,
    break_chained_methods: false,
    keep_array_indentation: false,
    unescape_strings: false,
    wrap_line_length: 0,
    e4x: false,
    comma_first: false,
    operator_position: "before-newline",
    indent_empty_lines: false,
    templating: ["auto"]
  },
  js: {
    indent_size: 2,
    indent_char: " ",
    indent_with_tabs: false,
    editorconfig: false,
    eol: "\n",
    end_with_newline: false,
    indent_level: 0,
    preserve_newlines: true,
    max_preserve_newlines: 10,
    space_in_paren: false,
    space_in_empty_paren: false,
    jslint_happy: false,
    space_after_anon_function: false,
    space_after_named_function: false,
    brace_style: "collapse",
    unindent_chained_methods: false,
    break_chained_methods: false,
    keep_array_indentation: false,
    unescape_strings: false,
    wrap_line_length: 0,
    e4x: false,
    comma_first: false,
    operator_position: "before-newline",
    indent_empty_lines: false,
    templating: ["auto"]
  },
  css: {
    indent_size: "2",
    indent_char: " ",
    max_preserve_newlines: "-1",
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "normal",
    brace_style: "end-expand",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: "110",
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

export function parseJson(jsonStr) {
  return JSON.parse(jsonStr, (k, v) => {
    try {
      // 将正则字符串转成正则对象
      if (eval(v) instanceof RegExp) {
        return eval(v)
      }
    } catch (e) {
      // nothing
    }

    return v
  })
}

export function stringifyJson(json) {
  return JSON.stringify(json, (k, v) => {
    // 将正则对象转换为正则字符串
    if (v instanceof RegExp) {
      return v.toString()
    }

    return v
  })
}

export function stringToRegExp(str: string) {
  // 基础格式校验
  if (typeof str !== "string" || str.length < 2) {
    throw new Error("必须以斜杠开头且长度≥2")
  }

  // 查找最后一个斜杠位置
  const lastSlashIndex = str.lastIndexOf("/")
  if (lastSlashIndex === 0) {
    throw new Error("缺少结束斜杠")
  }

  // 提取模式和标志
  const pattern = str.slice(1, lastSlashIndex)
  const flags = str.slice(lastSlashIndex + 1)

  // 创建正则表达式对象
  try {
    return new RegExp(pattern, flags)
  } catch (e) {
    throw new Error(`正则表达式语法错误: ${e.message}`)
  }
}
