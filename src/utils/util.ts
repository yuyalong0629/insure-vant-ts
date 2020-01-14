/**
 * @description: 时间格式化问候语
 * @param {type}
 * @return: timeFix
 */

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? 'Hi~早上好' : hour <= 11 ? 'Hi~上午好' : hour <= 13 ? 'Hi~中午好' : hour < 20 ? 'Hi~下午好' : 'Hi~晚上好'
}

/**
 * @description: 日期格式化函数封装
 * @param {Dare} date [日期]
 * @param {String} fmt [target]
 * @return: formatDate
 */

export function formatDate(date: any, fmt: any) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = (o as any)[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str: any) {
  return ('00' + str).substr(str.length)
}

/**
 * @description: m~nz的随机数
 * @param {Number} n [随机数起始值]
 * @param {Number} m [随机数最大值]
 * @return: randomNum
 */

export function randomNum(n: number, m: number) {
  const r = m - n + 1
  return Math.floor(Math.random() * r + n)
}
