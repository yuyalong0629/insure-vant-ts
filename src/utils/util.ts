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
