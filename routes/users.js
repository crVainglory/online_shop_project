const express = require('express')
const router = express.Router()

router.get('/:name', function (req, res) {
    // 第一个参数为模板名字， 第二个参数为数据
    // <% code %>：运行 JavaScript 代码，不输出
    // <%= code %>：显示转义后的 HTML内容
    // <%- code %>：显示原始 HTML 内容
  res.render('users', {
      name: req.params.name
  })
})

module.exports = router