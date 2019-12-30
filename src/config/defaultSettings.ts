import FastClick from 'fastclick'

// 兼容ios 300ms 延迟
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      (FastClick as any).attach(document.body)
    },
    false
  )
}
