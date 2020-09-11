import axios from 'axios'
test('异步测试接口：获取列表信息相关', () => {
  axios.get(`/api/v0.1/questions`).then(res => {
    expect(res.data.length).toBeGreaterThan(0)
  })
})
test('异步测试接口：测试本人提的问题是否存在', () => {
  axios.get(`/api/v0.1/questions&name=Me`).then(res => {
    expect(res.data[0].author === 'Me').toBeTruthy()
  })
})
