import {timesFormat} from './index'
const nowTime = new Date().getTime() // 当前时间错
const Ten_m = nowTime - 11 * 60 * 1000 // 10分钟前
const One_h = nowTime - 61 * 60 * 1000 // 一小时前

test('测试10分钟前返回的时间格式', () => {
  expect(timesFormat(Ten_m / 1000)).toBe('10分钟前')
})
test('测试1小时前返回的时间格式', () => {
  expect(timesFormat(One_h / 1000)).toEqual('1小时前')
})
test('测试现在刚发出去的时间是否包含刚刚', () => {
  expect([timesFormat(nowTime / 1000)]).toContain('刚刚')
})
